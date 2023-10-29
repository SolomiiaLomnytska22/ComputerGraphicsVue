<template>
    
    <div class = "main-content">

     <div class="page-heading">
         <h1 class="caption">COLOR SCHEMES</h1>
         <a href="https://www.geeksforgeeks.org/difference-between-rgb-cmyk-hsv-and-yiq-color-models/" target="_blank"><div class="learn-more-btn"></div></a>
     </div>

     <div class = "content">
         <div class="toolbar-btn">
            <div class="buttons">
            <ImageUploader  style="margin-right:10px"  @file-selected="handleFileSelected"></ImageUploader>
            <v-btn class="btn" variant="flat" color="#D73246">Save
                <svg-icon style = "padding-left: 5px; color: #FFFFFF" type="mdi" :path="mdiContentSaveAll"></svg-icon>
            </v-btn>
            <span class="filename" >{{ uploadedFileName }}</span>
            </div>
             <img src="../assets/Icon.svg" alt="Info" @click="navigateTo('')"  >
        </div>
         <div class = "work-area">
            <div class = "picture-container"> 
                <canvas ref= "imageCanvas" alt="Your Image"></canvas>
                    <div class="toolbar">
                        <v-btn class="btn" variant="text" color="white">
                            <svg-icon style = "color: #ffffff" type="mdi" :path="mdiEyeOff"></svg-icon>
                        </v-btn>
                        <span class="info">HSV: X.X.X </span><span class="info">CMYK: X.X.X.X</span>
                    </div>
            </div >
            <div class = "input-form" style="height: auto;">
            <p class="title">Change the brightness and saturation of the blue color:</p>
            <div class="input-field" >
                <label for="brightness">Brightness:</label>
                <input type="range" id="brightness" min="1" max="255" step="1" />
            </div>
        <div class="input-field">
            <label for="saturation">Saturation:</label>
            <input type="range" id="saturation"  min="1" max="255" step="1" />
        </div>
        <v-btn class="btn" variant="flat" color="#D73246" >Apply</v-btn>
        </div>
    </div>

     </div>


     <div style ="display: flex; justify-content: flex-start; width: 100%">
        <v-btn class="btn" variant="flat" color="#D73246" @click="navigateTo('main-page')">&lt;</v-btn>
     </div>

    </div>
 </template>
 
 <script>
 
 import SvgIcon from '@jamescoyle/vue-icon';
import { mdiUpload, mdiContentSaveAll, mdiEyeOff} from '@mdi/js';
import ImageUploader from './ImageUploader.vue';
 export default{
     methods: {
       navigateTo(route) {
         this.$router.push({ name: route });
       },
       handleFileSelected(data)
       {
        this.selectedImage = data.selectedImage;
        this.uploadedFileName = data.uploadedFileName;

        const canvas = this.$refs.imageCanvas;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = this.selectedImage;
        image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
       }
     },
       defaultDraw(){
        const canvas = this.$refs.imageCanvas;
        const context = canvas.getContext('2d');
        const image = new Image();
        image.src = this.selectedImage;
        image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
       }
    }},
 components:{
    SvgIcon,
    ImageUploader
 },
 mounted(){
    this.defaultDraw();
 },
 data() {
    return {
       mdiUpload, 
       mdiContentSaveAll,
       mdiEyeOff,
       selectedImage:"/PlaceHolder.png",
       uploadedFileName:""
    }
  }
 }
 </script>
 
 <style scoped>
    @import './fractals-styles.css';

    .buttons{
        display: flex; flex-direction: row; justify-content: space-between; align-items: center; width: 250px;
    }
    .toolbar-btn{
        display: flex; flex-direction: row; justify-content: space-between; 
        padding:0px;
    }
    canvas:hover{
     cursor: pointer;
    }
 .learn-more-btn{
     cursor: pointer;
     height: 65px;
     width: 415px;
     background-size: 100% 100%;
     background-image: url('../assets/AboutBtn.svg');
 }
 
 .learn-more-btn:hover {
     background-image: url('../assets/AboutBtnPressed.svg');
 }
 .info{
    padding: 0px 5px; margin: 0;
 }
 .caption
   {
     color: white;
     font-family: 'Roboto', sans-serif;
     font-size: 40px;
     margin: 0;
     font-weight: bold;
   }
   .title{
    color: white; font-size: 18px; padding-bottom: 30px; font-weight: 600;  
   }
 .page-heading
 {
     width: 100%;
     display: flex;
     flex-direction: row;
     justify-content: space-between;
 }
 .main-content
 {
     background: linear-gradient(0deg, rgba(215, 50, 70, 0.40) 0%, rgba(217, 217, 217, 0.00) 100%);
     display: flex;
     flex-direction: column;
     align-items: center;
     padding: 100px 165px;
 }
 .content
 {
     width: 100%;
     background-color: #04101A;
     padding: 80px;
     margin:75px 165px;
   
 }

 .work-area{
    display: flex;
    flex-direction: row;
    margin-top: 50px;
    justify-content: space-between;
 }

 .picture-container{
    height: 375px;
    width: 575px;
    background-color: #1F3244;
    border-radius: 5px;
 }
 

 .picture-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: stretch;
    position: relative;
    overflow: hidden;
}

.picture-container canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    
}

.toolbar {
    background: rgba(4, 16, 26, 0.5); 
    color: white;
    padding: 10px;
    z-index: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
}

.filename
{
    color: #FFFFFF; margin-left:10px
}


 </style>