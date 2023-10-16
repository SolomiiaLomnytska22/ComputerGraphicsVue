<template>
     <div class="page-heading">
        <h1 class="caption">HOW TO USE THE PROGRAM?</h1>
    </div>
    <div class = "background">
        <div class = "main-content">
        <div class = "description">
            <img src="../assets/HowToUse.png" alt="Screenshot" style="height:700px; box-shadow: 0px 0px 20px #04101A">
            <div class = "text" style="margin:0 110px">
            <h2>1</h2>
            <p style="margin-bottom: 25px;">Select a fractal to create. You have two options: Mandelbrot or Vicsek.</p>
            <h2>2-3</h2>
            <p style="margin-bottom: 25px;">Input the values of C, comprising the real part and the imaginary part of numbers.</p>
            <h2>4</h2>
            <p style="margin-bottom: 25px;">Specify the number of iterations you'd like to perform.</p>
            <h2>5</h2>
            <p style="margin-bottom: 25px;">Choose the color scheme for your fractal.</p>
            <h2>6</h2>
            <p style="margin-bottom: 25px;">Adjust the zoom level by either zooming in or out.</p>
            <h2>7</h2>
            <p style="margin-bottom: 25px;">Finally, click the "Build Fractal" button to generate and view your fractal masterpiece!</p>
            <p>*Be aware that generating fractals may take some time, so please be patient during the process.</p>
        </div>
           
        </div>
        <v-btn class="btn" style = "margin: 75px 0 0 0;" variant="flat" color="#D73246" @click="navigateTo('main-page')">&lt;</v-btn>
         
        </div>
    </div>
 </template>
 
 <script>
 
  export default{
     methods: {
       navigateTo(route) {
         this.$router.push({ name: route });
       }
     }
 }
 </script>
 
 <style scoped>
    @import './fractals-styles.css';
    .description
    {
        display: flex;
        align-items: center;
        margin-top: 25px;
    }
h2{
    font-family: 'Roboto', sans-serif;
    font-weight: 700;
    font-size: 36px;
    color: #D73246;
}

p{
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
    color: white;
}

 .learn-more-btn:hover {
     background-image: url('../assets/AboutBtnPressed.svg');
 }
 .caption
   {
     color: white;
     font-family: 'Roboto', sans-serif;
     font-size: 40px;
     margin: 0;
     font-weight: bold;
   }
 .page-heading
 {
     width: 100%;
     display: flex;
     flex-direction: row;
     justify-content: space-between;
     padding: 100px 165px 0;

 }
 .background
 {
    background-image: url('../assets/background.svg');
    
 }
 .main-content
 {
     background: linear-gradient(0deg, rgba(98, 19, 28, 0.4) 0%, rgba(217, 217, 217, 0.00) 100%);
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     padding: 100px 165px;
 }
 .fractal-builder
 {
     width: 100%;
     background-color: #04101A;
     padding: 80px;
     margin:75px 165px;
 
 }
 
 </style>