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
  export default {
    data() {
      return {
        mouseDown: false,
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
          }
        }
      },
      canvasUp() {
        this.mouseDown = false;
        let canvas = this.canvas;
        let cvs = this.canvas.getContext('2d');
        cvs.closePath();    //结束本次绘画
        canvas.onmousemove = null;
        canvas.onmouseup = null;
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
