
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
//创建表格
(function () {
    var table=$('#tab');
    for (var i=0;i<11;i++) {
        var tr;
        tr=document.createElement('tr');
        table.appendChild(tr);
        for (var j=0;j<11;j++) {
            var td;
            td=document.createElement('td');
            if (i==0 && j>0) {
                td.innerHTML=j;
            }
            if (i>0 && j==0) {
                td.innerHTML=i;
            }
            tr.appendChild(td);
        }
    }
})();
//创建方块对象
var Square={
    x:Math.floor(Math.random()*10+1),
    y:Math.floor(Math.random()*10+1),
    d:Math.floor(Math.random()*4),
    self:$('#boxbot'),
    deg:0,
    move:function () {
        this.self.style.top=this.x*50+'px';
        this.self.style.left=this.y*50+'px';
    },
    turn:function (d) {
        switch (d) {
            case 1:
                this.deg+=90;
                this.self.style.transform='rotate('+this.deg+'deg)';
                break;
            case -1:
                this.deg-=90;
                this.self.style.transform='rotate('+this.deg+'deg)';
                break;
            case 2:
                this.deg+=180;
                this.self.style.transform='rotate('+this.deg+'deg)';
                break;
        }
    },
    tra:function (value) {
        switch (value) {
            case 'left':
                if (this.y>1) {
                    this.y--;
                }
                break;
            case 'top':
                if (this.x>1) {
                    this.x--;
                }
                break;
            case 'right':
                if (this.y<10) {
                    this.y++;
                }
                break;
            case 'bottom':
                if (this.x<10) {
                    this.x++;
                }
                break;
        }
        this.move();
    },
    mov:function (value) {
        switch (value) {
            case 'left':
                this.deg=90;
                this.self.style.transform='rotate('+this.deg+'deg)';
                break;
            case 'top':
                this.deg=180;
                this.self.style.transform='rotate('+this.deg+'deg)';
                break;
            case 'right':
                this.deg=270;
                this.self.style.transform='rotate('+this.deg+'deg)';
                break;
            case 'bottom':
                this.deg=0;
                this.self.style.transform='rotate('+this.deg+'deg)';
                break;
        }
        setTimeout(function () {
            Square.go();
        },1000);
    },
    go:function () {
        switch ((this.deg%360+360)%360) {
            case 0:
                if (this.x<10) {
                    this.x++;
                }
                break;
            case 90:
                if (this.y>1) {
                    this.y--;
                }
                break;
            case 180:
                if (this.x>1) {
                    this.x--;
                }
                break;
            case 270:
                if (this.y<10) {
                    this.y++;
                }
                break;
        }
        this.move();
    }
};
//渲染代码编号框
function renderCmd(inputArea,index,isCheck) {
    var error=false;
    var arrData=inputArea.value.split('\n');
    var str='';
    index.innerHTML='';
    for (var i=0;i<arrData.length;i++) {
        if (isCheck&&checkCmd(arrData[i])) {
            str+='<li class="error">'+(i+1)+'</li>';
            error=true;
        }else {
            str+='<li>'+(i+1)+'</li>';
        }
    }
    index.innerHTML=str;
    return {
        haveError:error,
        commandArray:arrData
    };
}
//检查代码
function checkCmd(data) {
    var regGO=/^GO(\s\d+)?$/;
    var regTUN=/^TUN\s(LEF|RIG|BAC)$/;
    var regTRAMOV=/^(TRA|MOV)\s(LEF|RIG|TOP|BOT)(\s\d+)?$/;
    return !regGO.test(data)&&!regTUN.test(data)&&!regTRAMOV.test(data)
}
//方块命令
function boxCommand(command) {
    switch (command) {
        case 'GO':
            Square.go();
            break;
        case 'TUN LEF':
            Square.turn(-1);
            break;
        case 'TUN RIG':
            Square.turn(1);
            break;
        case 'TUN BAC':
            Square.turn(2);
            break;
        case 'TRA LEF':
            Square.tra('left');
            break;
        case 'TRA TOP':
            Square.tra('top');
            break;
        case 'TRA RIG':
            Square.tra('right');
            break;
        case 'TRA BOT':
            Square.tra('bottom');
            break;
        case 'MOV LEF':
            Square.mov('left');
            break;
        case 'MOV TOP':
            Square.mov('top');
            break;
        case 'MOV RIG':
            Square.mov('right');
            break;
        case 'MOV BOT':
            Square.mov('bottom');
            break;
    }
}
//运行指令
function runCommand(commandArray) {
    var i=0,
        j=0,
        cmd,
        x;
    setInterval(function () {
        if (i<commandArray.length) {
            commandArray[i].trim();
            if (commandArray[i].match(/\d/)) {
                x=commandArray[i].match(/\d/);
                cmd=commandArray[i].split(' '+x)[0];
                if (j<x) {
                    boxCommand(cmd);
                    j++;
                }else {
                    j=0;
                    i++;
                }
            }else {
                boxCommand(commandArray[i]);
                i++;
            }
        }
    },1000);
}
//同步滚动
function syncScroll() {
    $('#index').scrollTop=$('#command').scrollTop;
}
//初始化
function reset() {
    $('#command').value='';
    $('#index').innerHTML='<li>1</li>';
}
//添加点击事件
addEvent($('#command'),'keyup',function (e) {
    var e=e||event;
    if (e.keyCode==13 || e.keyCode==8) {
        renderCmd($('#command'),$('#index'),true);
    }
});
addEvent($('#sure'),'click',function () {
    var result=renderCmd($('#command'),$('#index'),true);
    if (!result.haveError) {
        runCommand(result.commandArray);
    }
});
addEvent($('#reset'),'click',reset);
//添加滚动事件
addEvent($('#command'),'scroll',syncScroll);
//随机创建方块
Square.move();
