// Constantes del servidor 
let server = `https://posventa-dashboard.herokuapp.com/`;

let listado_cursos = [];
let listado_notas = [];
let Logo = [];
let listado_notas_examen = [];
let listado_notas_actividad = [];
let cursoId = 3;
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
    addPromAct();
}





// 1- Listar Cursos Menu Aside
// 1.1- GET todos los Cursos 
const getListadoCursos = async () => {
    fetch(`${server}/cursos`)
        .then(result => result.json())
        .then(data => {
            listado_cursos = data;
            // console.log(listado_cursos)
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
    fetch(`${server}/curso/${idcurso}`)
        .then(result => result.json())
        .then(data => {
            document.querySelector('.logo').innerHTML = `
            <img src=${data.Logo} />
          `
        });
};



// 2- Listar la informacion del Ranking
//2.1- GET todos las notas de los usuarios por curso
const getListadoNotas = async (idcurso) => {
    fetch(`${server}/resultados/cursos/${idcurso}`)
        .then(result => result.json())
        .then(data => {
            listado_notas = data;
            addListadoNotas();
            addLogo(`${idcurso}`);
            // console.log(listado_notas)
        });
};

//2.2- Listar Notas de los usuarios por curso
const addListadoNotas = () => {
    document.querySelector('.Ranking').innerHTML = '';
    listado_notas.map((item) => {
        document.querySelector('.Ranking').innerHTML += `
            <h3>${item.Nombre}</h3>
            <h3>${item.Calificacion_Max.toFixed(2)}%</h3>`
    });
};


// 4- Listaro toda la infrmacion del Ranking Examenes 80% (Ranking)

const ExamenFiltrado = async (dir) => {

    document.querySelector('.RankingExamenes').innerHTML = '';
    fetch(`${dir}`)
        .then(result => result.json())
        .then(data => {
            if (data.message) {
                console.log('no hay resultados aparentes')
            } else {
                data.map(item => {
                    document.querySelector('.RankingExamenes').innerHTML += `<h3>${item.Nombre}</h3>
                    <h3>${item.PromedioExamen}%</h3>`;
                })
            };

        })
};

//4.1- Get Listado de notas de los examenes por Curso
const getListadoNotasExamen = async (idcurso) => {

    fetch(`${server}/resultados/examenes/${idcurso}`)
        .then(result => result.json())
        .then(data => {
            listado_notas_examen = data;
            //console.log(listado_notas_examen);
            addListadoNotasExamen();
        });
};

//4.2-Listar las notas de los usuarios por examen del curso
const addListadoNotasExamen = () => {
    document.querySelector('.RankingExamenes').innerHTML = '';
    listado_notas_examen.map((item) => {
        document.querySelector('.RankingExamenes').innerHTML += `
            <h3>${item.Nombre}</h3>
            <h3>${item.PromedioExamen.toFixed(2)}%</h3>`
    });
};




const addPromExamen = async () => {

    let filters = {
        "Usuario.Grupo": filtro_grupo,
        "Usuario_has_Moto.Usuario_idUsuario": filtro_nombre,
        "Usuario.Gerente_regional": filtro_gerente,
        "Usuario.Razon_social": filtro_razon,
        "Ciudad": filtro_ciudad,
        "fechas": ['Usuario_has_Actividad.Fecha', fechaIni, fechaFin]

       
    }

    fetch(`${server}/ranking/`, {
        method: "POST",
        body: JSON.stringify(filters),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(result => result.json())
        .then(data => {
            listado_notas_examen=data;
            
            console.log(listado_notas_examen);
        });
};
//Agregar contenido a las Notas del examen 80 



// 5- Listaro toda la infrmacion del Ranking actividades 20% (Ranking)

//5.1- Get Listado de notas de los actividades por Curso
const getListadoNotasActividad = async (idcurso) => {
    fetch(`${server}/resultados/Actividades/${idcurso}`)
        .then(result => result.json())
        .then(data => {
            listado_notas_actividad = data;
            //console.log(listado_notas_actividad);
            addListadoNotasActividad();
        });
};

//5.2-Listar las notas de los usuarios por actividad del curso
const addListadoNotasActividad = () => {
    document.querySelector('.RankingActividades').innerHTML = '';
    listado_notas_actividad.map((item) => {
        document.querySelector('.RankingActividades').innerHTML += `
            <h3>${item.nombre}</h3>
            <h3>${(item.Promedio.toFixed(2))}%</h3>`
    });
};
const addPromAct = async () => {
    console.log("Add prom examen");
        let filters = {
            "Usuario.Grupo": filtro_grupo,
            "Usuario.idUsuario": filtro_nombre,
            "Usuario.Gerente_regional": filtro_gerente,
            "Usuario.Razon_social": filtro_razon,
            "Ciudad": filtro_ciudad,
            "Actividad.Moto_id":cursoId,
            "fechas": ['Usuario_has_Actividad.Fecha', fechaIni, fechaFin]

        }
    
    
        fetch(`${server}/examen/ranking/`, {
            method: "POST",
            body: JSON.stringify(filters),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(result => result.json())
            .then(data => {
                listado_notas_actividad=data;
                addListadoNotasActividad();
                console.log(listado_notas_actividad);
            });
    };

//Actualizar Ranking 10 80 20
const refreshRanking = (idcurso) => {
    getListadoNotasExamen(idcurso);
    getListadoNotasActividad(idcurso);
    getListadoNotas(idcurso);
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
    addPromAct();
    
    

});

// funcion que filtra Por el nombre del usuario Pero el value es el ID del usuario para
SelectNombre.addEventListener('change', function () {
    filtro_nombre = SelectNombre.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromAct();
    
});

// Funcion que filtra por el Gerente regional
SelectGerente.addEventListener('change', function () {
    filtro_gerente = SelectGerente.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromAct();
    
    
});

SelectRazon.addEventListener('change', function () {
    filtro_razon = SelectRazon.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromAct();
    
    
});

SelectCiudad.addEventListener('change', function () {
    filtro_ciudad = SelectCiudad.value;
    console.log(filtro_ciudad)
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addPromAct();
    
});


// ======================== Funcion de iniciar =============================

const start = async () => {
    // Agregar Listado de Cursos
    await getListadoCursos();
    await getListadoNotas(3);
    await getListadoNotasExamen(3);
    await getListadoNotasActividad(3);
    await serchFiltro();
    await serchSocial();
    await serchRegional();
    await serchCiudad();


};

start();

