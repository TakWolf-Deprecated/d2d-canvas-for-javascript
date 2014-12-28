/**
 * 场景类-载入
 * @constructor
 */
function LoadScreen() {
    //创建字体
    this.font = new D2D_Font("arial","20px",true,false);
    this.font.setColor("#FFFFFF");



}

/**
 * 初始化
 */
LoadScreen.prototype.init = function() {
    //此处载入资源




};

/**
 * 更新
 * @param dt
 */
LoadScreen.prototype.update = function(dt) {

};

/**
 * 显示
 * @param dt
 */
LoadScreen.prototype.draw = function(dt) {

    ani_loading.draw(this,100,100);
    font.draw(this,"Loading..."+loader.getProgress(true)+"%",100,50);

};








