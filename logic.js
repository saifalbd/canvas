class  canvasBaseInfo {
    constructor(parentEl=document.body){
        this.parentEl=parentEl;
        this.mouseLeft=100;
        this.mouseTop=200;
        this.canvas=null,
            this.info=null;
        this.init();
    }
    parent() {
        const  parent = this.parentEl;
        let clientHeight = parent.clientHeight-4;
        let clientWidth = parent.clientWidth-2;
        let borderLeft = parent.clientLeft;
        let borderTop= parent.clientTop;
        let outSideTop = parent.offsetTop;
        let outSideLeft = parent.offsetLeft;
        this.info = {clientHeight,clientWidth,borderLeft,borderTop,outSideLeft,outSideTop};
        this.setCanvas();
        return this;
    }
    setCanvas(){
        let canvas = document.getElementById("myCanvas");
        canvas.width = this.info.clientWidth;
        canvas.height=this.info.clientHeight;
        this.canvas = canvas;
        return this;
    }
    static get colors(){
        return Object.values(window.colors);
    }
    get randomColorIndex(){
        return Math.floor(Math.random()*this.constructor.colors.length);
    }
    get randomColor(){
        return this.constructor.colors[this.randomColorIndex];
    }
    static randomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }
    get ctx(){
        return  this.canvas.getContext('2d');
    }
    mouseChange(callback=null) {
        this.parentEl.addEventListener('mousemove',(e)=>{
            this.mouseLeft = e.clientX;
            this.mouseTop=e.clientY;
            if (typeof callback  === "function"){
                callback(this.mouseLeft,this.mouseTop);
            }
            // document.getElementById('demo').textContent=e.clientX;
        });
        return this;
    }
    reSize(callback=null) {
        document.addEventListener('resize',()=>{
            this.parent();
            if (typeof callback  === "function"){
                callback(this.mouseLeft,this.mouseTop);
            }
        });
        return this;
    }
    init(){
        this.parent();
        return this;
    }
}