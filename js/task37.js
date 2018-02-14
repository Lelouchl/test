function $(e) {
    return document.querySelector(e);
}
function $$(e) {
    return document.querySelectorAll(e);
}
//兼容事件绑定
function addEvent(e,event,fn) {
    if (e.addEventListener) {
        e.addEventListener(event,fn,false);
    }else if (e.attachEvent) {
        e.attachEvent('on'+event,fn);
    }else {
        e['on'+event]=fn;
    }
}
function removeEvent(e, event, fn) {
    if (e.removeEventListener) {
        e.removeEventListener(event, fn, false);
    } else if (e.detachEvent) {
        e.detachEvent('on'+event,fn);
    } else {
        e['on'+event]=null;
    }
}
//居中
function autoCenter(e) {
    var eW=e.offsetWidth;
    var eH=e.offsetHeight;
    e.style.left=(document.documentElement.clientWidth-eW)/2 + 'px';
    e.style.top=(document.documentElement.clientHeight-eH)/2 + 'px';
}
//显示
function show(ele,box) {
    ele.style.display='block';
    autoCenter(box);
    drag($('#loginBoxHead'),$('#loginBox'));
}
//隐藏
function hide(ele) {
    ele.style.display='none';
}
addEvent($('#loginA'),'click',function () {
    show($('#mask'),$('#loginBox'));
});
addEvent($('#closeBtn'),'click',function () {
    hide($('#mask'));
});
addEvent($('#mask'),'click',function () {
    hide($('#mask'));
});
addEvent($('#loginBox'),'click',function (e) {
    var e=e||event;
    e.stopPropagation();
});
//拖拽
function drag(ele,box) {
    addEvent(ele,'mousedown',function (e) {
        var e=e||event,
            disX=e.clientX-box.offsetLeft,
            disY=e.clientY-box.offsetTop;
        var move=function (e) {
            var e=e||event,
                tempX=e.clientX-disX,
                tempY=e.clientY-disY;
            //不允许超出边界
            if (tempX>document.documentElement.clientWidth-box.offsetWidth) {
                tempX=document.documentElement.clientWidth-box.offsetWidth;
            }else if (tempX<0) {
                tempX=0;
            }
            if (tempY>document.documentElement.clientHeight-box.offsetHeight) {
                tempY=document.documentElement.clientHeight-box.offsetHeight;
            }else if (tempY<0) {
                tempY=0;
            }
            box.style.left=tempX+'px';
            box.style.top=tempY+'px';
        };
        addEvent(document,'mousemove',move);
        addEvent(document,'mouseup',function () {
            removeEvent(document,'mousemove',move);
        });
    })
}

