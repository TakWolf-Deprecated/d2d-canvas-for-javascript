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
// D2D_引擎类
//=======================================================
/**
 * D2D_引擎类
 * @param canvasId
 * @param fps
 * @param width
 * @param height
 * @constructor
 */
function D2D_Engine(canvasId,fps,width,height) {

    //获取canvas
    this.canvas = document.getElementById(canvasId);
    this.canvas.width = width;
    this.canvas.height = height;
    this.context2D = this.canvas.getContext("2d");

    //缓冲区
    this.canvasBuffer = document.createElement("canvas");
    this.canvasBuffer.width = width;
    this.canvasBuffer.height = height;
    this.contextBuffer2D = this.canvasBuffer.getContext("2d");

    //帧率
    this.fps = fps;
    this.currentFps = 0;
    this.frameCounter = 0;
    this.timeCounter = 0;

    /**
     * 鼠标状态
     * 注意：由于this关键字局限性，鼠标相关的状态注册在canvas对象内部
     */
    this.canvas.mouseStates = {
        //按键状态，支持三种按键
        leftButton:{
            down:false,
            up:false,
            click:false,
            dblclick:false
        },
        rightButton:{
            down:false,
            up:false,
            click:false,
            dblclick:false
        },
        middleButton:{
            down:false,
            up:false,
            click:false,
            dblclick:false
        },
        //鼠标位置
        pos:{
            x:0,
            y:0
        },
        //其他状态
        wheel:false,
        move:false,
        out:false,
        over:false,
        //滚动方向
        wheelDelta:0//0表示未滚动，1表示向上，-1表示向下
    };
    /**
     * 定义回调函数
     */
    //·鼠标按下·
    function mouseDown(event) {
        //兼容IE
        event = event || window.event;
        //检测IE
        if(!-[1,]) {
            switch(event.button) {
                case 1:
                    this.mouseStates.leftButton.down = true;
                    break;
                case 2:
                    this.mouseStates.rightButton.down = true;
                    break;
                case 4:
                    this.mouseStates.middleButton.down = true;
                    break;
            }
        }
        //非IE-W3C标准
        else {
            switch(event.which) {
                case 1:
                    this.mouseStates.leftButton.down = true;
                    break;
                case 2:
                    this.mouseStates.middleButton.down = true;
                    break;
                case 3:
                    this.mouseStates.rightButton.down = true;
                    break;
            }
        }
        //取消默认事件
        event.preventDefault();
    }
    //·鼠标抬起·
    function mouseUp(event) {
        //兼容IE
        event = event || window.event;
        //检测IE
        if(!-[1,]) {
            switch(event.button) {
                case 1:
                    this.mouseStates.leftButton.up = true;
                    this.mouseStates.leftButton.down = false;
                    break;
                case 2:
                    this.mouseStates.rightButton.up = true;
                    this.mouseStates.rightButton.down = false;
                    break;
                case 4:
                    this.mouseStates.middleButton.up = true;
                    this.mouseStates.middleButton.down = false;
                    break;
            }
        }
        //非IE-W3C标准
        else {
            switch(event.which) {
                case 1:
                    this.mouseStates.leftButton.up = true;
                    this.mouseStates.leftButton.down = false;
                    break;
                case 2:
                    this.mouseStates.middleButton.up = true;
                    this.mouseStates.middleButton.down = false;
                    break;
                case 3:
                    this.mouseStates.rightButton.up = true;
                    this.mouseStates.rightButton.down = false;
                    break;
            }
        }
        //取消默认事件
        event.preventDefault();
    }
    //·鼠标单击·
    function mouseClick(event) {
        //兼容IE
        event = event || window.event;
        //检测IE
        if(!-[1,]) {
            switch(event.button) {
                case 1:
                    this.mouseStates.leftButton.click = true;
                    break;
                case 2:
                    this.mouseStates.rightButton.click = true;
                    break;
                case 4:
                    this.mouseStates.middleButton.click = true;
                    break;
            }
        }
        //非IE-W3C标准
        else {
            switch(event.which) {
                case 1:
                    this.mouseStates.leftButton.click = true;
                    break;
                case 2:
                    this.mouseStates.middleButton.click = true;
                    break;
                case 3:
                    this.mouseStates.rightButton.click = true;
                    break;
            }
        }
        //取消默认事件
        event.preventDefault();
    }
    //·鼠标双击·
    function mouseDblclick(event) {
        //兼容IE
        event = event || window.event;
        //检测IE
        if(!-[1,]) {
            switch(event.button) {
                case 1:
                    this.mouseStates.leftButton.dblclick = true;
                    break;
                case 2:
                    this.mouseStates.rightButton.dblclick = true;
                    break;
                case 4:
                    this.mouseStates.middleButton.dblclick = true;
                    break;
            }
        }
        //非IE-W3C标准
        else {
            switch(event.which) {
                case 1:
                    this.mouseStates.leftButton.dblclick = true;
                    break;
                case 2:
                    this.mouseStates.middleButton.dblclick = true;
                    break;
                case 3:
                    this.mouseStates.rightButton.dblclick = true;
                    break;
            }
        }
        //取消默认事件
        event.preventDefault();
    }
    //·鼠标滚动·
    function mouseWheel(event) {
        //兼容IE
        event = event || window.event;
        //状态
        this.mouseStates.wheel = true;
        //设置滚动方向-IE/Opera/Chrome
        if(event.wheelDelta) {
            this.mouseStates.wheelDelta = event.wheelDelta/120;
        }
        //Firefox
        else if(event.detail) {
            this.mouseStates.wheelDelta = -event.detail/3;
        }
        //取消默认事件
        event.preventDefault();
    }
    //·鼠标移动·
    function mouseMove(event) {
        //兼容IE
        event = event || window.event;
        //状态
        this.mouseStates.move = true;
        //判断是否为火狐浏览器
        if(navigator.userAgent.indexOf("Firefox")>0) {
            //FireFox鼠标坐标取法
            var rect = this.getBoundingClientRect();//取出canvas矩形
            this.mouseStates.pos.x = event.clientX-rect.left;
            this.mouseStates.pos.y = event.clientY-rect.top;
        } else {
            //Chrome-Opera-Safari-鼠获取方法，firefox不兼容
            this.mouseStates.pos.x = event.offsetX;
            this.mouseStates.pos.y = event.offsetY;
        }
        //取消默认事件
        event.preventDefault();
    }
    //·鼠标离开画布·
    function mouseOut(event) {
        //兼容IE
        event = event || window.event;
        //状态
        this.mouseStates.out = true;
        //取消所有down事件
        this.mouseStates.leftButton.down = false;
        this.mouseStates.rightButton.down = false;
        this.mouseStates.middleButton.down = false;
        //取消默认事件
        event.preventDefault();
    }
    //·鼠标进入画布·
    function mouseOver(event) {
        //兼容IE
        event = event || window.event;
        //状态
        this.mouseStates.over = true;
        //取消默认事件
        event.preventDefault();
    }
    //·鼠标右键菜单·
    function contextMenu(event) {
        //兼容IE
        event = event || window.event;
        //右键设置不返回菜单
        event.returnValue = false;
        //取消默认事件
        event.preventDefault();
    }
    /**
     * 鼠标事件回调适配-要求适配主流浏览器
     */
    //W3C标准事件注册-使用该方法Chrome会报错
    /*
    if(this.canvas.addEventListener){
        this.canvas.addEventListener("mousedown",mouseDown,false);
        this.canvas.addEventListener("mouseup",mouseUp,false);
        this.canvas.addEventListener("click",mouseClick,false);
        this.canvas.addEventListener("dblclick",mouseDblclick,false);
        this.canvas.addEventListener("mousewheel",mouseWheel,false);
        this.canvas.addEventListener("mousemove",mouseMove,false);
        this.canvas.addEventListener("mouseout",mouseOut,false);
        this.canvas.addEventListener("mouseover",mouseOver,false);
        this.canvas.addEventListener("contextmenu",contextMenu,false);
    }*/
    //反模式注册-Chrome、Opera、Safari、firefox
    this.canvas.onmousedown = mouseDown;
    this.canvas.onmouseup = mouseUp;
    this.canvas.onclick = mouseClick;
    this.canvas.ondblclick = mouseDblclick;
    this.canvas.onmousewheel = mouseWheel;//firefox不支持
    this.canvas.onmousemove = mouseMove;
    this.canvas.onmouseout = mouseOut;
    this.canvas.onmouseover	= mouseOver;
    this.canvas.oncontextmenu = contextMenu;
    //firefox注册滚动事件-个性
    this.canvas.addEventListener("DOMMouseScroll",mouseWheel,false);
    /*
    //IE事件注册-M$个性-IE8以下版本
    if(this.canvas.attachEvent){
        this.canvas.attachEvent("onmousedown",mouseDown);
        this.canvas.attachEvent("onmouseup",mouseUp);
        this.canvas.attachEvent("onclick",mouseClick);
        this.canvas.attachEvent("ondblclick",mouseDblclick);
        this.canvas.attachEvent("onmousewheel",mouseWheel);
        this.canvas.attachEvent("onmousemove",mouseMove);
        this.canvas.attachEvent("onmouseout",mouseOut);
        this.canvas.attachEvent("onmouseover",mouseOver);
        this.canvas.attachEvent("oncontextmenu",contextMenu);
    }*/

    /**
     * 触摸事件状态-移动平台专用-浏览器支持差
     * 不建议使用
     * 注意：由于this关键字局限性，鼠标相关的状态注册在canvas对象内部
     */
    this.canvas.touchStates = {

    };
    /**
     * 触摸监听回调函数
     * 根据浏览器情况判断
     */
    /**
     而每个触摸事件都包括了三个触摸列表，每个列表里包含了对应的一系列触摸点（用来实现多点触控）：
     touches：当前位于屏幕上的所有手指的列表。
     targetTouches：位于当前DOM元素上手指的列表。
     changedTouches：涉及当前事件手指的列表。
     每个触摸点由包含了如下触摸信息（常用）：
     identifier：一个数值，唯一标识触摸会话（touch session）中的当前手指。一般为从0开始的流水号（android4.1，uc）
     target：DOM元素，是动作所针对的目标。
     pageX/pageX/clientX/clientY/screenX/screenY：一个数值，动作在屏幕上发生的位置（page包含滚动距离,client不包含滚动距离，screen则以屏幕为基准）
     */
    //·触摸开始·
    //触摸开始的时候触发
    function touchstart(event) {
        //兼容IE
        event = event || window.event;


        //取消默认事件
        event.preventDefault();
    }
    //·触摸移动·
    //手指在屏幕上滑动的时候触发
    function touchmove(event) {
        //兼容IE
        event = event || window.event;


        //取消默认事件
        event.preventDefault();
    }
    //·触摸停止·
    //触摸结束的时候触发
    function touchend(event) {
        //兼容IE
        event = event || window.event;


        //取消默认事件
        event.preventDefault();
    }
    /**
     * 触摸事件注册
     */
    //1.W3C标准
    //支持：android原生、Chrome、Opera Mobile、UC
    this.canvas.addEventListener("touchstart",touchstart,false);
    this.canvas.addEventListener("touchmove",touchmove,false);
    this.canvas.addEventListener("touchend",touchend,false);
    //2.反模式注册
    //支持：android原生、Chrome、Opera Mobile、UC
    /*
    this.canvas.ontouchstart = touchstart;
    this.canvas.ontouchmove = touchmove;
    this.canvas.ontouchend = touchend;
    */

}

