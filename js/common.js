var iG = {};
iG.versionNo = '202017';
iG.debug = true;
/* 操作数据
---------------------------------------------------------------------------------------*/
//AJAX请求
iG.ajax = function(settings){
    //var base64Encode = new Base64();
    var url = "http://192.168.2.12:3201/appoffice/api.do";
    var encodeKey = localStorage.getItem("encodeKey") || "000";
    var decodeKey = localStorage.getItem("decodeKey") || "111";
    var data = settings.data;
    var bizdata = {
        api_name : data.api_name,//请求名
        app_id : "aemoney",
        api_key : "aemoney-001",
        device_token : localStorage.getItem("device_token"),
        customer_no : localStorage.getItem("customer_no"),
        order_no : data.order_no,//系统订单号(理财订单)
        start_time : data.start_time,//理财开始时间
        end_time : data.end_time,//理财结束时间
        product_no :data.product_no,//产品号(产品详情)
        product_state : data.product_state,//产品状态(产品详情)
        card_id : data.card_id,
        card_no : data.card_no,
        amount : data.amount,//金额，保留两位小数，单位元
        sms_validation_code : data.sms_validation_code,//短信验证码
        name : data.name,
        id_number : data.id_number,//身份证
        mobile : data.mobile,
        check_mobile : data.check_mobile,//需要验证绑定手机才发短信时为true
        biz_scenario : data.biz_scenario,//业务场景，LOGIN，BUY_PRODUCT，WITHDRAW
        message_id : data.message_id,
        card_prefix : data.card_prefix,//银行卡前六位
        trade_password : data.trade_password,//交易密码
        system_version : data.system_version,//以下信息为注册新设备时所有，只在每次打应用时注册
        manufacturer : data.manufacturer,
        hardware_version : data.hardware_version,
        cpu : data.cpu,
        imei : data.imei,
        operator : data.operator,
        mac_address : data.mac_address,
        soft_token : data.soft_token,
        resolution : data.resolution
    };
    for(var key in bizdata){//清除无效数据
        if(!bizdata[key])
            delete bizdata[key];
    }
    var dataJson = {
        version:"1.0",
        bizdata:bizdata//这个需要两次加密
    };
    $.ajax({
        type : "post",
        contentType: 'application/json',
        dataType:"json",
        url : url,
        data: JSON.stringify(dataJson),  
        success : function(data){//data需要解密
            var bizdata = JSON.parse(decodeURIComponent(data.bizdata));
            settings.success(bizdata);
        },
        error : function(data){
            settings.error(data);
        }
    });
};
//自动装载数据
iG.autoData = function(obj,wrapElem){
    if(wrapElem == undefined) wrapElem = $("body");
    wrapElem.find("[auto]").each(function(){
        var key = $(this).attr("auto");
        var objCopy = obj;
        while (key.indexOf("_") != "-1") {
            var sep = key.indexOf("_");
            objCopy = objCopy[key.substring(0, sep)];
            key = key.substring(key.indexOf("_") + 1);
        };
        if (objCopy != null) {
            $(this).text(objCopy[key]);
        }else{
            $(this).text('');
        }
    });
};
/* 操作本地存储
---------------------------------------------------------------------------------------*/
//获取本地存储obj值
//获取本地存储obj值
iG.getObjItem = function(obj,key){
    var json = localStorage.getItem(obj);
    if(json == null || json == undefined || json == "undefined" || json == ""){
		return undefined;
	}else{
		json=JSON.parse(json);
	}
    return json[key];
};
//设置本地存储obj值
iG.setObjItem = function(obj,key,value){
    var json = localStorage.getItem(obj);
    if(json == null || json == undefined || json == "undefined" || json == ""){
		json = {};
	}else{
		json=JSON.parse(json);
	}
    json[key] = value;
    localStorage.setItem(obj,JSON.stringify(json));
};
//删除本地存储obj值
iG.removeObjItem = function(obj,key){
    var json = localStorage.getItem(obj);
    if(json == null || json == undefined || json == "undefined" || json == ""){
		return;
	}else{
		json=JSON.parse(json); 
	}
    delete json[key];
    localStorage.setItem(obj,JSON.stringify(json));
};

