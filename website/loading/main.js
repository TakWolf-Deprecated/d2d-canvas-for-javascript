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
// 资源加载器-实现一个片头加载效果
//=======================================================
var e = new D2D_Engine("EMXCanvas",80,800,600);




//定义一个资源加载器
var loader = new D2D_Loader();
//定义载体图标
var tex_loading = new D2D_Texture("Dat/loading.png");
var ani_loading = new D2D_Animation(tex_loading,17,1,16,0,0,100,100);
ani_loading.setOrigin(50,50);

//加载片头资源
var tex_logo_em = loader.load(D2D_Texture,"Dat/logo_em.png");
var tex_logo_bg = loader.load(D2D_Texture,"Dat/logo_bg.png");
var ado_logo_01 = loader.load(D2D_Audio,"Dat/loading_1.png");
var ado_logo_02 = loader.load(D2D_Audio,"Dat/loading_2.png");

//生成片头精灵
var spr_logo_em = new D2D_Sprite(tex_logo_em,0,0,100,100);
spr_logo_em.setOrigin(50,50);
var spr_logo_bg = new D2D_Sprite(tex_logo_bg,0,0,800,600);
spr_logo_bg.setAlpha(0);

//此处加载其他资源
for (var n=0;n<300;n++) {
    var tex_temp = loader.load(D2D_Texture,"");//这里为空路径，浏览器认为已加载
}

//字体
fnt = new D2D_Font("arial","25px",true,false);
fnt.setHorAlign("center");
fnt.setVerAlign("middle");
fnt.setColor("#FFFFFF");

//场景标识
var screenState = "场景_载入资源";
var tik = 0;//片段动画阶段标识
var time = 0;//计时器

//em缩放比例
var scale = 0;

//=======================================================
// 屏幕更新
//=======================================================
e.update = function(dt) {

    //场景_载入资源
    if(screenState == "场景_载入资源") {
        //更新加载进程
        loader.update();
        ani_loading.update(dt);
        if(loader.getProgress()==1){
            screenState = "场景_片头动画";
        }
    }
    //场景_片头动画
    else if(screenState == "场景_片头动画") {
        //片头动画逻辑
        if(tik == 0) {
            if(spr_logo_bg.getAlpha()<1){
                spr_logo_bg.setAlpha(spr_logo_bg.getAlpha()+0.04);
            }
            else {
                spr_logo_bg.setAlpha(1);
                tik = 2;
                ado_logo_01.play();
                ado_logo_02.play();
            }
        }
        else if(tik == 2) {
            if(time < 60) {
                time ++;
            }
            else if(time >=60 ) {
                tik = 3;
                scale = 8;
            }
        }
        else if(tik == 3) {
            if(scale > 1) {
                scale -= 0.5;
            } else {
                scale = 1;
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
    this.clear("#000000");

    //场景_载入资源
    if(screenState == "场景_载入资源") {
        //资源加载状态
        ani_loading.draw(this,400,300-50);
        fnt.draw(this,"资源载入中..."+loader.getProgress(true)+"%",400,350);
    }
    //场景_片头动画
    else if(screenState == "场景_片头动画") {
        //片头动画逻辑
        spr_logo_bg.draw(this);
        spr_logo_em.draw(this,390,220,0,scale,scale);
    }

    //结束渲染
    this.endDraw();

};

//=======================================================
// 启动引擎
//=======================================================
startEngine(e);