/**
 * 获取渲染上下文
 */
D2D_Engine.prototype.getContext = function() {
    return this.contextBuffer2D;//返回缓冲区上下文
};

/**
 * 获取Canvas
 */
D2D_Engine.prototype.getCanvas = function() {
    return this.canvas;
};

/**
 * 绘制开始
 */
D2D_Engine.prototype.beginDraw = function() {
    //清除画布-?是否需要
    //this.context2D.clearRect(0,0,this.canvas.width,this.canvas.height);
};

/**
 * 绘制结束
 */
D2D_Engine.prototype.endDraw = function() {
    //在canvas中绘制缓冲区内容
    this.context2D.drawImage(this.canvasBuffer,0,0);
};

/**
 * 颜色清屏
 */
D2D_Engine.prototype.clear = function(color) {
    if(color == undefined || color == null) {
        //清除所有
        this.contextBuffer2D.clearRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);
    } else {
    //清除缓冲区颜色
        this.contextBuffer2D.fillStyle = color;
        this.contextBuffer2D.fillRect(0,0,this.canvasBuffer.width,this.canvasBuffer.height);
    }
};

/**
 * 取设定帧率
 */
D2D_Engine.prototype.getFps = function() {
    return this.fps;
};

/**
 * 置设定帧率
 */
