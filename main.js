//캔버스 세팅
let canvas;
let ctx;
let width=400;
let height=700;

canvas=document.createElement("canvas");
ctx=canvas.getContext("2d");
canvas.width=width;
canvas.height=height;
document.body.appendChild(canvas);


let spaceshipX=180;
let spaceshipY=632;

let bullets=[];

function Bullet(){
    this.x=0;
    this.y=0;
    this.speed=3;
    this.init=function(){
        this.x=spaceshipX+spaceshipImage.width/2-5;
        this.y=spaceshipY;
    }

    bullets.push(this);

    this.update=function(){
        this.y-=this.speed;
    }
}

//캔버스 세팅 끝
//이미지 불러오기   
let backgroundImage,spaceshipImage,bulletImage, enemyImage,gameoverImage;

function loadImage(){
    backgroundImage =new Image();
    backgroundImage.src="img/backgroundimage.jpg";

    spaceshipImage =new Image();
    spaceshipImage.src="img/spaceship.png";

    bulletImage =new Image();
    bulletImage.src="img/bullet.png";
    
    enemyImage =new Image();
    enemyImage.src="img/enemy.png";

    gameoverImage =new Image();
    gameoverImage.src="img/gameover.png";

    }
let keysDown = {};

    function setupKeyboardListener(){
        document.addEventListener("keydown",function(event){
            //console.log(e.keyCode);
            keysDown[event.keyCode]=true;
        });
        document.addEventListener("keyup",function(event){
            delete keysDown[event.keyCode];
        });
    }
    
    function update(){
        if (39 in keysDown){
            spaceshipX+=5;
          }
        if (37 in keysDown){
            spaceshipX-=5;
        }

        if (32 in keysDown){
            createBullet();
        }

        if (spaceshipX<0){
            spaceshipX=0;
        }
        if (spaceshipX>width-spaceshipImage.width){
            spaceshipX=width-spaceshipImage.width;
        }   

        for(let i=0;i<bullets.length;i++){
            bullets[i].update();
        }
    }
    

    function createBullet(){
        let bullet = new Bullet();
        bullet.init();

    }

    function render() {
        ctx.drawImage(backgroundImage,0,0,width,height);
        ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY,spaceshipImage.width,spaceshipImage.height);
        
        ctx.drawImage(enemyImage,100,100,enemyImage.width,enemyImage.height);
        for(let i=0;i<bullets.length;i++){
            ctx.drawImage(bulletImage,bullets[i].x,bullets[i].y,10,10);
        }


    }

    function main() {
        update();
        render();
        requestAnimationFrame(main);
    }


    loadImage();
    setupKeyboardListener();
    main();