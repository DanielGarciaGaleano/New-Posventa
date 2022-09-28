// Constantes del servidor 
let server = `https://posventa-dashboard.herokuapp.com/`;

let listado_cursos = [];
let listado_notas = [];
let Logo = [];
let listado_notas_examen = [];
let listado_notas_actividad = [];
let completos = [];
let inscritos = [];
let cursoId = 1;
let _promedioChartPrincipal = 0;
let fechaIni;
let fechaFin;


var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0!
var yyyy = today.getFullYear();

var firstDayInMonth;

if (dd < 10) {
    dd = '0' + dd;
}

if (mm < 10) {
    mm = '0' + mm;
}

today = yyyy + '-' + mm + '-' + dd;
firstDayInMonth = yyyy + '-' + mm + '-' + "01";

fechaIni=firstDayInMonth;
fechaFin=today;

document.getElementById("startDate").setAttribute("max", today);
document.getElementById("startDate").value = firstDayInMonth;

document.getElementById("endDate").setAttribute("min", document.getElementById("startDate").value);
document.getElementById("endDate").setAttribute("max", today);
document.getElementById("endDate").value = today;


function UpdateEndDate() {
    var startDate = document.getElementById("startDate").value;
    var endDate = document.getElementById("endDate").value;
    fechaIni = startDate;
    fechaFin = endDate;
    if (document.getElementById("endDate").getAttribute("min") < startDate) {
        document.getElementById("endDate").setAttribute("min", startDate); //actualiza la fecha minima del EndDate 

        
    }

    if (endDate <= startDate) {
        endDate = startDate;
        document.getElementById("endDate").setAttribute("min", startDate);

    }
    if(startDate<document.getElementById("endDate").getAttribute("min")) {
        document.getElementById("endDate").setAttribute("min", startDate);

    }
    console.log(fechaIni)
    console.log(fechaFin)
    addPromExamen();

}

// 1- Listar Cursos Menu Aside
// 1.1- GET todos los Cursos 
const getListadoCursos = async () => {
    fetch(`${server}/cursos`)
        .then(result => result.json())
        .then(data => {
            listado_cursos = data;
            addListadoCursos();
        });
};

// 1.2- Listar Cursos
const addListadoCursos = () => {
    listado_cursos.map((item) => {
        if(item.Nombre_moto.includes ("CB 190R")||item.Nombre_moto.includes ("PCX 150")){

        }else{
            document.querySelector('#Todos_los_cursos').innerHTML += `
            <div class="contentNamesCourses">
                <input class="cursos" id="${item.Nombre_moto}" type="radio" onclick="refreshRanking(${item.id})" value="${item.Nombre_moto}" name="cursoAcutal">
                <label for="${item.Nombre_moto}">Ranking ${item.Nombre_moto}</label>
            <div>
            
            `
        }
            
    });
};

// 1.3- Info de el front
const addLogo = (idcurso) => {
    cursoId = idcurso;
    fetch(`${server}/curso/${idcurso}`)
        .then(result => result.json())
        .then(data => {
            document.querySelector('.logo').innerHTML = `
            <img src=${data.Logo} />`;
        });
};

// 2- Listar la informacion del Ranking
//2.1- GET todos las notas de los usuarios por curso
const getListadoNotas = async (idcurso) => {
    fetch(`${server}/resultados/cursos/${idcurso}`)
        .then(result => result.json())
        .then(data => listado_notas = data)
        .then(() => addListadoNotas())
        .then(() => addInscritos(`${idcurso}`))
        .then(() => addCompletos(`${idcurso}`))
        .then(() => addLogo(`${idcurso}`))
        .then(() => promCursoResult())
        .then(() => variablesChart(_promedioChartPrincipal))
        .then(() => promedio_curso = 0)
};

let sin_notas = 0;
let promedio_curso = 0;

//2.2- Listar Notas de los usuarios por curso
const addListadoNotas = () => {
    promedio_curso=0;
    document.querySelector('.Ranking').innerHTML = '';
    listado_notas.map(item => {
        promedio_curso += item.Calificacion_Max;

        document.querySelector('.Ranking').innerHTML += `
            <h3>${item.nombre}</h3>
            <h3>${item.Calificacion_Max}%</h3>`;

        if (item.Calificacion_Max == null) { 
            item.Calificacion_Max = 0 
        };

    });
};

