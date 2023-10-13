<template>
    <div>
      <label for="fractalSelector">Select a Fractal:</label>
      <select id="fractalSelector" v-model="selectedFractal">
        <option value="Mandelbrot set">Mandelbrot set</option>
        <option value="Vicsek fractal">Vicsek fractal</option>
      </select>
  
      <div>
        <p>You selected: {{ selectedFractal }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedFractal: "Mandelbrot set", // Set the initial selection
      };
    },
  };
  </script>
  