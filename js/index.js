const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

// background image
const backgroundImg = document.createElement('img');
backgroundImg.setAttribute('src', 'images/street-image.jpg');

// container
const containerImg = document.createElement('img');
containerImg.setAttribute('src', 'images/container.png');
let containerWidth = 140;
let containerHeight = 160;
let containerX = (canvas.getAttribute("width") - containerWidth)/2;
let containerY = canvas.getAttribute("height") - containerHeight;
let conVelocityX = 0; // para hacerlo con velocidad, lo hago efecto ruedas


// glass images
let glass1 = document.createElement('img');
glass1.setAttribute('src', 'images/glass_1.png');

let glass2 = document.createElement('img');
glass2.setAttribute('src', 'images/glass_2.png');

let glass3 = document.createElement('img');
glass3.setAttribute('src', 'images/glass_3.png');

let glass4 = document.createElement('img');
glass4.setAttribute('src', 'images/glass_4.png');

let glass5 = document.createElement('img');
glass5.setAttribute('src', 'images/glass_5.png');

// cans images
let can1 = document.createElement('img');
can1.setAttribute('src', 'images/soda_1.png');

let can2 = document.createElement('img');
can2.setAttribute('src', 'images/soda_2.png');

let can3 = document.createElement('img');
can3.setAttribute('src', 'images/soda_3.png');

let can4 = document.createElement('img');
can4.setAttribute('src', 'images/soda_4.png');

let can5 = document.createElement('img');
can5.setAttribute('src', 'images/soda_5.png');

// Arrays de glass y cans
let glassArr = [glass1, glass2, glass3, glass4, glass5];
let cansArr = [can1, can2, can3, can4, can5];

//objetos can y glass con medidas y posición predefinidas
const can = {
    width: 50,
    height: 100,
    y: -100,
    points: +30
}

const glass = {
    width: 40,
    height: 130,
    y: -130,
    points: -30
}



// cans and glass bottles
class Component {
    constructor(){
        let randomNum = Math.floor(Math.random() * 2);

        if (randomNum == 0){
            this.image = cansArr[Math.floor(Math.random() * cansArr.length)]
            this.y = can.y
            this.width = can.width
            this.height = can.height 
            this.points = can.points
        } else {
            this.image = glassArr[Math.floor(Math.random() * glassArr.length)]
            this.y = glass.y
            this.width = glass.width
            this.height = glass.height 
            this.points = glass.points
        }

        this.x = Math.floor(Math.random() * canvas.getAttribute("width")) //para que salga por cualquier lado a lo ancho.
    }
    
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

}


//start button
// document.getElementById("start-button").onclick = () => {
//     startGame();
// }

// let intervalId;

// function startGame() {
// // intervalId = setInterval(update, 20);
// }


function update() {
    // Limpiar
    ctx.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));

    // Recalcular posición
    containerX += conVelocityX; 
    
    //crear can o glass
    let component = new Component()

    // Repintar
      // background
    ctx.drawImage(backgroundImg, 0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"))
      // container
    ctx.drawImage(containerImg, containerX, containerY, containerWidth, containerHeight)

     // can/glass
    component.draw()
    
}
setInterval(update, 20)

// movimiento del contenedor con las flechas de teclado
document.body.addEventListener('keydown', (e)=>{
    if(e.key == 'ArrowLeft'){
        conVelocityX = -8; // lo hago con velocidad para que haga efecto ruedas
        if(containerX < 0){
            containerX = 0;
        }
    } else if(e.key == 'ArrowRight'){
        conVelocityX = 8;
        if(containerX >= canvas.getAttribute('width') - containerWidth){
            containerX = (canvas.getAttribute('width') - containerWidth);
        }
    }
});

document.body.addEventListener("keyup", (e) => { //cuando sueltas el dedo se para
    if (e.key == "ArrowLeft") {
      conVelocityX = 0
    } else if (e.key == "ArrowRight") {
      conVelocityX = 0
    }
})

