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
// D2D_资源加载器类
//=======================================================
var D2D_Loader = (function() {

    /**
     * D2D_资源加载器类
     * 用于加载标准D2D资源预加载
     * 即资源使用new (file_url)关键字创建，并且含有isReady()函数做载入检查，含有dispose()释放接口
     * 目前可加载的资源类型包括：
     * D2D_Texture,
     * D2D_Audio,
     * D2D_Video
     */
    function D2D_Loader() {
        //资源数组
        this.resFinished= [];//已经加载完毕的
        this.resWaiting = [];//等待加载的
    }

    /**
     * 载入资源-通用型
     * 加载一个资源，返回资源实例的引用
     * 【一次性加载时推荐使用该方法】
     * @param resType 资源类型
     * @param file_url 文件路径
     * @return 返回资源实例
     */
    D2D_Loader.prototype.load = function(resType,file_url) {
        var resObj = new resType(file_url);//实例化一个资源
        this.resWaiting.push(resObj);//资源堆栈
        return resObj;//返回这个资源到前台
    };

    /**
     * 资源添加
     * 可以向加载器中添加一个资源，该资源可能被加载，也可能未被加载
     * 会根据引用的情况判断
     * 当引用为 undefeated或者null是，才会加载资源
     * 【分阶段或者按照场景加载资源时推荐使用该方法】
     * @param resObj 资源对象引用
     * @param resType 资源类型
     * @param file_url 文件路径
     */
    D2D_Loader.prototype.add = function(resObj,resType,file_url) {
        //判断实例是否未加载,或者不是资源对象
        if(resObj == undefined || resObj == null || resObj.isReady == undefined) {
            //生成资源
            resObj = new resType(file_url);//实例化一个资源
        }
        //添加到等待数组，即使已经加载完毕，在update时再去判断
        this.resWaiting.push(resObj);
    };

    /**
     * 更新
     * 该函数应该在主循环逻辑中每次调用
     * 每次更新，会遍历resWaiting数组，并取出一个完成资源进入resFinished数组
     * 浏览器资源加载为并行，因此resFinished是无序的
     */
    D2D_Loader.prototype.update = function() {

        //首先检查resWaiting数组是否为空
        if(this.resWaiting.length >0) {
            //不为空则遍历
            for(var n=0;n<this.resWaiting.length;n++) {
                //如果资源加载完成
                if(this.resWaiting[n].isReady()) {
                    //移动资源到完成数组中
                    this.resFinished.push(this.resWaiting[n]);
                    //删除等待数组中的索引
                    this.resWaiting.splice(n,1);
                    //跳出循环
                    break;
                }
            }
        }

    };

    /**
     * 更新进度
     * 功能同update，别名函数
     * @type {Function}
     */
    D2D_Loader.prototype.updateProgress = D2D_Loader.prototype.update;

    /**
     * 获取进度
     * @param isPercentage 是否为百分比格式，true：100作为总进度，false1作为总进度，默认为false
     */
    D2D_Loader.prototype.getProgress = function(isPercentage) {

        //计算进度-两位小数-向下取整
        var progress = Math.floor((this.resFinished.length/(this.resFinished.length+this.resWaiting.length))*100);
        //返回进度
        if(isPercentage == true) {
            return progress;
        } else {
            return progress/100;
        }

    };

    /**
     * 卸载所有资源-并不释放资源
     */
    D2D_Loader.prototype.clear = function() {
        //卸载所有资源
        this.resFinished.splice(0,this.resFinished.length);
        this.resWaiting.splice(0,this.resWaiting.length);
    };

    /**
     * 销毁
     * 实际不执行销毁，该过程由jsGC管理器执行
     * 为保持接口统一，保留该函数
     */
    D2D_Loader.prototype.dispose = function() {
        //卸载所有资源
        this.resFinished.splice(0,this.resFinished.length);
        this.resWaiting.splice(0,this.resWaiting.length);
        //标记为空
        this.resFinished = null;
        this.resWaiting = null;
    };

    /**
     * 导出模板
     */
    return D2D_Loader;

})();
