function showCover(){
    var width = window.screen.width;
    var height = window.screen.height;
    var div = "<div class='coverBg'></div>"
    $("body").append(div);
    var coverBg = $(".coverBg");
    coverBg.css({
        "width":width+"px",
        "height":height+"px"
    });
    coverBg.addClass("ub ub-ac ub-pc");
}
function removeCover(){
    $(".coverBg").fadeOut(200,function(){
        $(".coverBg").remove();
    });
}
function initDialog(settings){
    showCover();
    var dialogDiv = "<div class='bc1 mydialog uc-a6'>";
    dialogDiv+="<div class='dialogTitle c1 pt9 pb9 bc69 uc-t'><div class='fs12 tx-c'>"+settings.title+"</div></div>";
    dialogDiv+="<div class='dialogBody c14'>";
    dialogDiv+="<div class='dialogContent pt10 pb10 pl5 pr5 fs10 tx-c c14'>";
    if(settings.content)
        dialogDiv+=settings.content+"</div>";
    else if(settings.htmlContent)
        dialogDiv+=settings.htmlContent+"</div>";
    dialogDiv+="<div class='dialogIcons ub c84 ubt'>";
    if(settings.buttons["ok"])
        dialogDiv+="<div class='fs11 yesIcon ub-f1 w0 ub ub-ac ub-pc ubr'><div class='c17'>"+settings.buttons["ok"]+"</div></div>";
    if(settings.buttons["cancel"])
        dialogDiv+="<div class='fs11 noIcon ub-f1 w0 ub ub-ac ub-pc'><div class='c17'>"+settings.buttons["cancel"]+"</div></div>";
    dialogDiv+="</div></div>";
    $(".coverBg").append(dialogDiv);
    if(settings.titleBc)
        $(".mydialog").find(".dialogTitle").removeClass("bc69").addClass(settings.titleBc);
    $(".noIcon").on("click",function(){
        removeCover();
        if(settings.no)
            settings.no();
    });
    $(".yesIcon").on("click",function(){
        removeCover();
        if(settings.yes)
            settings.yes();
    });
}