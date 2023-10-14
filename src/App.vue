<template>
 <HeaderMenu></HeaderMenu>
 <router-view></router-view>
</template>

<script>
import HeaderMenu from './components/HeaderMenu.vue'

export default {
  name: 'App',
  components: {
    HeaderMenu
  }
}
</script>

<style>

body {
  background: #1F3244;
  margin:0;
}

.v-input__details {
    display: none;
}
</style>
