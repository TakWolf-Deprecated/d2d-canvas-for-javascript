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
// 教程03-精灵和动画
//=======================================================
// 初始化引擎
//=======================================================
var e = new D2D_Engine("EMXCanvas",80,800,600);

//载入纹理
var tex_html5 = new D2D_Texture("Dat/html5.png");
var tex_runner = new D2D_Texture("Dat/runner.png");

//创建精灵
var spr_html5 = new D2D_Sprite(tex_html5,0,0,128,176);
spr_html5.setOrigin(128/2,176/2);
spr_html5.setAlpha(0.3);

//创建动画
var ani_runner = new D2D_Animation(tex_runner,6,1,16,0,0,92,74);
ani_runner.setOrigin(92/2,74/2);
ani_runner.setAlpha(0.7);

//角度
var angle = 0;

//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {

    //角度旋转
    angle += dt;
    //更新动画
    ani_runner.update(dt);

};

//=======================================================
// 屏幕渲染
//=======================================================
e.draw = function(dt) {
    		  
    //开始渲染
    this.beginDraw();
    this.clear("#FFFFFF");

    //显示精灵
    spr_html5.draw(this,200,100);
    spr_html5.draw(this,200,300,2,-0.5);
    spr_html5.draw(this,200,500,angle,2,2);

    //显示动画
    ani_runner.draw(this,550,100);
    ani_runner.draw(this,550,300,-1.2,3);
    ani_runner.draw(this,550,500,-angle,3,3);
    
    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);

