const addPromExamen = async () => {

    let filters = {
        "Usuario.Grupo": filtro_grupo,
        "Usuario.idUsuario": filtro_nombre,
        "Usuario.Gerente_regional": filtro_gerente,
        "Usuario.Razon_social": filtro_razon,
        "Ciudad": filtro_ciudad,
        "Moto_id": cursoId,
        "fechas": ['Usuario_has_Actividad.Fecha', fechaIni, fechaFin]
       
    }

    fetch(`${server}/ranking/`, {
        method: "POST",
        body: JSON.stringify(filters),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(result => result.json())
        .then(data => {
            listado_notas=data;
            addListadoNotas();
            promCursoResult();
            variablesChart(_promedioChartPrincipal);
            console.log(listado_notas);
        });
};


// funcion sacar valor del chart
function promCursoResult() {

    if (promedio_curso == 0 && listado_notas.length == 0) {
        _promedioChartPrincipal = 0
    } else {
        _promedioChartPrincipal = promedio_curso / listado_notas.length;
    }


};

// 3- Insertar los inscritos y completados

//3.1 Mostrar los inscritos
const addInscritos = async (idcurso) => {
    fetch(`${server}/conteo/usuarioInscrito/curso/${idcurso}`)
        .then(result => result.json())
        .then(data => {
            inscritos = data[0].Inscritos;
            document.querySelector('.NumeroInscritos').innerHTML = data[0].Inscritos;
        });
    
};

//3.1 Mostrar los inscritos
const addCompletos = async (idcurso, userId) => {
    fetch(`${server}/conteo/usuarioCompleto/curso/${idcurso}`)
        .then(result => result.json())
        .then(data => {
            completos = data[0].completados;
            document.querySelector('.NumeroCompletados').innerHTML = data[0].completados;

        });
    
};


// 4- Flitros de busqueda 
//4.1- Se recibe toda la informacion de los usuarios
const serchFiltro = async () => {
    fetch(`${server}/filtros/`)
        .then(result => result.json())
        .then(data => {
            document.querySelector('.FiltroNombre').innerHTML += ``;
            data.map((item, i) => {

                document.querySelector('.FiltroNombre').innerHTML += `
                <option id="item${i}" value="${item.idUsuario}">${item.Nombre}</option>`

            });


        });
};
const serchCiudad = async () => {
    fetch(`${server}/filtros/ciudad`)
        .then(result => result.json())
        .then(data => {
            document.querySelector('.FiltroNombre').innerHTML += ``;
            data.map((item, i) => {

                document.querySelector('.FiltroCiudad').innerHTML += `
                <option value="${item.Ciudad}">${item.Ciudad}</option>`
                console.log(item)
            });


        });
};

const serchRegional = async () => {
    fetch(`${server}/filtros/regional`)
        .then(result => result.json())
        .then(data => {
            document.querySelector('.FiltroNombre').innerHTML += ``;
            data.map((item, i) => {

                document.querySelector('.FiltroRegional').innerHTML += `
                <option value="${item.Gerente_regional}">${item.Gerente_regional}</option>`
                console.log(item)
            });


        });
};

const serchSocial = async () => {
    fetch(`${server}/filtros/social`)
        .then(result => result.json())
        .then(data => {
            document.querySelector('.FiltroNombre').innerHTML += ``;
            data.map((item, i) => {
                document.querySelector('.FiltroRazonSocial').innerHTML += `
                <option value="${item.Razon_social}">${item.Razon_social}</option>`


            });


        });
};

// Creacion de las constantes y las variables 
const SelectGrupo = document.querySelector('.FiltroGrupo');
const SelectNombre = document.querySelector('.FiltroNombre');
const SelectGerente = document.querySelector('.FiltroRegional');
const SelectRazon = document.querySelector('.FiltroRazonSocial');
const SelectCiudad = document.querySelector('.FiltroCiudad');

let filtro_grupo = 'undefined';
let filtro_nombre = 'undefined';
let filtro_gerente = 'undefined';
let filtro_razon = 'undefined';
let filtro_ciudad = 'undefined';

let url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`;
let FilterUrl = '';

function startFilter() {
    console.log(url);
};

// Funcion que filtra por el grupo 
SelectGrupo.addEventListener('change', function () {
    filtro_grupo = SelectGrupo.value;
    console.log(filtro_grupo)
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromExamen();
});

// funcion que filtra Por el nombre del usuario Pero el value es el ID del usuario para
SelectNombre.addEventListener('change', function () {
    filtro_nombre = SelectNombre.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromExamen();
    
});

// Funcion que filtra por el Gerente regional
SelectGerente.addEventListener('change', function () {
    filtro_gerente = SelectGerente.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromExamen();
    
});

SelectRazon.addEventListener('change', function () {
    filtro_razon = SelectRazon.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromExamen();
    
});

SelectCiudad.addEventListener('change', function () {
    filtro_ciudad = SelectCiudad.value;
    console.log(filtro_ciudad)
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromExamen();
    
});

let inscritos_filtrados = (n) => {
    inscritos = n;
    document.querySelector('.NumeroInscritos').innerHTML = inscritos;

};

let completos_filtrados = (n) => {
    completos = n;
    document.querySelector('.NumeroCompletos').innerHTML = completos;

};

//4.2- Muestra la informacion de los usuarios con el curso Hecho
const rankingFiltrado = async (dir) => {

    document.querySelector('.Ranking').innerHTML = '';
    fetch(`${dir}`)
        .then(result => result.json())
        .then(data => {
            inscritos_filtrados(data.length);
            if (data.message) {
                console.log('no hay resultados aparentes')
            } else {
                data.map(item => {
                    document.querySelector('.Ranking').innerHTML += `<h3>${item.Nombre}</h3>
                    <h3>${item.Calificacion_Max}%</h3>`;
                })
            };

        })
};


let _chatcat = (nota, componentName) => {

    var options2 = {
        chart: {
            height: 200,
            type: "radialBar",
        },

        series: [nota.toFixed(2)],
        colors: ["#dd3333"],
        plotOptions: {
            radialBar: {
                hollow: {
                    margin: 0,
                    size: "65%",
                    background: "white"
                },
                track: {
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        blur: 4,
                        opacity: 0.15
                    }
                },
                dataLabels: {
                    name: {
                        offsetY: -10,
                        color: "#ff0000",
                        fontSize: "13px"
                    },
                    value: {
                        color: "#ff0000",
                        fontSize: "30px",
                        show: true
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "vertical",
                gradientToColors: ["orange"],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "round"
        },
        labels: ["Promedio"]
    };
    document.querySelector(componentName).innerHTML = '';
    var chart2 = new ApexCharts(document.querySelector(componentName), options2);
    chart2.render();

}


// 5- Ver las categorias de los examenes 
//5.1- add el resultado de la categoria 1


// ======================== Funcion de iniciar =============================
const variablesChart = (porcent) => {

    var options = {
        chart: {
            height: 300,
            width: 300,
            type: "radialBar",
        },
        series: [porcent.toFixed(2)],
        colors: ["#dd3333"],
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: 'rgb(230,230,230)',
                    startAngle: -90,
                    endAngle: 90,
                },
                dataLabels: {
                    name: {
                        show: false,
                    },
                    value: {
                        fontSize: "30px",
                        show: true
                    }
                }
            }
        },
        fill: {
            type: "gradient",
            gradient: {
                shade: "dark",
                type: "horizontal",
                gradientToColors: ["orange"],
                stops: [0, 100]
            }
        },
        stroke: {
            lineCap: "butt"
        },
        labels: ["Progress"]
    };

    document.querySelector("#chart").innerHTML = '';
    var chartPT = new ApexCharts(document.querySelector("#chart"), options);
    chartPT.render();
}


const start = async () => {
    // Agregar Listado de Cursos
    await getListadoCursos();
    await getListadoNotas(3);
    await serchFiltro();
    await serchCiudad();
    await serchRegional();
    await serchSocial();



};




start();

