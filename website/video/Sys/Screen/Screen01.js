/**
 * Logo类-载入
 * @constructor
 */
var Screen01 = function() {

}

/**
 * 初始化
 */
Screen01.prototype.init = function() {

    vid_miku.play();
    vid_miku.setOrigin(16,16);
    this.angle = 0;

};

/**
 * 更新
 * @param dt
 */
Screen01.prototype.update = function(dt) {

    this.angle += 0.01;

};

/**
 * 显示
 * @param dt
 */
Screen01.prototype.draw = function(dt) {

    vid_miku.draw(this,400,300,this.angle,16,12);

};