D2D_Engine.prototype.setFps = function(fps) {
    this.fps = fps;
};

/**
 * 取当前帧率-每秒刷新一次
 */
D2D_Engine.prototype.getCurrentFps = function() {
    return this.currentFps;
};

/**
 * 取宽度
 */
D2D_Engine.prototype.getWidth = function() {
    return this.canvas.width;
};

/**
 * 取画布宽度
 * 函数别名
 */
D2D_Engine.prototype.getCanvasWidth = D2D_Engine.prototype.getWidth;

/**
 * 取高度
 */
D2D_Engine.prototype.getHeight = function() {
    return this.canvas.height;
};

/**
 * 取画布高度
 * 函数别名
 */
D2D_Engine.prototype.getCanvasHeight = D2D_Engine.prototype.getHeight;

/**
 * 置宽度
 */
D2D_Engine.prototype.setWidth = function(width) {
    this.canvas.width = width;
    this.canvasBuffer.width = width;//缓冲区-大小相同
};

/**
 * 置画布宽度
 * 函数别名
 */
D2D_Engine.prototype.setCanvasWidth = D2D_Engine.prototype.setWidth;

/**
 * 置高度
 */
D2D_Engine.prototype.setHeight = function(height) {
    this.canvas.height = height;
    this.canvasBuffer.height = height;//缓冲区-大小相同
};

