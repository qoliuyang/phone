uexWindow = {};
uexDevice = {};
uexWidgetOne = {};
uexWindow.evaluateScript = function(){};
uexDevice.getInfo = function(){};
uexWidgetOne.getPlatform = function(){};
uexWindow.close = function(){};
uexWindow.openPopover = function(){};
zy_resize = function(){};
iG.openWin = function(name,data){
    if(data){
        localStorage.setItem(name,JSON.stringify(data));
    }
    iG.saveOpenWin(name);
    var url = name + ".html";
    location.href = url;
};
$(function(){
    if(window.uexOnload)
        window.uexOnload();
});