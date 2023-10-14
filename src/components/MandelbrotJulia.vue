<template>
  <div class="fractal-container">
    <div class="input-form"></div>
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
        p.createCanvas(630, 740);
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
    margin-left: 10px;
  }
  .fractal-container
  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .input-form{
    background-color: #1F3244;
    width: 255px;
    height: 740px;
    margin: 55px 0;
    
  }
</style>
