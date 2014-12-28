//按键检测的一个思路
input = {
    KEY_UP:false,
    KEY_DOWN:false,
    KEY_LEFT:false,
    KEY_RIGHT:false
    }
	
window.onkeydown = function(e) {
    var keyID = e.keyCode ? e.keyCode :e.which;  
    if(keyID === 38 || keyID === 87)  { // up arrow and W  
        input.KEY_UP = true;
        e.preventDefault(); 
    }
	if(keyID === 40 || keyID === 83)  { // down arrow and S  
        input.KEY_DOWN = true;
        e.preventDefault();
    } 
    if(keyID === 37 || keyID === 65)  { // left arrow and A  
        input.KEY_LEFT = true;
        e.preventDefault();
    }
    if(keyID === 39 || keyID === 68)  { // right arrow and D  
        input.KEY_RIGHT = true;
        e.preventDefault(); 
    } 
}

window.onkeyup = function(e) {
    var keyID = e.keyCode ? e.keyCode :e.which;  
    if(keyID === 38 || keyID === 87)  { // up arrow and W  
        input.KEY_UP = false;
        e.preventDefault(); 
    }
	if(keyID === 40 || keyID === 83)  { // down arrow and S  
        input.KEY_DOWN = false;
        e.preventDefault();
    } 
    if(keyID === 37 || keyID === 65)  { // left arrow and A  
        input.KEY_LEFT = false;
        e.preventDefault();
    }
    if(keyID === 39 || keyID === 68)  { // right arrow and D  
        input.KEY_RIGHT = false;
        e.preventDefault(); 
    } 
}
