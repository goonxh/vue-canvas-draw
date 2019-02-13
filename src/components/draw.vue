<template>
  <div class="draw-component flex align-items-center justify-content-center">
    <canvas id="canvas" ref="canvas" width="900px" height="500px"></canvas>
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
    },
    created() {

    },
    mounted() {
      bus.$on('changeDrawBg', src => {
        this.changeDrawBackground(src);
      })
      bus.$on('clearCanvas', () => {
        this.clearCanvas();
      })
      bus.$on('saveToImage', () => {
        this.saveToImage();
      })
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
        cvs.clearRect(0,0,this.width,this.height);
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