/**
 * 置画布高度
 * 函数别名
 */
D2D_Engine.prototype.setCanvasHeight = D2D_Engine.prototype.setHeight;

//=======================================================
// 鼠标事件
//=======================================================
/**
 * 取鼠标坐标x
 */
D2D_Engine.prototype.getMousePosX = function() {
    return this.canvas.mouseStates.pos.x;
};

/**
 * 取鼠标坐标y
 */
D2D_Engine.prototype.getMousePosY = function() {
    return this.canvas.mouseStates.pos.y;
};

/**
 * 取鼠标坐标
 */
D2D_Engine.prototype.getMousePos = function() {
    return this.canvas.mouseStates.pos;
};

/**
 * 鼠标是否按下
 * 默认参数为左键
 * 可传参数为：
 * "left","right","middle"
 */
D2D_Engine.prototype.isMouseDown = function(which) {
    //左键
    if(which == undefined || which == "left") {
        return this.canvas.mouseStates.leftButton.down;
    }
    //右键
    else if(which == "right" ) {
        return this.canvas.mouseStates.rightButton.down;
    }
    //中键
    else if(which == "middle") {
        return this.canvas.mouseStates.middleButton.down;
    }
    //其他未知
    else {
        return undefined;
    }
};

/**
 * 鼠标是否弹起
 * 默认参数为左键
 * 可传参数为：
 * "left","right","middle"
 */
D2D_Engine.prototype.isMouseUp = function(which) {
    //左键
    if(which == undefined || which == "left") {
        return this.canvas.mouseStates.leftButton.up;
    }
    //右键
    else if(which == "right" ) {
        return this.canvas.mouseStates.rightButton.up;
    }
    //中键
    else if(which == "middle") {
        return this.canvas.mouseStates.middleButton.up;
    }
    //其他未知
    else {
        return undefined;
    }
};

/**
 * 鼠标是否单击
 * 默认参数为左键
 * 可传参数为：
 * "left","right","middle"
 */
D2D_Engine.prototype.isMouseClick = function(which) {
    //左键
    if(which == undefined || which == "left") {
        return this.canvas.mouseStates.leftButton.click;
    }
    //右键
    else if(which == "right" ) {
        return this.canvas.mouseStates.rightButton.click;
    }
    //中键
    else if(which == "middle") {
        return this.canvas.mouseStates.middleButton.click;
    }
    //其他未知
    else {
        return undefined;
    }
};

