const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// canvas.width = innerWidth;
// canvas.height = innerHeight;

// VARIABLES

// background image

const backgroundImg = document.createElement('img');
backgroundImg.setAttribute('src', 'images/street-image.jpg');
backgroundImg.onload = function() {ctx.drawImage(backgroundImg, 0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));};


// container
const containerImg = document.createElement('img');
containerImg.setAttribute('src', 'images/container.png');
let containerWidth = 140;
let containerHeight = 160;
let containerX = (canvas.getAttribute("width") - containerWidth)/2;
let containerY = canvas.getAttribute("height") - containerHeight;
containerImg.onload = function() {ctx.drawImage(containerImg, containerX, containerY, containerWidth, containerHeight)}




// cans
class Cans {
    constructor(image){
        this.x = Math.floor(Math.random() * canvas.getAttribute("width")), //para que salga por cualquier lado a lo ancho.
        this.y = -100, // que todos salgan desde arriba.
        this.width = 50,
        this.height = 100,
        this.image = image
    } 
    
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

}

function update(){

}

class Container {
    constructor(){
        this.position = {
            x: containerX,
            y: containerY
        }

        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = containerWidth,
        this.height = containerHeight

        const containerImg = new Image();
        image.src = "images/container.png";

        this.image = containerImg;        
    }
    //pinto el contendor
    draw() {
        ctx.drawImage(this.image, this.position.x, this.position.y)
    }

    update(){
        this.draw() //para que se vaya moviendo.
        this.position.y += this.velocidad.y
        this.position.x += this.velocidad.x
    }
}


const container = new Container();
container.draw();
/*
class Jugador { //  Creación del personaje
    constructor() {
        // propiedades de nuestor jugador
        this.posicion = {
            x: 200,
            y: 100
        }
        this.velocidad = {
            x: 0,
            y: 2,
        }
        this.width = 50
        this.height = 50
    }
    // Vamos a crear como el jugador luce
    pintar() {
        context.fillStyle = "pink"
        context.fillRect(this.posicion.x, this.posicion.y, this.width, this.height)
    }
    // Necesitamos la función update para actualizar las propiedades de nuestro personaje todo el rato
    update() {
        this.pintar()
        this.posicion.y += this.velocidad.y
        this.posicion.x += this.velocidad.x
    }
}

*/

//start button
// document.getElementById("start-button").onclick = () => {
//     startGame();
// }



// let intervalId;

// function startGame() {
// intervalId = setInterval(update, 20);
// }

// función para limpiar todo el canvas
// function clearCanvas(){
//     ctx.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));
// }

//función para dibujar de nuevo las imágenes en update.
/*
function drawCanvas(image, x, y, w, h) {
    ctx.drawImage(image, x, y, w, h);
  }

function update() {
    frames ++;

    clearCanvas();
    
    drawCanvas(backgroundImg, 0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"));
    drawCanvas(containerImg, containerX, containerY, containerWidth, containerHeight);
    
    requestAnimationFrame(update);
    
}

update();


/*
function animate(){
    requestAnimationFrame(animate);
    container.draw();
}

animate();

*/


