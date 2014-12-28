//=======================================================
//
// EM-X for HTML5 Canvas - v0.0.2
//
// Powered by TakWolf - takgdx@gmail.com
// http://www.takgdx.com/emx-for-html5-canvas
//
//=======================================================
// -2013.10.3-
//=======================================================
// 教程07-播放音效
//=======================================================
// 初始化引擎
//=======================================================
var e = new D2D_Engine("EMXCanvas",80,400,1000);

//创建音效
var bgm = new D2D_Audio("Dat/bgm.ogg");
bgm.setLoop(true);

//创建字体
var font = new D2D_Font("arial","25px",true,false);
font.setColor("#000000");

//场景状态
screenState = "载入资源";

//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {
	
    //判断当前游戏场景状态
    if(screenState == "载入资源"){
        //判断音效是否载入
        if(bgm.isReady()) {
            screenState = "游戏场景";
            bgm.play();
        }	
    }
    else if (screenState == "游戏场景") {
        if(e.isMouseClick()) {
            if(bgm.isPlaying()) {
                bgm.pause();
            } else {
                bgm.play();
            }
        }
    } 

};

//=======================================================
// 屏幕渲染
//=======================================================
e.draw = function(dt) {
    		  
    //开始渲染
    this.beginDraw();
    this.clear("#FFFFFF");
	
    //显示文字
    font.draw(this,"音效载入状态："+bgm.isReady(),10,10);
    font.draw(this,"音效状态代码："+bgm.getReadyStateCode(),10,35);
    font.draw(this,"音效状态信息："+bgm.getReadyState(),10,60);
	
    //场景判断
    if(screenState == "载入资源") {
        font.draw(this,"音效载入中。。。",10,100);	
    } 
    else if (screenState == "游戏场景") {
        font.draw(this,"音效载入完毕，鼠标左键控制播放停止",10,100);
    } 
 
    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);

















