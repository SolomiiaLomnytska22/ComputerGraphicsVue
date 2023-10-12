<template>
 <HeaderMenu></HeaderMenu>
 <MainPage></MainPage>
</template>

<script>
import MainPage from './components/MainPage.vue'
import HeaderMenu from './components/HeaderMenu.vue'

export default {
  name: 'App',
  components: {
    MainPage,
    HeaderMenu
  }
}
</script>

<style>

body {
  background: #1F3244;
  margin:0;
}
</style>
