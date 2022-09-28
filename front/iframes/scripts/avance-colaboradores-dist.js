let server = `https://posventa-dashboard.herokuapp.com/`;

let listado_cumplimiento = [];
let promedio_total = [];
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
    addCumplimientoGen();

}

//  ==============================    PORCENTAJE CUMPLIMIENTO ========================
const getListdocumplimiento = async () => {
    fetch(`${server}/cumplimiento/cursos/nombre`)
        .then(result => result.json())
        .then(data => {
            listado_cumplimiento = data;
            addListadoCumplimiento();


        });

};

const addListadoCumplimiento = () => {
    document.querySelector('.iframe_content__fetch').innerHTML = ``
    listado_cumplimiento.map((item,i) => {        
        document.querySelector('.iframe_content__fetch').innerHTML += `
        <p>${i+1}</p>
        <p>${item.Zona}</p>
        <p>${item.Gerente_regional}</p>
        <p>${item.Grupo}</p>
        <p>${item.Nombre}</p>
        <p>${item.CantCursos}</p>
        <p>${item.aprobados}</p>
        <p class="avance${i}">${item.Avance}%</p>`
        
        if (item.Avance <= 49){
            document.querySelector(`.avance${i}`).setAttribute('promedio','rojo');
        }else if (item.Avance >49 && item.Avance<76){
            document.querySelector(`.avance${i}`).setAttribute('promedio','amarillo');
        }else if (item.Avance >= 76){
           document.querySelector(`.avance${i}`).setAttribute('promedio','verde');
        }
       // console.log(item.Agencia)
    });
}
const addCumplimientoGen = async () => {
    console.log("Add prom examen");
        let filters = {
            "Usuario.Grupo": filtro_grupo,
            "Usuario.idUsuario": filtro_nombre,
            "Usuario.Gerente_regional": filtro_gerente,
            "Usuario.Razon_social": filtro_razon,
            "Ciudad": filtro_ciudad,
            "fechas": ["Usuario_has_Actividad.fecha", fechaIni, fechaFin]

        }
    
    
        fetch(`${server}/filter/cumplimiento/grupo/nombre/`, {
            method: "POST",
            body: JSON.stringify(filters),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(result => result.json())
            .then(data => {
                listado_cumplimiento=data;
                addListadoCumplimiento();

            });
};




//  ==============================    FILTROS ========================
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
    addCumplimientoGen();
    
    

});

// funcion que filtra Por el nombre del usuario Pero el value es el ID del usuario para
SelectNombre.addEventListener('change', function () {
    filtro_nombre = SelectNombre.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addCumplimientoGen();
    
    
});

// Funcion que filtra por el Gerente regional
SelectGerente.addEventListener('change', function () {
    filtro_gerente = SelectGerente.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addCumplimientoGen();
    
});

SelectRazon.addEventListener('change', function () {
    filtro_razon = SelectRazon.value;
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addCumplimientoGen();
    
});

SelectCiudad.addEventListener('change', function () {
    filtro_ciudad = SelectCiudad.value;
    console.log(filtro_ciudad)
    url = `${server}/filtros/calificados/?grupo=${filtro_grupo}&userId=${filtro_nombre}&gerente=${filtro_gerente}&razon=${filtro_razon}&ciudades=${filtro_ciudad}`
    addCumplimientoGen();
    
});

const start = async () => {
    // Agregar Listado de Cursos
    await getListdocumplimiento();
    await serchFiltro();
    await serchCiudad();
    await serchRegional();
    await serchSocial();
    await addCumplimientoGen();
    
    


};

start();