/**
 * 鼠标是否双击
 * 默认参数为左键
 * 可传参数为：
 * "left","right","middle"
 */
D2D_Engine.prototype.isMouseDblclick = function(which) {
    //左键
    if(which == undefined || which == "left") {
        return this.canvas.mouseStates.leftButton.dblclick;
    }
    //右键
    else if(which == "right" ) {
        return this.canvas.mouseStates.rightButton.dblclick;
    }
    //中键
    else if(which == "middle") {
        return this.canvas.mouseStates.middleButton.dblclick;
    }
    //其他未知
    else {
        return undefined;
    }
};

/**
 * 鼠标是否移动
 */
D2D_Engine.prototype.isMouseMove = function() {
    return this.canvas.mouseStates.move;
};

/**
 * 鼠标是否滚动
 */
D2D_Engine.prototype.isMouseWheel = function() {
    return this.canvas.mouseStates.wheel;
};

/**
 * 鼠标是否离开画布
 */
D2D_Engine.prototype.isMouseOut = function() {
    return this.canvas.mouseStates.out;
};

/**
 * 鼠标是否进入画布
 */
D2D_Engine.prototype.isMouseOver = function() {
    return this.canvas.mouseStates.over;
};

/**
 * 获取鼠标滚动方向
 * 1为向上
 * -1为向下
 * 0为不动
 */
D2D_Engine.prototype.getMouseWheelDelta = function() {
    return this.canvas.mouseStates.wheelDelta;
};

/**
 * 获取鼠标滚动方向
 * 和上一个函数同样功能
 */
D2D_Engine.prototype.getMouseWheel = D2D_Engine.prototype.getMouseWheelDelta;

//=======================================================
// 鼠标样式
//=======================================================
/**
 * 设置鼠标样式
 * 参数：
 * url  --  需被使用的自定义光标的URL-注释：请在此列表的末端始终定义一种普通的光标，以防没有由 URL 定义的可用光标。
 * (除IE外不可用)
 * default --  默认光标（通常是一个箭头）
 * auto	--  默认。浏览器设置的光标。
 * crosshair -- 光标呈现为十字线。
 * pointer -- 光标呈现为指示链接的指针（一只手）
 * move -- 此光标指示某对象可被移动。
 * e-resize -- 此光标指示矩形框的边缘可被向右（东）移动。
 * ne-resize -- 此光标指示矩形框的边缘可被向上及向右移动（北/东）。
 * nw-resize -- 此光标指示矩形框的边缘可被向上及向左移动（北/西）。
 * n-resize -- 此光标指示矩形框的边缘可被向上（北）移动。
 * se-resize -- 此光标指示矩形框的边缘可被向下及向右移动（南/东）。
 * sw-resize -- 此光标指示矩形框的边缘可被向下及向左移动（南/西）。
 * s-resize	-- 此光标指示矩形框的边缘可被向下移动（北/西）。
 * w-resize	-- 此光标指示矩形框的边缘可被向左移动（西）。
 * text	-- 此光标指示文本。
 * wait	-- 此光标指示程序正忙（通常是一只表或沙漏）。
 * help	-- 此光标指示可用的帮助（通常是一个问号或一个气球）。
 */
D2D_Engine.prototype.setCursorStyle = function(style) {
    if(style == undefined){
        this.canvas.style.cursor = "default";
    } else {
        this.canvas.style.cursor = style;
    }
};

/**
 * 设置鼠标样式
 * 同上部函数功能相同
 */
D2D_Engine.prototype.setMouseStyle = D2D_Engine.prototype.setCursorStyle;

/**
 * 获取鼠标样式
 */
D2D_Engine.prototype.getCursorStyle = function() {
    return this.canvas.style.cursor;
};

/**
 * 获取鼠标样式
 * 同上部函数功能相同
 */
D2D_Engine.prototype.getMouseStyle = D2D_Engine.prototype.getCursorStyle;

//=======================================================
// 触摸事件
//=======================================================




























//=======================================================
// 基本绘图
//=======================================================
/**
 * 画线
 * @param x0 起点
 * @param y0 
 * @param x1 终点
 * @param y1
 * @param color 颜色
 * @param lineWidth 线宽度
 */
