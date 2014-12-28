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
// 教程04-绘制文本
//=======================================================
// 初始化引擎
//=======================================================
var e = new D2D_Engine("EMXCanvas",80,800,600);

var font = new D2D_Font("幼圆","60px",true,true);
var angle = 0;
//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {

	angle+=dt;

};

//=======================================================
// 屏幕渲染
//=======================================================
e.draw = function(dt) {
    		  
    //开始渲染
    this.beginDraw();
    this.clear("#FFFFFF");

    //绘制文本
    font.setColor("#FF0000");
    font.draw(this,"普通绘制函数",100,50);
    font.setColor("#00FF00");
    font.drawFillText(this,"显示填充文本",100,130);
    font.setLineWidth(1);
    font.drawStrokeText(this,"显示线框文本",100,210);
    
    //描边文本
    font.setColor("#FF0000");
    font.drawFillText(this,"这是一个描边文本",100,290);
    font.setLineWidth(3);
    font.setColor("#000000");
    font.drawStrokeText(this,"这是一个描边文本",100,290);
    
    //高级绘制
    font.setColor("#0000FF");
    font.drawFillText(this,"高级绘制",300,370,angle,1.5,-1);
    
    
    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);

















