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



var vdo_miku = new D2D_Video("Dat/miku.mp4");
vdo_miku.setOrigin(16,16);
vdo_miku.play();


var angle = 0;



//fps字体
fnt_fps = new D2D_Font("arial","25px",true,false);
fnt_fps.setColor("#FFFFFF");

//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {



angle+=0.005;




};

//=======================================================
// 屏幕渲染
//=======================================================
e.draw = function(dt) {
    		  
    //开始渲染
    this.beginDraw();
    this.clear("#000000");







    vdo_miku.draw(this,0,0,800,600);
    vdo_miku.draw(this);
    vdo_miku.draw(this,500,400,angle,8,6);


    fnt_fps.draw(this,vdo_miku.isReady(),100,50);

    //显示帧率
    fnt_fps.draw(this,"FPS:"+this.getCurrentFps(),10,5);

    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);






