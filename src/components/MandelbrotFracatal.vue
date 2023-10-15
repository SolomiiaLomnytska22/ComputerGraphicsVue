<template>
  <div class="fractal-container">
  <div class="input-form">
      <div class="input-field">
        <label for="ca">Enter value of Ca:</label>
        <input type="number" id="ca"  v-model="ca" step="0.01" min="-1" max="1"/>
      </div>
      <div class="input-field">
        <label for="cb">Enter value of Cb:</label>
        <input type="number" id="cb"  v-model="cb" step="0.01"  min="-1" max="1"/>
      </div>
      <div class="input-field">
        <label for="iterations">Iterations:</label>
        <input type="number" id="iterations"  v-model="maxIterations" step="1" />
      </div>
      <div class="input-field">
        <label for="color">Color:</label>
        <input type="color" id="color" v-model="color"/>
      </div>
      <div class="input-field">
        <label for="zoom">Zoom:</label>
        <input type="range" id="zoom" v-model="zoom" min="0" max="7" step="1"/>
      </div>
      <v-btn class="btn" variant="flat" background-color = "white" color="#D73246" @click="draw">Build Fractal</v-btn>
    </div>
    <div id="fractal"></div>
   
  </div>
  
</template>

<script>
import p5 from 'p5';

export default {
  mounted() {
    this.sketch = new p5(this.p5sketch, 'fractal');
  },
  methods: {
      navigateTo(route) {
        this.$router.push({ name: route });
      },
    p5sketch(p) {
      let minval = -2;
      let maxval = 2;
      let minSlider, maxSlider;

      p.setup = function() {
        p.createCanvas(600, 740);
        p.pixelDensity(1);

        minSlider = p.createSlider(-2.5, 0, -2.5, 0.01);
        maxSlider = p.createSlider(0, 2.5, 2.5, 0.01);
      };

      p.draw = function() {
        p.loadPixels();
        minval = minSlider.value();
        maxval = maxSlider.value();

        for (let x = 0; x < p.width; x++) {
          for (let y = 0; y < p.height; y++) {
            let a = p.map(x, 0, p.width, minval, maxval);
            let b = p.map(y, 0, p.height, minval, maxval);

            let ca = a;
            let cb = b;

            let n = 0;

            while (n < 100) {
              let aa = a * a - b * b;
              let twoab = 2 * a * b;

              a = aa + ca;
              b = twoab + cb;

              if (p.abs(a + b) > 16) {
                break;
              }

              n++;
            }

            let bright = p.map(n, 0, 100, 0, 1);
            bright = p.map(p.sqrt(bright), 0, 1, 0, 255);

            if (n === 100) {
              bright = 0;
            }

            let pix = (x + y * p.width) * 4;
            p.pixels[pix + 0] = bright;
            p.pixels[pix + 1] = bright;
            p.pixels[pix + 2] = bright;
            p.pixels[pix + 3] = 255;
          }
        }

        p.updatePixels();
      };
    },
  },
};
</script>

<style>

  #fractal{
    max-width: 600px;
    border-radius: 5px;
  }
  .fractal-container
  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 55px 0;
  }

</style>
