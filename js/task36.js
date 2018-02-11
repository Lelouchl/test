
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
            td.className='row'+i+' col'+j;
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
                if (this.y>1 && $('.row'+this.x+'.col'+(this.y-1)).className.indexOf('wall')==-1) {
                    this.y--;
                }
                break;
            case 'top':
                if (this.x>1 && $('.row'+(this.x-1)+'.col'+this.y).className.indexOf('wall')==-1) {
                    this.x--;
                }
                break;
            case 'right':
                if (this.y<10 && $('.row'+this.x+'.col'+(this.y+1)).className.indexOf('wall')==-1) {
                    this.y++;
                }
                break;
            case 'bottom':
                if (this.x<10 && $('.row'+(this.x+1)+'.col'+this.y).className.indexOf('wall')==-1) {
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
                if (this.x<10 && $('.row'+(this.x+1)+'.col'+this.y).className.indexOf('wall')==-1) {
                    this.x++;
                }
                break;
            case 90:
                if (this.y>1 && $('.row'+this.x+'.col'+(this.y-1)).className.indexOf('wall')==-1) {
                    this.y--;
                }
                break;
            case 180:
                if (this.x>1 && $('.row'+(this.x-1)+'.col'+this.y).className.indexOf('wall')==-1) {
                    this.x--;
                }
                break;
            case 270:
                if (this.y<10 && $('.row'+this.x+'.col'+(this.y+1)).className.indexOf('wall')==-1) {
                    this.y++;
                }
                break;
        }
        this.move();
    },
    //创建墙壁
    createWall:function () {
        var wallX,
            wallY;
        switch ((this.deg%360+360)%360) {
            case 0:
                if (this.x<10) {
                    wallX=this.x;
                    wallX++;
                    wallY=this.y;
                    if ($('.row'+wallX+'.col'+wallY).className.indexOf('wall')==-1) {
                        $('.row'+wallX+'.col'+wallY).className+=' wall';
                    }else {
                        console.log('建墙失败，前方已有墙！');
                    }
                }else {
                    console.log('建墙失败，超出边界！');
                }
                break;
            case 90:
                if (this.y>1) {
                    wallX=this.x;
                    wallY=this.y;
                    wallY--;
                    if ($('.row'+wallX+'.col'+wallY).className.indexOf('wall')==-1) {
                        $('.row'+wallX+'.col'+wallY).className+=' wall';
                    }else {
                        console.log('建墙失败，前方已有墙！');
                    }
                }else {
                    console.log('建墙失败，超出边界！');
                }
                break;
            case 180:
                if (this.x>1) {
                    wallX=this.x;
                    wallX--;
                    wallY=this.y;
                    if ($('.row'+wallX+'.col'+wallY).className.indexOf('wall')==-1) {
                        $('.row'+wallX+'.col'+wallY).className+=' wall';
                    }else {
                        console.log('建墙失败，前方已有墙！');
                    }
                }else {
                    console.log('建墙失败，超出边界！');
                }
                break;
            case 270:
                if (this.y<10) {
                    wallX=this.x;
                    wallY=this.y;
                    wallY++;
                    if ($('.row'+wallX+'.col'+wallY).className.indexOf('wall')==-1) {
                        $('.row'+wallX+'.col'+wallY).className+=' wall';
                    }else {
                        console.log('建墙失败，前方已有墙！');
                    }
                }else {
                    console.log('建墙失败，超出边界！');
                }
                break;
        }
    },
    //粉刷墙壁
    bruWall:function (color) {
        var wallX,
            wallY;
        switch ((this.deg%360+360)%360) {
            case 0:
                if (this.x<10) {
                    wallX=this.x;
                    wallX++;
                    wallY=this.y;
                    if ($('.row'+wallX+'.col'+wallY).className.indexOf('wall')==-1) {
                        console.log('粉刷失败，前方没有墙！');
                    }else {
                        $('.row'+wallX+'.col'+wallY).style.backgroundColor=color;
                    }
                }else {
                    console.log('粉刷失败，前方没有墙！');
                }
                break;
            case 90:
                if (this.y>1) {
                    wallX=this.x;
                    wallY=this.y;
                    wallY--;
                    if ($('.row'+wallX+'.col'+wallY).className.indexOf('wall')==-1) {
                        console.log('粉刷失败，前方没有墙！');
                    }else {
                        $('.row'+wallX+'.col'+wallY).style.backgroundColor=color;
                    }
                }else {
                    console.log('粉刷失败，前方没有墙！');
                }
                break;
            case 180:
                if (this.x>1) {
                    wallX=this.x;
                    wallX--;
                    wallY=this.y;
                    if ($('.row'+wallX+'.col'+wallY).className.indexOf('wall')==-1) {
                        console.log('粉刷失败，前方没有墙！');
                    }else {
                        $('.row'+wallX+'.col'+wallY).style.backgroundColor=color;
                    }
                }else {
                    console.log('粉刷失败，前方没有墙！');
                }
                break;
            case 270:
                if (this.y<10) {
                    wallX=this.x;
                    wallY=this.y;
                    wallY++;
                    if ($('.row'+wallX+'.col'+wallY).className.indexOf('wall')==-1) {
                        console.log('粉刷失败，前方没有墙！');
                    }else {
                        $('.row'+wallX+'.col'+wallY).style.backgroundColor=color;
                    }
                }else {
                    console.log('粉刷失败，前方没有墙！');
                }
                break;
        }
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
    var regGO=/^GO(\s\d)?$/;
    var regTUN=/^TUN\s(LEF|RIG|BAC)$/;
    var regTRAMOV=/^(TRA|MOV)\s(LEF|RIG|TOP|BOT)(\s\d)?$/;
    var regBUILD=/^BUILD$/;
    var regBRU=/^BRU\s(#[0-9a-fA-f]{3}|#[0-9a-fA-f]{6})$/;
    var regMOVTO=/^MOV\sTO\s\d+,\d+$/;
    return !regGO.test(data)&&!regTUN.test(data)&&!regTRAMOV.test(data)&&!regBUILD.test(data)&&!regBRU.test(data)&&!regMOVTO.test(data);
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
        case 'BUILD':
            Square.createWall();
            break;
    }
}
//运行指令
function runCommand(commandArray) {
    var i=0,
        j=0,
        cmd,
        x,
        color;
    setInterval(function () {
        if (i<commandArray.length) {
            commandArray[i].trim();
            if (commandArray[i].match(/\d/)&&!commandArray[i].match(/BRU/)&&!commandArray[i].match(/MOV\sTO\s/)) {
                x=commandArray[i].match(/\d/);
                cmd=commandArray[i].split(' '+x)[0];
                if (j<x) {
                    boxCommand(cmd);
                    j++;
                }else {
                    j=0;
                    i++;
                }
            }else if (commandArray[i].match(/BRU/)) {
                color=commandArray[i].split(' ')[1];
                Square.bruWall(color);
                i++;
            }else if (commandArray[i].match(/MOV\sTO\s/)) {
                var coordinate=commandArray[i].split(' ')[2];
                var endX=Number(coordinate.split(',')[0]);
                var endY=Number(coordinate.split(',')[1]);
                var res=searchRoad(Square.x,Square.y,endX,endY);
                var num=0;
                if (res) {
                    setInterval(function () {
                        if (num<res.length) {
                            Square.x=res[num].x;
                            Square.y=res[num].y;
                            Square.move();
                            num++;
                        }
                    },1000);
                }
                i++;
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
//随机造墙
function randomWall(num) {
    for (var i=0;i<num;i++) {
        var x=Math.floor(Math.random()*10+1);
        var y=Math.floor(Math.random()*10+1);
        if (!(x==Square.x && y==Square.y) && $('.row'+x+'.col'+y).className.indexOf('wall')==-1) {
            $('.row'+x+'.col'+y).className+=' wall';
        }
    }
}
//寻路算法
function searchRoad(startX,startY,endX,endY) {
    var openList=[],
        closeList=[],
        result=[],
        resultIndex;
    if (startX==endX && startY==endY) {
        alert('目标点和起点是同一个点！');
        return false;
    }else if (endX<1 || endX>10 || endY<1 || endY>10) {
        alert('目标点在边界外！');
        return false;
    }else if ($('.row'+endX+'.col'+endY).className.indexOf('wall')!=-1) {
        alert('目标点是墙！');
        return false;
    }

    openList.push({x:startX,y:startY,G:0});

    do {
        var curPoint=openList.pop();
        closeList.push(curPoint);
        var surPoint=SurPoint(curPoint);
        for (var i in surPoint) {
            var item=surPoint[i];//获取周围的点
            if (
                item.x>=1 &&
                item.y>=1 &&
                item.x<=10 &&
                item.y<=10 &&
                $('.row'+item.x+'.col'+item.y).className.indexOf('wall')==-1 &&//不是障碍物
                !existList(item,closeList) &&//不在关闭列表
                $('.row'+item.x+'.col'+curPoint.y).className.indexOf('wall')==-1 &&//之间没有墙
                $('.row'+curPoint.x+'.col'+item.y).className.indexOf('wall')==-1
            ) {
                var g=curPoint.G + ((curPoint.x-item.x)*(curPoint.y-item.y)==0 ? 10:14);//G值
                if (!existList(item,openList)) {//不在开始列表
                    item['H']=Math.abs(endX-item.x)*10+Math.abs(endY-item.y)*10;
                    item['G']=g;
                    item['F']=item.H+item.G;
                    item['parent']=curPoint;
                    openList.push(item);
                }else {//在开始列表
                    var index=existList(item,openList);
                    if (g<openList[index].G) {//如果当前G更小
                        openList[index].parent=curPoint;
                        openList[index].G=g;
                        openList[index].F=g+openList[index].H;
                    }
                }
            }
        }
        if (openList.length==0) {//开启列表空了，没有路径可走
            alert('无路可走！');
            break;
        }
        openList.sort(sortF);//根据F降序排列，保证每次循环取的F值最小
    }while (!(resultIndex=existList({x:endX,y:endY},openList)));//当开启列表里找到目标节点时，路径已找到

    if (!resultIndex) {
        result=[];
    }else {
        var curObj=openList[resultIndex];
        do {//添加路径
            result.unshift({x:curObj.x,y:curObj.y});
            curObj=curObj.parent;
        }while (curObj.x!=startX || curObj.y!=startY);
    }
    return result;
}
//排序F值
function sortF(a,b) {
    return b.F-a.F;
}
//获取周围8个点
function SurPoint(curPoint) {
    var x=curPoint.x,
        y=curPoint.y;
    return [
        {x:x-1,y:y},
        {x:x,y:y+1},
        {x:x+1,y:y},
        {x:x,y:y-1}
    ]
}
//判断点是否存在列表中，是的话返回序列号
function existList(point,list) {
    for (var i in list) {
        if (point.x==list[i].x && point.y==list[i].y) {
            return i;
        }
    }
    return false;
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
//添加随机造墙点击事件
addEvent($('#randomWall'),'click',function () {
    randomWall(10);
});
//随机创建方块
Square.move();
