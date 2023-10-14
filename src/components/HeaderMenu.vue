<template>
    <header>
      <img src="../assets/Logo.svg" alt="Logo" @click="navigateTo('main-page')">
      <nav>
        <ul>
          <li @click="navigateTo('fractals')">Fractals</li>
          <li @click="navigateTo('fractals')">Color Schemes</li>
          <li @click="navigateTo('fractals')">Affine Transformations</li>
        </ul>
      </nav>
    </header>
  </template>
  
  <script>
  export default {
    name: 'HeaderMenu',
    methods: {
      navigateTo(route) {
        this.$router.push({ name: route });
      },
    },
  };
  </script>

<style scoped>
img 
{
  height: 65px;
  margin: 30px 0;
  cursor: pointer;
}
header{
  display: flex; 
  background-color: #04101A;
  justify-content: space-between;
  padding: 0px 165px ;
  height: 125px;
}
 ul
 {
  display: flex; 
  list-style: none; 
  padding: 50px 0;
  color: white;
  width: 630px;
  justify-content: space-between;
  margin: 0;
  width: 630px;
 }
 li
 {
  cursor: pointer;
  font-family: 'Roboto', sans-serif;
  font-size: 24px;
  font-weight:700;
}
 li:hover{
  color: #D73246;
  
 }

</style>