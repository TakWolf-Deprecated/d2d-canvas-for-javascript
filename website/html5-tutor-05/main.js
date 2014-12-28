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
// 教程05-鼠标与键盘事件
//=======================================================
// 初始化引擎
//=======================================================
var e = new D2D_Engine("EMXCanvas",80,800,600);

//创建字体
var font = new D2D_Font("arial","25px",false,false);
font.setColor("#000000");

//记录鼠标坐标
var x = 400;
var y = 300;

//鼠标状态次数
mouseCount = {
    up:0,
    click:0,
    dbclick:0,
    wheel:0,
    out:0,
    over:0
}

//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {

    //取鼠标坐标
    x = e.getMousePosX();
    y = e.getMousePosY();
	
    //鼠标是否弹起
    if(e.isMouseUp()) {
        mouseCount.up ++;
    }
    //鼠标是否单击
    if(e.isMouseClick()) {
        mouseCount.click ++;
    }
    //鼠标是否双击
    if(e.isMouseDbclick()) {
        mouseCount.dbclick ++;
    }
    //鼠标是否滚动
    if(e.isMouseWheel()) {
        mouseCount.wheel ++;
    }
    //鼠标是否离开画布
    if(e.isMouseOut()) {
        mouseCount.out ++;
    }
    //鼠标是否进入画布
    if(e.isMouseOver()) {
        mouseCount.over ++;
    }

};

//=======================================================
// 屏幕渲染
//=======================================================
e.draw = function(dt) {
    		  
    //开始渲染
    this.beginDraw();
    this.clear("#FFFFFF");
	
    /**
      * 鼠标事件部分
      */
    //持续检测
    //鼠标是否按下
    font.draw(this,"鼠标按下："+e.isMouseDown(),10,10);
    //鼠标是否移动
    font.draw(this,"鼠标移动："+e.isMouseMove(),10,35);
	
    //瞬时检测
    //鼠标是否弹起
    font.draw(this,"鼠标弹起："+mouseCount.up,10,60);
    //鼠标是否单击
    font.draw(this,"鼠标单击："+mouseCount.click,10,85);
    //鼠标是否双击
    font.draw(this,"鼠标双击："+mouseCount.dbclick,10,110);
    //鼠标是否滚动
    font.draw(this,"鼠标滚动："+mouseCount.wheel,10,135);
    //鼠标是否离开画布
    font.draw(this,"鼠标离开画布："+mouseCount.out,10,160);
    //鼠标是否进入画布
    font.draw(this,"鼠标进入画布："+mouseCount.over,10,185);

    //显示鼠标坐标
    font.draw(this,"鼠标坐标：x="+x+",y="+y,x,y);
	
    /**
      * 键盘检测
      */
    font.draw(this,"-输入ASDW或者方向键检测-",400,10);
    font.draw(this,"UP    W："+input.KEY_UP,400,60);
    font.draw(this,"DOWN  S："+input.KEY_DOWN,400,85);
    font.draw(this,"LEFT  A："+input.KEY_LEFT,400,110);
    font.draw(this,"RIGHT D："+input.KEY_RIGHT,400,135);
 
    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);

















