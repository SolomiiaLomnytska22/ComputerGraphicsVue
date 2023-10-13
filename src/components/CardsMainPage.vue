<template>
    <h1 class="caption">OUR TASKS</h1>
    <div class="card-list">
      <div class="card" v-for="(card, index) in cards" :key="index" @click="navigateTo(card.route)">
        <div class="card-image" :style="{ backgroundImage: `url(${card.image})`}"> 
          <div class="gradient-overlay"></div>
          <div class="card-content">
            <p class="card-title">{{ card.title }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      navigateTo(route) {
        this.$router.push({ name: route });
      },
    },
    data() {
      return {
        cards: [
          {
            image: 'https://www.hpcwire.com/wp-content/uploads/2014/05/Mandelbrot_400x.jpg',
            title: 'Fractals',
            route: 'fractals', 
        },
          {
            image: 'https://media.istockphoto.com/id/1309398170/vector/color-palette-5.jpg?s=612x612&w=0&k=20&c=fRQ9cs-4wmiV0P-yyeIez5Ib4-Hd0OMlxrNiqR0bCIE=',
            title: 'Color Schemes',
            route: 'fractals', 
           },
          {
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Fractal_fern_explained.png',
            title: 'Affine Transformations',
            route: 'fractals', 
           },
        ],
      };
    },
  };
  </script>
  
  <style scoped>
  .caption
  {
    color: white;
    font-family: 'Roboto', sans-serif;
    font-size: 40px;
    margin: 60px;
    font-weight: bold;
  }
  .card-list {
    display: flex;
    margin: 60px;
    justify-content: space-between;
  }
  
  .card {
    cursor:pointer;
    flex: 1;
    max-width: 30%;
    position: relative;
    overflow: hidden;
    border-radius: 5px;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  
  .card:hover {
    transform: scale(1.05);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .card-image {
    height: 350px;
    background-size: cover;
    background-position: center;
    position: relative;
  }
  
  .gradient-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.9));
  }
  .gradient-overlay:hover {
    
    background: linear-gradient(rgba(215, 50, 70, 0.5), rgba(0, 0, 0, 0.9));
  }
  
  .card-content {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 10px;
    color: #fff;
  }
  
  .card-title {
    font-family: 'Roboto', sans-serif;
    font-size: 24px;
    font-weight: bold;
  }
  
  
  </style>
  