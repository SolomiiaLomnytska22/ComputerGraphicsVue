<template>
  <div>
    <v-select class="custom-select"
      variant='outlined'
      v-model="selectedFractal"
      @update:modelValue="navigateTo"
      :items="fractals">
  </v-select>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedFractal: "mandelbrot",
      fractals: [
        { title: "Mandelbrot and Julia fractal", value: "mandelbrot" },
        { title: "Vicsek fractal", value: "vicsek" }        
      ],
    };
  },
  methods: {
    navigateTo() {
      console.log(this.selectedFractal)
      this.$router.push({ name: this.selectedFractal });
    },
  },
  mounted() {
    this.navigateTo();
  },
};
</script>

<style scoped>
.custom-select {

  color: #D73246;
  border-style: none;
  background-color: rgb(255, 255, 255);
  font-family: 'Roboto', sans-serif;
  font-weight: 700;
  border-radius: 5px;
  width: 255px;

}


:deep(.v-input__details) {
    display: none;;
}


</style>