D2D_Engine.prototype.drawLine = function(x0,y0,x1,y1,color,lineWidth) {
    //保存状态
    this.contextBuffer2D.save();

    //开始路径
    this.contextBuffer2D.beginPath();
    //画线
    this.contextBuffer2D.moveTo(x0,y0);
    this.contextBuffer2D.lineTo(x1,y1);
    //如果有边线宽度选项
    if (lineWidth != undefined) {
        this.contextBuffer2D.lineWidth = lineWidth;
    } else {
        this.contextBuffer2D.lineWidth = 1;
    }
    this.contextBuffer2D.strokeStyle = color; 
    this.contextBuffer2D.stroke();

    //恢复状态
    this.contextBuffer2D.restore();
};

/**
 * 画填充矩形
 * @param x 坐标X
 * @param y 坐标Y
 * @param width 宽度
 * @param height 高度
 * @param color 颜色
 */
D2D_Engine.prototype.drawFillRect = function(x,y,width,height,color) {
    //保存状态
    this.contextBuffer2D.save();
	
    this.contextBuffer2D.fillStyle = color;
    this.contextBuffer2D.fillRect(x,y,width,height);
	
    //恢复状态
    this.contextBuffer2D.restore();
};

/**
 * 画线框矩形
 * @param x 坐标X
 * @param y 坐标Y
 * @param width 宽度
 * @param height 高度
 * @param color 线框颜色
 * @param lineWidth 线框宽度
 */
D2D_Engine.prototype.drawStrokeRect = function(x,y,width,height,color,lineWidth) {
    //保存状态
    this.contextBuffer2D.save();

    //如果有边线宽度选项
    if (lineWidth != undefined) {
        this.contextBuffer2D.lineWidth = lineWidth;
    } else {
        this.contextBuffer2D.lineWidth = 1;
    }
    this.contextBuffer2D.strokeStyle = color; 
    this.contextBuffer2D.strokeRect(x,y,width,height);

    //恢复状态
    this.contextBuffer2D.restore();
};

//=======================================================
// D2D_引擎启动
//=======================================================
/**
 * 启动一个D2D_引擎
 * @param engine D2D_引擎实例
 */
function startEngine(engine) {
    //初始化时间框架
    engine.lastTime = new Date().getTime();
    //执行函数
    var run = function() {
        //时间框架
        var nowTime = new Date().getTime();
        var deltaTime = nowTime - engine.lastTime;
        if(deltaTime - 1000/engine.fps >= 0) {
            engine.lastTime = nowTime;
            //计算实时帧率
            engine.frameCounter ++;
            engine.timeCounter += deltaTime;
            if(engine.timeCounter >= 1000) {
                engine.timeCounter -= 1000;
                engine.currentFps = engine.frameCounter;
                engine.frameCounter = 0;
            }
            //绘制管线
            if(engine.update != undefined) {
                engine.update(deltaTime/1000);
            }
            if(engine.draw != undefined) {
                engine.draw(deltaTime/1000);
            }
            /**
              * 清除鼠标状态
              * 不清除down事件
              */
            //左键
            engine.canvas.mouseStates.leftButton.up = false;
            engine.canvas.mouseStates.leftButton.click = false;
            engine.canvas.mouseStates.leftButton.dblclick = false;
            //右键
            engine.canvas.mouseStates.rightButton.up = false;
            engine.canvas.mouseStates.rightButton.click = false;
            engine.canvas.mouseStates.rightButton.dblclick = false;
            //中键
            engine.canvas.mouseStates.middleButton.up = false;
            engine.canvas.mouseStates.middleButton.click = false;
            engine.canvas.mouseStates.middleButton.dblclick = false;
            //其他状态
            engine.canvas.mouseStates.wheel = false;
            engine.canvas.mouseStates.move = false;
            engine.canvas.mouseStates.out = false;
            engine.canvas.mouseStates.over = false;
            //滚动方向
            engine.canvas.mouseStates.wheelDelta = 0;
            /**
             * 清除触摸事件
             */
            //暂未实现




        }
    };
    //定制计时器，开始循环
    window.setInterval(run,1);
}
