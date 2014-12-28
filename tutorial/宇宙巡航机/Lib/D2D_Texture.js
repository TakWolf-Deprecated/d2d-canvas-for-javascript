//=======================================================
//
// EM-X for HTML5 Canvas - v0.0.3
//
// Powered by TakWolf - takgdx@gmail.com
// http://www.takgdx.com/emx-for-html5-canvas
//
//=======================================================
// -2013.10.17-
//=======================================================
// D2D_图片类
//=======================================================
/**
 * D2D_图片类
 * @param file_url 文件路径
 * @constructor
 */
function D2D_Texture(file_url) {
    //Image元素
    this.image = new Image();
    this.image.src = file_url;
}

/**
 * 取宽度
 */
D2D_Texture.prototype.getWidth = function() {
    return this.image.width;
};

/**
 * 取高度
 */
D2D_Texture.prototype.getHeight = function() {
    return this.image.height;
};

/**
 * 是否就绪-非W3C标准，可能不兼容
 */
D2D_Texture.prototype.isReady = function() {
    return this.image.complete;
};

/**
 * 取绘制句柄
 */
D2D_Texture.prototype.getDrawHandle = function() {
    return this.image;
};

/**
 * 销毁
 * 实际不执行销毁，该过程由jsGC管理器执行
 * 为保持接口统一，保留该函数 
 */
D2D_Texture.prototype.dispose = function() {
    //标记为空
    this.image = null;
};
