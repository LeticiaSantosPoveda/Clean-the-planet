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
let containerWidth = 160;
let containerHeight = 180;
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
        this.x = Math.floor(Math.random() * (canvas.getAttribute("width") - 200) +100) //para que salga por cualquier lado a lo ancho respetando un borde a cada lado (lo recalculo con this.x en cada componente)

        if (randomNum == 0){
            this.image = cansArr[Math.floor(Math.random() * cansArr.length)]
            this.x = this.x - 25;
            this.y = can.y
            this.width = can.width
            this.height = can.height 
            this.points = can.points
        } else {
            this.image = glassArr[Math.floor(Math.random() * glassArr.length)]
            this.x = this.x -20;
            this.y = glass.y
            this.width = glass.width
            this.height = glass.height
            this.points = glass.points
        }

    }
    
    draw(){
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }

    crash(){
        if(!(((containerX + containerWidth) < this.x) || ((canvas.height - containerHeight) > (this.y + this.height)) || (containerX > (this.x + this.width)) || ((canvas.height - containerHeight)< this.y))) {
            score += this.points;
        }
    }
}


//  start button
document.getElementById("start-button").onclick = () => {
    startGame();
}


let frames = 0;
let score = 30;
let intervalId;
const components = [];

function startGame() {
    intervalId = setInterval(update, 20);
}

function update() {

    frames++; //cada vez que ejecutamos un update, recalculamos frames
    // LIMPIAR
    ctx.clearRect(0, 0, canvas.getAttribute('width'), canvas.getAttribute('height'));

    // RECALCULAR posición
    containerX += conVelocityX; 
    
    components.forEach((component)=>{
        component.y += 5;  //con esto recalculo las y de las cans y glass
    })
    
    if(frames % 100 == 0) {//frames empieza en 0 y va subiendo, cada iteración suma 1, cuando lleguemos a 100 vuelve a valer 0, 200-->0 la forma que tenemos de sumar de 100 en 100. 
        //crear can o glass
        let component = new Component();
        components.push(component); //mete las cans y botellas nuevas en un array (components)
      }  

    // COLISIÓN (comprobar)
    components.forEach((component)=>{
        component.crash();
    })
    
    // REPINTAR
      // background
    ctx.drawImage(backgroundImg, 0, 0, canvas.getAttribute("width"), canvas.getAttribute("height"))

      // can/glass
    components.forEach(component => {
        component.draw();
      })

      // container
    ctx.drawImage(containerImg, containerX, containerY, containerWidth, containerHeight)

}


// movimiento del contenedor con las flechas de teclado
document.body.addEventListener('keydown', (e)=>{
    if(e.key == 'ArrowLeft'){
        conVelocityX = -10; // lo hago con velocidad para que haga efecto ruedas  
        if(containerX < 0){
            containerX = 0;
        }
    } else if(e.key == 'ArrowRight'){
        conVelocityX = 10;
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

