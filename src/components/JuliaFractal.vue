<template>
  <div class="fractal-container">
    <div class="input-form">
      <div class="input-field">
        <label for="ca">ca:</label>
        <input type="number" id="ca" v-model="ca" step="0.01" min="-1" max="1"/>
      </div>
      <div class="input-field">
        <label for="cb">cb:</label>
        <input type="number" id="cb" v-model="cb" step="0.01"  min="-1" max="1"/>
      </div>
      <div class="input-field">
        <label for="iterations">Iterations:</label>
        <input type="number" id="iterations" v-model="maxIterations" step="1" />
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
    <canvas ref="fractalCanvas"></canvas>
   
  </div>
  
</template>

<script>
export default {
  data() {
    return {
      maxIterations: 100,
      zoom: 4,
      ca: -0.1,
      cb: -0.8,
      color: "#ff0000",
    };
  },
  mounted() {
    this.setup();
    this.draw();
  },
  methods: {
    setup() {
      const canvas = this.$refs.fractalCanvas;
      canvas.width = 600;
      canvas.height = 740;
    },
    draw() {
      console.log(this.zoom);
      const canvas = this.$refs.fractalCanvas;
      const ctx = canvas.getContext("2d");

      const w = this.zoom;
      const h = (w * canvas.height) / canvas.width;
      const xmin = -w / 2;
      const ymin = -h / 2;

      const xmax = xmin + w;
      const ymax = ymin + h;

      const dx = (xmax - xmin) / canvas.width;
      const dy = (ymax - ymin) / canvas.height;

      let y = ymin;
      for (let j = 0; j < canvas.height; j++) {
        let x = xmin;
        for (let i = 0; i < canvas.width; i++) {
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

          if (n === this.maxIterations) {
            ctx.fillStyle = `rgba(${255}, ${182}, ${193}, ${255})`;
          } else {
            let hu = ((n / this.maxIterations) * 360) % 360;
            let c = this.calculateColor(hu, 100, Math.pow(n / this.maxIterations, 0.25) * 100);
            ctx.fillStyle = `rgba(${red(c)}, ${red(c)}, ${blue(c)}, 1)`;
          }
          x += dx;
        }
        y += dy;
      }
    },
  },
};
</script>

<style>

  #fractal{
    max-width: 600px;
  }
  .fractal-container
  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 55px 0;
  }

  .input-form{
    background-color: #1F3244;
    width: 255px;
    height: 740px;
    
  }
</style>
