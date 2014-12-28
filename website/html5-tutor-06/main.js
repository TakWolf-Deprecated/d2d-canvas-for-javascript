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
// 教程06-碰撞检测
//=======================================================
// 初始化引擎
//=======================================================
var e = new D2D_Engine("EMXCanvas",80,800,600);

//创建字体
var font = new D2D_Font("arial","30px",true,false);
font.setColor("#000000");

//记录鼠标坐标
var x = 400;
var y = 300;

//创建矩形盒
var box1 = new D2D_RectBox(0,0,100,100);
box1.setOrigin(50,50);

var box2 = new D2D_RectBox(100,100,120,210);
var box3 = new D2D_RectBox(400,250,150,290);

//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {

    //取鼠标坐标
    x = e.getMousePosX();
    y = e.getMousePosY();

    //更新碰撞和1
    box1.setPosition(x,y);

};

//=======================================================
// 屏幕渲染
//=======================================================
e.draw = function(dt) {
    		  
    //开始渲染
    this.beginDraw();
    this.clear("#FFFFFF");

    //显示碰撞和
    box1.draw(this);
    box2.draw(this,"#FF0000");
    box3.draw(this,"#00FF00");

    //显示检测结果
    if(box2.testRect(box1)){
        font.draw(this,"和Box2碰撞",50,10);
    }
    if(box3.testPoint(x,y)){
        font.draw(this,"鼠标在Box3中",500,10);
    }
 
    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);

















