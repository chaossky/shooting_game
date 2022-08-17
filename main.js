//캔버스 세팅
let canvas;
let ctx;
let width=400;
let height=700;
let offset=25;


canvas=document.createElement("canvas");
ctx=canvas.getContext("2d");
canvas.width=width;
canvas.height=height;
document.body.appendChild(canvas);

//우주선의 위치 x,y좌표
let spaceshipX=180;
let spaceshipY=632;

//총알
let bullets=[];

//총알 함수
function Bullet(){
    this.x=0;//총알의 x좌표기본 세팅
    this.y=0;//총알의 y좌표기본 세팅
    this.speed=3; //총알의 속도기본 세팅
    this.init=function(){
        this.x=spaceshipX+spaceshipImage.width/2-5;// 총알 기본 x  위치 세팅
        this.y=spaceshipY;//총알의 기본 y 위치 세팅
    }

    bullets.push(this);//총알의 위치를 저장하는 배열에 총알의 위치를 저장한다.

    this.update=function(){
        this.y-=this.speed;//총알의 y좌표를 총알의 속도만큼 빼준다. 이것이 총알의 위치를 정해주면서 속도가 결정된다.
    }
}

//캔버스 세팅 끝
//이미지 불러오기   
//각각의 이미지를 나타내기 위해서 변수로 선언한다.
let backgroundImage,spaceshipImage,bulletImage, enemyImage,gameoverImage;

//이미지를 불러오는 함수
function loadImage(){
    //배경 이미지
    backgroundImage =new Image();
    backgroundImage.src="img/backgroundimage.jpg";

    //우주선 이미지
    spaceshipImage =new Image();
    spaceshipImage.src="img/spaceship.png";

    //총알 이미지
    bulletImage =new Image();
    bulletImage.src="img/bullet.png";
    
    //적 이미지
    enemyImage =new Image();
    enemyImage.src="img/enemy.png";

    //게임오버 이미지
    gameoverImage =new Image();
    gameoverImage.src="img/gameover.png";

    }

    //키가 눌려 있는지 확인하는 배열
    let keysDown = {};

    //키보드의 이벤트를 처리하는 함수
    function setupKeyboardListener(){
        document.addEventListener("keydown",function(event){
            //console.log(e.keyCode);
         //   keysDown[event.keyCode]=true;
            //keyValue=event.code;
            keysDown[event.code]=true;
            //console.log(keysDown[keyValue]);
        });
        document.addEventListener("keyup",function(event){
            keyValue=event.code;
            delete keysDown[event.code];
          //  console.log("지운 키코드"+event.code);
           //console.log(keysDown.);
        });
    }
    
    function update(){
      //  console.log(spaceshipX);
        if ("ArrowRight" in keysDown){
            spaceshipX+=5;
          }
        if ("ArrowLeft" in keysDown){
            spaceshipX-=5;
        }

        if ("Space" in keysDown){
            createBullet();
        }

        if (spaceshipX<-offset){
            spaceshipX=-offset;
        }
        if (spaceshipX>width-spaceshipImage.width+offset){
            spaceshipX=width-spaceshipImage.width+offset;
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