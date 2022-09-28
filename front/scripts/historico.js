// Constantes del servidor 
let server = `https://posventa-dashboard.herokuapp.com/`;

let listado_cursos = [];
let listado_notas = [];
let Logo = [];
let listado_historico = [];
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
    addHistorico();

}

// 1- Listar Cursos Menu Aside
// 1.1- GET todos los Cursos 
const getListadoCursos = async () => {
    fetch(`${server}/cursos`)
        .then(result => result.json())
        .then(data => {
            listado_cursos = data;
            // console.log(listado_cursos)
            
        });
};

// 3- Listar la informacion del historico

//3.1- GET todos las notas de los usuarios historicas
const getListadoHistorico = async () => {
    fetch(`${server}/resultados/historico`)
        .then(result => result.json())
        .then(data => {
            listado_historico = data;
            addListadoHistorico();

            console.log(listado_historico)
        });
};

//3.2- Listar Notas de los usuarios historicas
const addListadoHistorico = () => {
    document.querySelector('.HistoricoNotas').innerHTML = '<h3 class="Name">Nombre</h3> <h3 class="Calificacion">Calificacion</h3> <h3 class="Intento">Intento</h3> <h3 class="Curso">Curso</h3> <h3 class="Concesionario">Concesionario</h3> ' ;
    listado_historico.map((item) => {
        document.querySelector('.HistoricoNotas').innerHTML += `
            <h3>${item.Nombre}</h3>
            <h3>${item.Calificacion}%</h3>
            <h3># ${item.Intento_idIntento}</h3>
            <h3>${item.Nombre_moto}</h3>
            <h3>${item.Concesionario}</h3>`
    });
};

const addHistorico = async () => {


    let fildate='Usuario_has_Moto.Fecha';
    let filters = {
        "Usuario.Grupo": filtro_grupo,
        "Usuario.idUsuario": filtro_nombre,
        "Usuario.Gerente_regional": filtro_gerente,
        "Usuario.Razon_social": filtro_razon,
        "Ciudad": filtro_ciudad,
        "fechas": [fildate, fechaIni, fechaFin]
    }

    fetch(`${server}/historico/filtrado`, {
        method: "POST",
        body: JSON.stringify(filters),
        headers: { "Content-type": "application/json; charset=UTF-8" }
    })
        .then(result => result.json())
        .then(data => {
            listado_historico = data;
            addListadoHistorico();
            console.log("esta es la fehca incial " + fechaIni);
            console.log("esta es la fehca final " + fechaFin);

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

                document.querySelector('.FiltroGrupo').innerHTML += `
                `

                

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



//Creacion de las constantes y las variables 
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
    addHistorico();
    
});

// funcion que filtra Por el nombre del usuario Pero el value es el ID del usuario para
SelectNombre.addEventListener('change', function () {
    filtro_nombre = SelectNombre.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addHistorico();
    addcategoria1(`${idcurso}`,filtro_nombre);

});

// Funcion que filtra por el Gerente regional
SelectGerente.addEventListener('change', function () {
    filtro_gerente = SelectGerente.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addHistorico();
});

SelectRazon.addEventListener('change', function(){
    filtro_razon = SelectRazon.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addHistorico();
});

SelectCiudad.addEventListener('change',function(){
    filtro_ciudad = SelectCiudad.value;
    console.log(filtro_ciudad)
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    console.log(url)
    addHistorico();
});

//4.2- Muestra la informacion de los usuarios con el curso Hecho
const historicoFiltrado = async (dir) => {

    document.querySelector('.HistoricoNotas').innerHTML = '<h3 class="Name">Nombre</h3> <h3 class="Calificacion">Calificacion</h3> <h3 class="Curso">Curso</h3> <h3 class="Concesionario">Concesionario</h3>' ;

    fetch(`${dir}`)
        .then(result => result.json())
        .then(data => {
            if(data.message){
                console.log('no hay resultados aparentes')
            }else{
                data.map(item => {
                    document.querySelector('.HistoricoNotas').innerHTML += `
                    <h3>${item.Nombre}</h3>
                    <h3>${item.Calificacion}%</h3>
                    <h3>${item.Nombre_moto}</h3>
                    <h3>${item.Concesionario}</h3>`
                })
            };

        })
};





// ======================== Funcion de iniciar =============================

const start = async () => {
    // Agregar Listado de Cursos
    await getListadoCursos();
    await getListadoHistorico();
    await serchFiltro();
    await serchCiudad();
    await serchRegional();
    await serchSocial();

};

start();

