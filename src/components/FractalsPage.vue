
<template>
    
   <div class = "main-content">
    <div class="page-heading">
        <h1 class="caption">FRACTALS</h1>
        <div class="learn-more-btn"></div>
    </div>

    <div class = "fractal-builder">
        <DropDownMenu></DropDownMenu>
        <router-view></router-view>
        <v-btn class="btn" variant="flat" color="#D73246" @click="navigateTo('main-page')">&lt;</v-btn>
    </div>
    
   </div>
</template>

<script>

import DropDownMenu from './DropDownMenu.vue'
export default{
components:{
    DropDownMenu
}
}
</script>

<style scoped>
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
}
.main-content
{
    background: linear-gradient(0deg, rgba(215, 50, 70, 0.40) 0%, rgba(217, 217, 217, 0.00) 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
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