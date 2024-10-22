let uno = 1;
let siete = 7;
let doce = 12;
let personajes1 = [];
let personajes2 = [];
let personajes3 = [];


const noEsta = (arr, dato) => {
    esta = arr.find (item => item.name === dato)
    if (esta){
        return false;
    } else {
        return true;
    }
};

const llena = (personaje, num) => {
    if (num < 7) {
        if (noEsta(personajes1, personaje.name)){
            personajes1.push(personaje);
        }
    } else if (num < 12) {
        if (noEsta(personajes2, personaje.name)){
            personajes2.push(personaje);
        }
    } else {
        if (noEsta(personajes3, personaje.name)){
            personajes3.push(personaje);
        } 
    }
}

const obtienePerso = (ruta, num) => {
    fetch(ruta)
    .then(response => {
      if (response.ok)
        return response.json();
      else
        throw new Error(response.status);
    })
    .then(data => {        
        llena(data, num);
    })
    .catch(err => {
      console.error("ERROR: ", err.message)
    });     
}

const dibujaTarjetas = (arreglo, nomseccion, color, textodiv) => {
    const seccion = document.querySelector(nomseccion);
    seccion.innerHTML = "";
    let Html = `<div class="tercio"><div class="bolita ${color}"></div><div class="texto">`;
    Html += `<h4>En esta Sección...</h4><p>${textodiv}</p></div></div>`;    
    arreglo.forEach(dato => {
        console.log(`Nombre : ${dato.name} ese es el dato`);
        Html += `<div class="tercio"><div class="bolita ${color}"></div><div class="texto">`;
        Html += `<h4>${dato.name}</h4><p>Estatura: ${dato.height} cm. Peso: ${dato.mass}</p></div></div>`;
    });
    seccion.innerHTML = Html;
}


const leePersonaje = (arr, textodiv, secc, color, ri) => {
    let suma = 1;
    let apisw = "";
    if (ri == 1) {
        suma = uno;
    } else if (ri == 7) {
        suma = siete;
    } else {
        suma = doce;
    }
    if (suma < 17) {
        apisw = `https://swapi.dev/api/people/${suma}/`;
        obtienePerso(apisw, suma);
        suma++;              
        if (ri == 1 && suma < 6) {
            uno = suma;
        } else if (ri == 7 && suma < 12) {
            siete = suma;
        } else if (ri== 12 && suma < 17) {
            doce = suma;
        } else {
            suma = 17;
        }        
        dibujaTarjetas(arr, secc, color, textodiv);
    }   
}

$('#rank1').hover(function () {

    const textodiv = "Encontraras información sobre los personajes más populares de las películas.";
    leePersonaje(personajes1, textodiv, "#populares", "bg-danger", 1);
});

$('#rank2').hover(function () {
    const textodiv = "Encontrarás información sobre personajes secundarios importantes.";
    leePersonaje(personajes2, textodiv, "#secundarios", "bg-success", 7);
});

$('#rank3').hover(function () {
    const textodiv = "Encontrarás otros personajes significativos.";
    leePersonaje(personajes3, textodiv, "#significativos", "bg-info", 12);
});