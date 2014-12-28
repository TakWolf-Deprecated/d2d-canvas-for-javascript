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
// D2D_视频类
//=======================================================
var D2D_Video = (function() {

    /**
     * D2D_视频类
     * 浏览器支持率低-chrome支持avcmp4编码
     * @param file_url
     * @constructor
     */
    function D2D_Video(file_url) {
        //创建Video标签
        this.video = document.createElement("video");
        this.video.src = file_url;
        this.video.loop = false;//默认循环机制

        /**
         * 中心点
         */
        this.originX = 0;
        this.originY = 0;
        /**
         * 透明度
         */
        this.alpha = 1;

    }

    /**
     * 显示
     */
    D2D_Video.prototype.draw = function(engine) {
        //取上下文
        var context = engine.getContext();
        //保存状态
        context.save();

        //设置透明度
        context.globalAlpha = this.alpha;

        /**
         * 渲染在(0,0)
         * @param engine 引擎句柄
         */
        if (arguments.length == 1) {
            context.drawImage(
                this.video,
                0-this.originX,
                0-this.originY
            );
        }
        /**
         * 渲染在(x,y)
         * @param engine 引擎句柄
         * @param x 显示位置x
         * @param y 显示位置y
         */
        else if (arguments.length == 3) {
            context.drawImage(
                this.video,
                arguments[1]-this.originX,
                arguments[2]-this.originY
            );
        }
        /**
         * 显示_范围缩放
         * @param engine 引擎句柄
         * @param x 显示位置x
         * @param y 显示位置y
         * @param width 绘制宽度
         * @param height 绘制高度
         */
        else if (arguments.length == 5) {
            context.drawImage(
                this.video,
                arguments[1]-this.originX,
                arguments[2]-this.originY,
                arguments[3],
                arguments[4]
            );
        }
        /**
         * 宽高无效-不建议使用
         * @param engine 引擎句柄
         * @param x 显示位置x
         * @param y 显示位置y
         * @param angle 旋转角度
         * @param scaleX 横向比例
         * @param scaleY 纵向比例
         */
        else if (arguments.length == 6) {
            //矩阵变换
            context.translate(arguments[1],arguments[2]);
            context.rotate(arguments[3]);
            context.scale(arguments[4],arguments[5]);
            //绘制
            context.drawImage(
                this.video,
                0-this.originX,
                0-this.originY,
                32,//this.video.width,//宽高无效，请以32像素做缩放
                32//this.video.height
            );
        }

        //恢复状态
        context.restore();
    };

    /**
     * 置透明度
     * 范围为0-1
     */
    D2D_Video.prototype.setAlpha = function(alpha) {
        this.alpha = alpha;
    };

    /**
     * 取透明度
     */
    D2D_Video.prototype.getAlpha = function() {
        return this.alpha;
    };

    /**
     * 置中心点
     */
    D2D_Video.prototype.setOrigin = function(originX,originY) {
        this.originX = originX;
        this.originY = originY;
    };

    /**
     * 取中心点X
     */
    D2D_Video.prototype.getOriginX = function() {
        return this.originX;
    };

    /**
     * 取中心点Y
     */
    D2D_Video.prototype.getOriginY = function() {
        return this.originY;
    };

    /**
     * 取绘制句柄
     * 通过精灵类构建渲染对象
     */
    D2D_Video.prototype.getDrawHandle = function() {
        return this.video;
    };

    /**
     * 播放
     */
    D2D_Video.prototype.play = function() {
        this.video.play();
    };

    /**
     * 暂停
     */
    D2D_Video.prototype.pause = function() {
        this.video.pause();
    };

    /**
     * 停止
     */
    D2D_Video.prototype.stop = function() {
        //先暂停
        this.video.pause();
        //线程不安全，需要判断
        if(this.video.readyState == 4) {
            this.video.currentTime = 0;//置播放位置为0
        }
    };

    /**
     * 重新加载视频
     */
    D2D_Video.prototype.reload = function(file_url) {
        this.video.src = file_url;
        this.video.load();
    };

    /**
     * 设置音量
     * 1为原音量，0为静音，不能超过1
     */
    D2D_Video.prototype.setVolume = function(volume) {
        this.video.volume = volume;
    };

    /**
     * 获取音量
     */
    D2D_Video.prototype.getVolume = function() {
        return this.video.volume;
    };

    /**
     * 是否循环
     */
    D2D_Video.prototype.isLoop = function() {
        return this.video.loop;
    };

    /**
     * 设置是否循环
     * @param isLoop boolean值
     */
    D2D_Video.prototype.setLoop = function(isLoop) {
        this.video.loop = isLoop;
    };

    /**
     * 取视频长度-时间为单位
     */
    D2D_Video.prototype.getTotalTime = function() {
        return this.video.duration;
    };

    /**
     * 取当前播放时间
     */
    D2D_Video.prototype.getCurrentTime = function() {
        return this.video.currentTime;
    };

    /**
     * 置当前播放时间-仅在就绪状态下使用
     */
    D2D_Video.prototype.setCurrentTime = function(currentTime) {
        this.video.currentTime = currentTime;
    };

    /**
     * 取播放速度
     */
    D2D_Video.prototype.getSpeed = function() {
        return this.video.playbackRate;
    };

    /**
     * 置播放速度
     * 1为不变
     */
    D2D_Video.prototype.setSpeed = function(speed) {
        this.video.playbackRate = speed;
    };

    /**
     * 视频是否播放中
     */
    D2D_Video.prototype.isPlaying = function() {
        return (this.video.paused == false);
    };

    /**
     * 视频是否就绪
     */
    D2D_Video.prototype.isReady = function() {
        return (this.video.readyState == 4);
    };

    /**
     * 获取视频就绪状态代码
     * 0 = HAVE_NOTHING - 没有关于视频/视频是否就绪的信息
     * 1 = HAVE_METADATA - 关于视频/视频就绪的元数据
     * 2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧/毫秒
     * 3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
     * 4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
     */
    D2D_Video.prototype.getReadyStateCode = function() {
        return this.video.readyState;
    };

    /**
     * 获取视频就绪状态信息
     */
    D2D_Video.prototype.getReadyState = function() {
        if(this.video.readyState == 0) {
            return "HAVE_NOTHING";
        }
        else if(this.video.readyState == 1) {
            return "HAVE_METADATA";
        }
        else if(this.video.readyState == 2) {
            return "HAVE_CURRENT_DATA";
        }
        else if(this.video.readyState == 3) {
            return "HAVE_FUTURE_DATA";
        }
        else if(this.video.readyState == 4) {
            return "HAVE_ENOUGH_DATA";
        }
        else {
            return "READY_STATE_ERROR";
        }
    };

    /**
     * 销毁
     * 实际不执行销毁，该过程由jsGC管理器执行
     * 为保持接口统一，保留该函数
     */
    D2D_Video.prototype.dispose = function() {
        //标记为空
        this.video.pause();
        this.video = null;

        this.originX = null;
        this.originY = null;

        this.alpha = null;
    };

    /**
     * 导出模板
     */
    return D2D_Video;

})();
