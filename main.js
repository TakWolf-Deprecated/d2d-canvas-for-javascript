//=======================================================
//
// EM-X for HTML5 Canvas - v0.0.3
//
// Powered by TakWolf - takgdx@gmail.com
// http://www.takgdx.com/emx-for-html5-canvas
//
//=======================================================
// -2013.10.22-
//=======================================================
// 初始化引擎
//=======================================================
var e = new D2D_Engine("EMXCanvas",80,800,600);

//载入纹理
var tex_html5 = new D2D_Texture("Dat/html5.png");
var tex_emx = new D2D_Texture("Dat/emx.png");
var tex_chrome = new D2D_Texture("Dat/chrome.png");
var tex_firefox = new D2D_Texture("Dat/firefox.png");
var tex_opera = new D2D_Texture("Dat/opera.png");
var tex_safari = new D2D_Texture("Dat/safari.png");
var tex_ie = new D2D_Texture("Dat/ie.png");

//创建精灵
var spr_html5 = new D2D_Sprite(tex_html5,0,0,128,176);
spr_html5.setOrigin(128/2,176/2);
var spr_emx = new D2D_Sprite(tex_emx,0,0,96,96);
spr_emx.setOrigin(72,61);
var spr_chrome = new D2D_Sprite(tex_chrome,0,0,96,96);
spr_chrome.setOrigin(248,48);
var spr_firefox = new D2D_Sprite(tex_firefox,0,0,96,96);
spr_firefox.setOrigin(248,48);
var spr_opera = new D2D_Sprite(tex_opera,0,0,96,96);
spr_opera.setOrigin(248,48);
var spr_safari = new D2D_Sprite(tex_safari,0,0,96,96);
spr_safari.setOrigin(248,48);
var spr_ie = new D2D_Sprite(tex_ie,0,0,96,96);
spr_ie.setOrigin(248,48);

//创建动画
var tex_runner = new D2D_Texture("Dat/runner.png");
var ani_runner = new D2D_Animation(tex_runner,6,1,16,0,0,92,74);
ani_runner.setOrigin(19,73);

//创建音效
var bgm = new D2D_Audio("Dat/bgm.ogg");
bgm.setLoop(true);
bgm.play();

//创建字体
var font = new D2D_Font("arial","30px",true,false);
font.setColor("#000000");

//角度
var angle = 0;
//x
var x = 400;
var speed = 3;

//鼠标不可视
e.setMouseStyle("none");

//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {

    //角度旋转
    angle += speed/200;
    //更新动画
    ani_runner.update(dt);

    //x更新
    speed += -this.getMouseWheel()/2;
    x+=speed;
    if(x>800+16) {
        x=-16;
    }
    else if(x<-16) {
        x=800+16;
    }

};

//=======================================================
// 屏幕渲染
//=======================================================
e.draw = function(dt) {
    		  
    //开始渲染
    this.beginDraw();
    this.clear("#FFFFFF");

    //绘制
    spr_html5.draw(this,this.getMousePosX(),this.getMousePosY(),angle*4,0.5,0.5);
    spr_emx.draw(this,400,200,-angle*5,1,1);
    spr_chrome.draw(this,400,200,angle+0*1.256,0.5,0.5);
    spr_firefox.draw(this,400,200,angle+1*1.256,0.5,0.5);
    spr_opera.draw(this,400,200,angle+2*1.256,0.5,0.5);
    spr_safari.draw(this,400,200,angle+3*1.256,0.5,0.5);
    spr_ie.draw(this,400,200,angle+4*1.256,0.5,0.5);

    //绘制小人
    ani_runner.draw(this,x,520,0,2,2);

    //显示文字
    font.draw(this,"FPS:"+this.getCurrentFps(),10,5);
    font.draw(this,"EM-X for HTML5 Canvas",20,600-40);
 
    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);

















