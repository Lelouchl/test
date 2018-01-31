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
    change:['Top','Right','Bottom','Left'],
    create:function () {
        this.block=$('#tab').rows[this.x].cells[this.y];
        this.block.className=this.change[this.d];
        this.block.innerHTML='<div></div>';
    },
    reset:function () {
        this.block.className='';
        this.block.innerHTML='';
    },
    turn:function (d) {
        this.d=this.d+d;
        if (this.d>3) {
            this.d=this.d-4;
        }else if (this.d<0) {
            this.d=this.d+4;
        }
        this.block.className=this.change[this.d];
    },
    go:function () {
        switch (this.block.className) {
            case 'Top':
                if (this.x>1) {
                    this.reset();
                    this.x--;
                    this.create();
                }
                break;
            case 'Right':
                if (this.y<10) {
                    this.reset();
                    this.y++;
                    this.create();
                }
                break;
            case 'Bottom':
                if (this.x<10) {
                    this.reset();
                    this.x++;
                    this.create();
                }
                break;
            case 'Left':
                if (this.y>1) {
                    this.reset();
                    this.y--;
                    this.create();
                }
                break;
        }
    }
};
//添加点击事件
addEvent($('#btn'),'click',function () {
    switch ($('#command').value.trim()) {
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
    }
});
//随机创建方块
Square.create();
