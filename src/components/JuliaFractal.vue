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
      <v-btn class="btn" variant="flat" background-color = "white" color="#D73246" @click="redrawFractal">Build Fractal</v-btn>
    </div>
    <div ref="canvasContainer" id="fractal" :width="600" :height="740"></div>
   
  </div>
  
</template>

<script>
import p5 from 'p5';

export default {
  data() {
    return {
      angle: 0,
      maxIterations: 100,
      zoom: 4,
      ca: -0.1,
      cb: -0.8,
      color: "#ff0000",
      p5Instance: null,
    };
  },
  mounted() {
    this.createCanvas();
  },
  methods: {
    createCanvas() {
      this.p5Instance = new p5(this.fractalSketch, this.$refs.canvasContainer);
    },
    redrawFractal() {
      this.p5Instance.remove();
      this.createCanvas();
    },
    fractalSketch(p) {
      p.setup = () => {
        p.createCanvas(600, 740);
        p.colorMode(p.HSB);
        this.drawFractal(p);
      };
    },
    drawFractal(p) {
      let w = this.zoom;
      let h = (w * p.height) / p.width;
      let xmin = -w / 2;
      let ymin = -h / 2;

      p.loadPixels();

      let xmax = xmin + w;
      let ymax = ymin + h;

      let dx = (xmax - xmin) / p.width;
      let dy = (ymax - ymin) / p.height;

      let y = ymin;
      for (let j = 0; j < p.height; j++) {
        let x = xmin;
        for (let i = 0; i < p.width; i++) {
          let a = x;
          let b = y;
          let n = 0;
          while (n < this.maxIterations) {
            let aa = a * a;
            let bb = b * b;
            if (aa + bb > 8.0) {
              break;
            }
            let twoab = 2.0 * a * b;
            a = aa - bb + this.ca;
            b = twoab + this.cb;
            n++;
          }

          let pix = 4 * (i + j * p.width);

          if (n == this.maxIterations) {
            p.pixels[pix] = 255;
            p.pixels[pix + 1] = 255;
            p.pixels[pix + 2] = 193;
            p.pixels[pix + 3] = 255;
          } else {
            let hu = ((n / this.maxIterations) * 360) % 360;
            let c = p.color(hu, 100, Math.pow(n / this.maxIterations, 0.25) * 100);
            p.pixels[pix] = p.blue(c);
            p.pixels[pix + 1] = p.red(c);
            p.pixels[pix + 2] = p.red(c);
            p.pixels[pix + 3] = 255;
          }
          x += dx;
        }
        y += dy;
      }
      p.updatePixels();
    },
  },
};
</script>