/* 操作日期
---------------------------------------------------------------------------------------*/
//获取年
iG.getYear = function(date){
    if(date == undefined) date = new Date;
    //var timeZone = parseInt(JSON.parse(localStorage.getItem("timeZone")).timeZone);
    //date.setHours(date.getHours() - 8 + timeZone);
    return date.getFullYear();
};
//获取月
iG.getMonth = function(date){
    if(date == undefined) date = new Date;
    //var timeZone = parseInt(JSON.parse(localStorage.getItem("timeZone")).timeZone);
    //date.setHours(date.getHours() - 8 + timeZone);
    var month = date.getMonth() + 1;
    if(month < 10) month = "0" + month;
    return month;
};
//获取日
iG.getDay = function(date){
    if(date == undefined) date = new Date;
    //var timeZone = parseInt(JSON.parse(localStorage.getItem("timeZone")).timeZone);
    //date.setHours(date.getHours() - 8 + timeZone);
    var day = date.getDate();
    if(day < 10) day = "0" + day;
    return day;
};
//获取当前日期
iG.getDateToday = function(date){
    return iG.getYear() + "-" + iG.getMonth() + "-" + iG.getDay();
};
//获取星期
iG.getWeek = function(date){
    if(date == undefined) date = new Date;
    //var timeZone = parseInt(JSON.parse(localStorage.getItem("timeZone")).timeZone);
    //date.setHours(date.getHours() - 8 + timeZone);
    var week = date.getDay();
    var weekArr = ["日","一","二","三","四","五","六"];
    return weekArr[week];
};
//获取小时
iG.getHours = function(date){
    if(date == undefined) date = new Date;
    //var timeZone = parseInt(JSON.parse(localStorage.getItem("timeZone")).timeZone);
    //date.setHours(date.getHours() - 8 + timeZone);
    return date.getHours();
},
//获取分钟
iG.getMinutes = function(date){
    if(date == undefined) date = new Date;
    //var timeZone = parseInt(JSON.parse(localStorage.getItem("timeZone")).timeZone);
    //date.setHours(date.getHours() - 8 +timeZone);
    return date.getMinutes();
};
//打开日期控件
iG.openDate = function(year,month,day,callback){
    uexControl.openDatePicker(year,month,day);
    uexControl.cbOpenDatePicker=function(opCode,dataType,data){
        if(dataType==1){
            data = JSON.parse(data);
            if(data.month<10) data.month = "0" + data.month;
            if(data.day<10) data.day = "0" + data.day;
            var json = {
                year : data.year,
                month : data.month,
                day : data.day,
            };
            callback(json);
        }
    }   
};
//打开时间控件
iG.openTime = function(hours,minutes,callback){
    uexControl.openTimePicker(hours,minutes);
    uexControl.cbOpenTimePicker = function(opCode,dataType,data){  
        data = JSON.parse(data);
        if(data.hour < 10) data.hour = "0" + data.hour;
        if(data.minute < 10) data.minute = "0" + data.minute;
        var json = {
            hour : data.hour,
            minute : data.minute
        };
        callback(json);
    }   
};
/* 设置页面回弹
---------------------------------------------------------------------------------------*/
//默认状态
iG.setBounce = function(){
    uexWindow.setBounce("1");
    uexWindow.showBounceView("0","#f4f4f4","0");
    uexWindow.showBounceView("1","#f4f4f4","0");
    uexWindow.notifyBounceEvent("0","0");
};
//下拉刷新
iG.pullDown = function(callback){
    var j = {
        "pullToReloadText":"下拉刷新",
        "releaseToReloadText":"释放立即刷新",
        "loadingText":"正在刷新...",
        "loadingImagePath":"res://shuaxin.png"
    };
    if(!uexWindow.setBounce)
        return;
    uexWindow.setBounce("1");
    uexWindow.setBounceParams('0',JSON.stringify(j));
    uexWindow.showBounceView("0","#f4f4f4",1);
    uexWindow.showBounceView("1","#f4f4f4",0);
    uexWindow.notifyBounceEvent("0","1");
    uexWindow.onBounceStateChange = function(type,status){
        if(type==0 && status==2) {
            callback();
        }
    }
};
/* 其他
---------------------------------------------------------------------------------------*/
//记录打开窗口
iG.saveOpenWin = function(winName){
    var array = iG.getObjItem("openWin","array");
    if(!array)
        array = [];
    if(array.indexOf(winName) == -1){
        array.push(winName);
    }
    iG.setObjItem("openWin","array",array);
};
//打开新窗口
iG.openWin = function(name,data){
    if(data){
        localStorage.setItem(name,JSON.stringify(data));
    }
    var url = name + ".html";
    iG.saveOpenWin(name);
    uexWindow.open(name,0,url,2,"","","4",280);
};
//获取用户账户
iG.getUserInfo = function(){
    var base64Encode = new Base64();
    var timeZone = localStorage.getItem("timeZone");
    if(timeZone)
        timeZone = JSON.parse(timeZone).timeZone;
    var user = {
//        "u": base64Encode.decode(localStorage.getItem("userName")),
//        "p": base64Encode.decode(localStorage.getItem("password")),
//        "m": localStorage.getItem("mobile"),
        "s": localStorage.getItem("sessionId"),
        "t": timeZone
        //"a": "MOP"
    };
    var userStr = JSON.stringify(user)
    return base64Encode.encode(userStr);
};
//页面提示
iG.tip = function(msg, tipId){
    var html = '<div class="uba p10 uc-a5 c17 tx-c">'+ msg +'</div>';
    if (tipId) {
        $("#" + tipId).empty().addClass("p8").append(html);
    }
    else {
        $("body").empty().addClass("p8").append(html);
    }
};
//数据是否合法
iG.isGood = function(data,tipOpen){
    var is_success = data.is_success;//请求状态返回码,10000是正确返回
    var dq_code = data.dq_code;
//    if(dq_code != "10000"){//没有正确请求到数据
//        tipOpen && iG.tip(data.show_msg);//打印错误信息
//        return false;
//    }
    if(!is_success){//返回失败信息
        iG.alert(data.show_msg);
        return false;
    }
    return true;
};
//选择机场
iG.airportOption = function(winName,fnName,elemId){
    var data = {
        winName : winName,
        fnName : fnName,
        elemId : elemId
    };
    iG.openWin("terminalSelect_win",data);
}; 
//请求回调
iG.ajaxCallback = function(isRefresh){
    if(isRefresh){
        uexWindow.resetBounceView('0');
    }else{
        $.iBoxHide();
    }
};
//状态颜色
iG.statusColor = {
    "返航" : "c10",//绿色
    "备降" : "c10",//绿色
    "取消" : "c4",//灰色
    "到达" : "c2",//黑色
    "未起飞" : "c18",//蓝色
    "延误" : "c16",//红色
    "起飞" : "c22"//蓝色
};
//是否显示
iG.isShow = function(type){
    $("[showAt]").each(function(){
        var array = $(this).attr("showAt").split(",");
        for(var i in array){
            if(type == array[i]){
                $(this).removeClass("uhide");
                return;
            }
        }
        $(this).addClass("uhide");
    })
    $("[hideAt]").each(function(){
        var array = $(this).attr("hideAt").split(",");
        for(var i in array){
            if(type == array[i]){
                $(this).addClass("uhide");
                return;
            }
        }
        $(this).removeClass("uhide")
    })
};
//固定字符串
iG.fixed = function(){
    $("[fixed]").each(function(){
        var txt = $(this).text();
        $(this).text(txt.substring(0,2))
    })
};
//滚动
iG.scroll = function(wrap,speedVal){
    var speed = speedVal || 50;
    var that = arguments.callee;
    var width = wrap.width();
    var child = wrap.children();
    var childWidth = child.width();
    var time = parseInt(width + childWidth) * 1000 / speed;
    if(childWidth<= width)return;
    wrap.css("box-pack","start");
    child.css("left",width).animate({"left":-childWidth},time,"linear",function(){
        that(wrap,speed);
    })
};
iG.alert = function(content,callback){//调用的页面必须连接进dialog的css和js
    var setting = {
        title:"提示",
        content:content,
        buttons:{
            "ok":"确定"
        },
        yes:function(){
            if(callback)
                callback.call();
        }
    };
    initDialog(setting);
};
//debug
if(window.navigator.platform=="Win32" && iG.debug){
    document.write('<script src="../js/debug.js"></script>')
};