let server = `https://posventa-dashboard.herokuapp.com/`;

let listado_cumplimiento = [];

const getListdocumplimiento = async () => {
    fetch(`${server}/cumplimiento/general`)
        .then(result => result.json())
        .then(data => {
            listado_cumplimiento = data;
            addListadoCumplimiento();
            
        });

};

const addListadoCumplimiento = () => {
    listado_cumplimiento.map((item) => {
        document.querySelector('.CumplimientoGeneral').innerHTML += `
            <h3>${item.Gerente_regional}</h3>
            <h3>${item.avance}%</h3>`
            console.log(item.Gerente_regional)
    });
}

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

const general1 = document.querySelector('#general1')
const general2 = document.querySelector('#general2')
const general3 = document.querySelector('#general3')
const general4 = document.querySelector('#general4')
const general5 = document.querySelector('#general5')

console.log("hola",general1)
general1.addEventListener('click',()=>{
    general1.style.color='red';
    general1.style.fontWeigth='600';
    general2.style.color='black';
    general2.style.fontWeigth='300';
    general3.style.color='black';
    general3.style.fontWeigth='300';
    general4.style.color='black';
    general4.style.fontWeigth='300';
    general5.style.color='black';
    general5.style.fontWeigth='300';

});

general2.addEventListener('click',()=>{
    general2.style.color='red';
    general2.style.fontWeigth='600';
    general1.style.color='black';
    general1.style.fontWeigth='300';
    general3.style.color='black';
    general3.style.fontWeigth='300';
    general4.style.color='black';
    general4.style.fontWeigth='300';
    general5.style.color='black';
    general5.style.fontWeigth='300';
});

general3.addEventListener('click',()=>{
    general3.style.color='red';
    general3.style.fontWeigth='600';
    general1.style.color='black';
    general1.style.fontWeigth='300';
    general2.style.color='black';
    general2.style.fontWeigth='300';
    general4.style.color='black';
    general4.style.fontWeigth='300';
    general5.style.color='black';
    general5.style.fontWeigth='300';
});

general4.addEventListener('click',()=>{
    general4.style.color='red';
    general4.style.fontWeigth='600';
    general1.style.color='black';
    general1.style.fontWeigth='300';
    general3.style.color='black';
    general3.style.fontWeigth='300';
    general2.style.color='black';
    general2.style.fontWeigth='300';
    general5.style.color='black';
    general5.style.fontWeigth='300';
});

general5.addEventListener('click',()=>{
    general5.style.color='red';
    general5.style.fontWeigth='600';
    general1.style.color='black';
    general1.style.fontWeigth='300';
    general3.style.color='black';
    general3.style.fontWeigth='300';
    general2.style.color='black';
    general2.style.fontWeigth='300';
    general4.style.color='black';
    general4.style.fontWeigth='300';
});
const start = async () => {
    // Agregar Listado de Cursos
    await getListdocumplimiento();
    await serchFiltro();
    await serchCiudad();
    await serchRegional();
    await serchSocial();


};

start();
