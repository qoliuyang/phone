Canvas = {};
Canvas.line = function(canvasId,obj){
    var canvas = $$(canvasId);
    var ctx = canvas.getContext("2d");
    var fontSize = parseInt($("body").css("font-size"));
    var width = $("#" + canvasId).width();
    var height = $("#" + canvasId).height();
    canvas.width = width;
    canvas.height = height;
    ctx.lineWidth = 0.18 * fontSize;
    var drawLine = function(obj){
        var array = obj.array;
        ctx.beginPath();
        var oneWidth = width / (array.length - 1);
        ctx.strokeStyle = obj.color;
        for(var i in array){
            ctx.lineTo(oneWidth * i, canvas.height - array[i] * canvas.height);
        }
        ctx.fillStyle = obj.background;
        ctx.stroke();
        ctx.lineTo(width,height);
        ctx.lineTo(0,height);
        ctx.closePath();
        ctx.globalCompositeOperation="destination-over";
        ctx.fill();
    }
    for(var i in obj){
        drawLine(obj[i]);
    }
};
//饼图
Canvas.pie = function(canvasId,array,start){
    var canvas = $$(canvasId);
    var ctx = canvas.getContext("2d");
    var sideLen = $("#" + canvasId).width();
    var fontSize = parseInt($("#" + canvasId).css("font-size"));
    canvas.width = sideLen;
    canvas.height = sideLen;
    var r = sideLen / 2;
    if(!start)
        var start = 0.4;
    var end = start;   
    for(var i in array){
        end = start + array[i][0] * 2;
        ctx.moveTo(r,r);
        ctx.fillStyle = array[i][1];
        ctx.lineWidth = 0.05 * fontSize;
//        ctx.strokeStyle = "#fff";
        ctx.beginPath(); 
        ctx.arc(r,r,r-0.05*fontSize,start * Math.PI,end * Math.PI);
        ctx.lineTo(r,r);
        ctx.closePath();
        ctx.fill();
//        ctx.stroke();
        start = end;
    }
};
//饼图
Canvas.pie2 = function(canvasId,array){
    var canvas = $$(canvasId);
    var ctx = canvas.getContext("2d");
    var sideLen = $("#" + canvasId).width();
    var fontSize = parseInt($("#" + canvasId).css("font-size"));
    canvas.width = sideLen;
    canvas.height = sideLen / 2;
    var r = sideLen / 2;
    ctx.strokeStyle = "red";
    var start = 1;
    var end = start;   
    for(var i in array){
        end = start + array[i][0] * 2;
        ctx.moveTo(r,r);
        ctx.fillStyle = array[i][1];
        ctx.beginPath(); 
        ctx.lineWidth = 1;
        ctx.arc(r,r,r,start * Math.PI,end * Math.PI);
        ctx.strokeStyle = "#fff";
        ctx.lineTo(r,r);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        start = end;
    }
};
//圆弧
Canvas.arc = function(canvasId,percent,color,lineWidth){
    if(isNaN(percent)) percent = 1;
    var canvas = $$(canvasId);
    var ctx = canvas.getContext("2d");
    var sideLen = $("#" + canvasId).width();
    lineWidth = lineWidth * parseInt($("#" + canvasId).css("font-size"));
    canvas.width = sideLen;
    canvas.height = sideLen;
    ctx.strokeStyle = color;
    ctx.beginPath(); 
    ctx.lineWidth = lineWidth;
    var x = sideLen / 2;
    var y = sideLen / 2;
    var r = sideLen / 2 - ctx.lineWidth/2;
    var sAngle = Math.PI/2;
    var eAngle = 2*Math.PI*percent +Math.PI/2
    if(percent == 1)
        ctx.arc(x,y,r,0,Math.PI*2,true);
    else
        ctx.arc(x,y,r,sAngle,eAngle);
    ctx.stroke();
};
//半圆
Canvas.semicircle = function(canvasId,percent,color,lineWidth){
    var canvas = $$(canvasId);
    var ctx = canvas.getContext("2d");
    var sideLen = $("#" + canvasId).width();
    lineWidth = lineWidth * parseInt($("#" + canvasId).css("font-size"));
    canvas.width = sideLen;
    canvas.height = sideLen /2;
    
    ctx.strokeStyle = color;
    ctx.beginPath(); 
    ctx.lineWidth = lineWidth;
    var x = sideLen / 2;
    var y = sideLen / 2;
    var r = sideLen / 2 - ctx.lineWidth/2;
    var sAngle = Math.PI;
    var eAngle = Math.PI*percent +Math.PI
    ctx.arc(x,y,r,sAngle,eAngle);
    ctx.stroke();
};
//水波荡漾
Canvas.water = function(id,percent){
    var canvas = document.getElementById(id);
    var radius = $(canvas).width() / 2;
    canvas.width = $(canvas).width();
    canvas.height = $(canvas).height();
    var width = radius / 0.57;
    var height = radius / 26;
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0,0,canvas.width,canvas.height);
    var drawCircle = function(){
        ctx.globalCompositeOperation="source-over";
        ctx.beginPath();
        ctx.fillStyle="#fff"
        ctx.arc(radius,radius,radius,0,2*Math.PI,false)
        ctx.closePath();
        ctx.fill();
    };
    var drawWater = function(num,color,top){
        var diameter = 2 * radius;
        ctx.globalCompositeOperation="source-atop";
        ctx.beginPath();
        var j = 1;
        for(var i=0; i<diameter+1;i++){
            ctx.lineTo(i,Math.sin((num+i)/width * 2 * Math.PI) * height + top)
        }
        ctx.lineTo(diameter,top + diameter);
        ctx.lineTo(0,top + diameter);
        ctx.closePath();
        ctx.fillStyle = color;
        ctx.fill(); 
    }
    var num = 1;
    var num2 = radius / 10;
    var top2 = 2 * radius;
    var goUp = function(){
        var that = arguments.callee;
        top2 = top2 - 1;
        setTimeout(function(){
            if(top2>(2 * radius * (1 - percent))){
                that()
            }
        },10)
    }
    goUp();
    clearInterval(this.time);
    this.time = setInterval(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        num = num + radius / 10;
        num2 = num2 + radius / 10;
        drawCircle();
        drawWater(num2,"#6ca0f6",top2);
        drawWater(num,"#367aec",top2 + radius / 20);
    },100)
}