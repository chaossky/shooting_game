//캔버스 세팅
let canvas;
let ctx;
let width=500;
let height=720;
let offset=25;
let IsGameOver = false;
let score=0;

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
        this.alive=true;

    };

    bullets.push(this);//총알의 위치를 저장하는 배열에 총알의 위치를 저장한다.

    this.update=function(){
        this.y-=this.speed;//총알의 y좌표를 총알의 속도만큼 빼준다. 이것이 총알의 위치를 정해주면서 속도가 결정된다.
    };

    this.checkHit=function(){
        for(let i=0;i<enemyList.length;i++){
            if(
                this.y <= enemyList[i].y &&
                this.x >= enemyList[i].x &&
                this.x <= enemyList[i].x+40
                )
                {
                score++;
                this.alive=false; 
                enemyList.splice(i,1);
            }

        }
       
    }
}
/**
 * 랜덤한 숫자 반환하는 함수
 */

function generateRandomValue(min,max){
   // console.log(min,max);
    let randomNum=Math.floor(Math.random()*(max-min+1))+min ;//min~mas 숫자 반환
    return randomNum;
}

//캔버스 세팅 끝
/**
 * 적군 찍어 내기
 * 
 */

let enemyList=[];
 function Enemy(){
    this.x=0;//적의 x좌표기본 세팅
    this.y=0;//적의 y좌표기본 세팅
    this.speed=1; //적의 속도기본 세팅

    //적군 최상단에서 시작
    this.init=function(){
        this.y=0;
        //console.log(canvas.width-enemyImage.width);
        this.x=generateRandomValue(0,336);
        //console.log(this.x);
        enemyList.push(this);
       // console.log("enemy generated");
    }
    this.update=function(){
        this.y+=this.speed;//적의 위치를 정해주면서 속도가 결정된다.

        if(this.y>=canvas.height-48){
            IsGameOver=true;
        }
    } 
}

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
            if(bullets[i].alive){
                bullets[i].update();
                bullets[i].checkHit();
            }
        }

        for (let i=0;i<enemyList.length;i++){
            enemyList[i].update();
        }
    }
    /**
     * 총알을 만드는 함수
     */
    function createBullet(){
        let bullet = new Bullet();
        bullet.init();
    }

    /**
     * 적군을 생성하는 함수
     */
    function createEnemy(){
        const internal=setInterval(function () {
            let e =new Enemy();
            e.init();
        },1000);
    }

    /**
     * 이미지를 렌더링 하는 함수
     */
    function render() {
        //배경이미지를 그리기

        ctx.drawImage(backgroundImage,0,0,width,height);
        //우주선을 그린다.
        ctx.drawImage(spaceshipImage,spaceshipX,spaceshipY,spaceshipImage.width,spaceshipImage.height);
    
        //스코어 출력
        ctx.fillText(`Score :${score}`, 20,30);
        ctx.fillStyle="white";
        ctx.font="30px Arial";

        //총알을 그린다.
        for(let i=0;i<bullets.length;i++){
            if(bullets[i].alive){
                ctx.drawImage(bulletImage,bullets[i].x,bullets[i].y,10,10);
            }
            
        }
        //적을 생성
        for(let i=0;i<enemyList.length;i++){
            ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y,50,40);
           // console.log(enemyList[i]);
        }
    }

    function main() {
        if (!IsGameOver){
            update();
            render();
            requestAnimationFrame(main);
        } else{
            ctx.drawImage(gameoverImage,10,50,380,380);
        }
       
    }

    loadImage();
    setupKeyboardListener();
    createEnemy();
    main();