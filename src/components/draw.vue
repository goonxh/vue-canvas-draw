<template>
  <div class="draw-component flex align-items-center justify-content-center">
    <canvas id="canvas" ref="canvas" width="900px" height="500px" @mousedown="canvasDown($event)"  @mousemove="canvasMove($event)" @mouseup="canvasUp($event)" @mouseleave="canvasLeave($event)" @dragover="dragOver($event)" @drop="dragFinished($event)"></canvas>
  </div>
</template>

<script>
  import bus from './bus';
  import bg2 from '../assets/bg2.jpg';
  import bg3 from '../assets/bg3.jpg';
  import bg4 from '../assets/bg4.jpg';
  import Line from '../tool/line';

  export default {
    data() {
      return {
        mouseDown: false,
        start: {
          x: 0,
          y: 0
        },
        end: {
          x: 0,
          y: 0
        },
        otherStack: [],
        playerStack: [],
        obj: {},
      }
    },
    computed:{
      canvas() {
        return this.$refs.canvas;
      },
      width(){
        return this.$refs.canvas.width;
      },
      height(){
        return this.$refs.canvas.height;
      },
      drawColor() {
        return this.$store.state.drawColor;
      },
      tool(){
        return this.$store.state.tool;
      }
    },
    watch: {
      tool () {

      }
    },
    created() {

    },
    mounted() {
      bus.$on('changeDrawBg', src => {
        this.changeDrawBackground(src);
      });
      bus.$on('clearCanvas', () => {
        this.clearCanvas();
      });
      bus.$on('saveToImage', () => {
        this.saveToImage();
      });
    },
    methods: {
      changeDrawBackground(src) {
        let img = new Image(900,500);
        if(src === 'bg2') {
          img.src = bg2;
        }
        if(src === 'bg3') {
          img.src = bg3;
        }
        if(src === 'bg4') {
          img.src = bg4;
        }
        let cvs = this.canvas.getContext('2d');
        img.onload = () =>{
          cvs.drawImage(img, 0, 0, 900, 500);
        }
      },
      clearCanvas() {
        let cvs = this.canvas.getContext('2d');
        cvs.clearRect(0, 0, this.width, this.height);
      },
      saveToImage() {
        //强制浏览器下载，没有文件名和扩展名
        /*let image = this.canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        window.location.href = image;*/
        let dataUrl = this.canvas.toDataURL("image/png");
        let a = document.createElement('a');
        a.href = dataUrl;
        a.download = `Cvs ${new Date().toLocaleString()}`;
        a.click();
      },
      getScrollTop(){
        let scrollTop = 0;
        if (document.documentElement && document.documentElement.scrollTop) {
          scrollTop = document.documentElement.scrollTop;
        } else if (document.body) {
          scrollTop = document.body.scrollTop;
        }
        return scrollTop;
      },
      canvasMousePos(canvas, event){
        let x = (document.documentElement.scrollLeft || document.body.scrollLeft) + (event.clientX || event.pageX);
        let y = (event.clientY || event.pageY) + this.getScrollTop();
        return {
          x: x - canvas.offsetLeft,
          y: y - canvas.offsetTop
        }
      },
      canvasDown(event) {
        this.mouseDown = true;
        let canvas = this.canvas;
        let cvs = this.canvas.getContext('2d');
        this.start = this.end = this.canvasMousePos(canvas,event);
        if (this.tool === 'pen') {
          this.canvas.onmousedown = () => {
            let start_x = this.canvasMousePos(canvas,event).x;
            let start_y = this.canvasMousePos(canvas,event).y;
            cvs.beginPath();    //开始本次绘画
            cvs.moveTo(start_x, start_y);   //画笔起始点
            /*设置画笔属性*/
            cvs.lineCap = 'round';
            cvs.lineJoin = "round";
            cvs.strokeStyle = this.drawColor;  //画笔颜色
            cvs.lineWidth = '2';      //画笔粗细
          }
        }
        console.log(this.otherStack);
        let arr = [];
        for(let obj of this.otherStack){
          obj.draw();
          if(obj.inRange(this.start.x,this.start.y)){
            arr.push(obj);
          }
        }
        for(let obj of this.playerStack){
          obj.draw();
          if(obj.inRange(this.start.x,this.start.y)){
            arr.push(obj);
          }
        }
      },
      canvasMove(event) {
        if(this.mouseDown) {
          let canvas = this.canvas;
          let cvs = this.canvas.getContext('2d');

          if (this.tool === 'pen') {
            let move_x = this.canvasMousePos(canvas,event).x;
            let move_y = this.canvasMousePos(canvas,event).y;
            cvs.lineTo(move_x, move_y);     //根据鼠标路径绘画
            cvs.strokeStyle = this.drawColor;
            cvs.stroke();   //立即渲染
          } else if(this.tool === 'solidArrowLine' || this.tool === 'dottedArrowLine' || this.tool === 'waveLine' || this.tool === 'dottedLine' || this.tool === 'solidLine') {
            this.end = this.canvasMousePos(canvas, event);
            cvs.clearRect(0, 0, this.width, this.height);
            let lineColor = this.drawColor;
            this.obj = new Line(cvs,this.tool,this.start,this.end,lineColor,this.edgeColor);
            this.reDraw();
            this.obj.draw();
            this.obj.drawEdges();
          }
        }
      },
      reDraw(){
        for(let obj of this.otherStack){
          obj.draw();
        }
        for(let obj of this.playerStack){
          obj.draw();
        }
      },
      canvasUp() {
        this.mouseDown = false;
        let canvas = this.canvas;
        let cvs = this.canvas.getContext('2d');
        cvs.closePath();    //结束本次绘画
        canvas.onmousemove = null;
        canvas.onmouseup = null;
        if(JSON.stringify(this.obj) !== "{}"){
          let diffX = Math.abs(this.end.x - this.start.x);
          let diffY = Math.abs(this.end.y - this.start.y);
          let len = Math.sqrt(diffX * diffX + diffY * diffY);
          if( ((this.obj.type === 'rectangle' || this.obj.type === 'circular') && (diffX > 40 || diffY > 40)) || ((this.obj.type === 'square' || this.obj.type === 'reTriangle') && (diffX > 40 && diffY > 40)) || (this.obj instanceof Line && len > 60)){
            this.otherStack.push(this.obj);
          }else {
            this.canvas.getContext("2d").clearRect(0, 0, this.width, this.height);
            this.reDraw();
          }
          this.obj = {};
          this.start = {
            x : 0,
            y : 0
          };
          this.end = {
            x : 0,
            y : 0
          }
        }
      },
      canvasLeave() {
        this.mouseDown = false;
        let canvas = this.canvas;
        let cvs = this.canvas.getContext('2d');
        cvs.closePath();    //结束本次绘画
        canvas.onmousemove = null;
        canvas.onmouseup = null;
      },
      dragOver() {

      },
      dragFinished() {

      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .draw-component {
    width: calc(100% - 220px);
    background-image: url("../assets/drawBg.png");
    background-repeat: repeat;
    #canvas{
      border: 2px dashed rgb(157,216,98);
      border-radius: 5px;
    }
  }
</style>
