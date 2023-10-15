<template>
  <div class = "fractal-container">
    <div class="input-form">
      <div class="input-field">
        <label for="iterations">Iterations:</label>
        <input type="number" id="iterations"  v-model="maxIterations" step="1" />
      </div>
      <div class="input-field">
        <label for="color">Color:</label>
        <input type="color" id="color" v-model="color"/>
      </div>
      <v-btn class="btn" variant="flat" background-color = "white" color="#D73246" @click="draw">Build Fractal</v-btn>
    </div>
    <canvas ref="fractalCanvas" id="fractal"></canvas>
  </div>
</template>

<script>
export default {
  data() {
    return {
      maxIterations: 2,
      color: "#04101A",
      p5Instance: null,
    };
  },
  mounted() {
    this.draw();
  },
  methods:{
    draw(){
      const canvas = this.$refs.fractalCanvas;
      const ctx = canvas.getContext("2d");
      canvas.width = 600;
      canvas.height = 740;
    
    function drawCross(x, y, length, color) {
      ctx.beginPath();
      ctx.moveTo(x - length / 2, y - length / 6);
      ctx.lineTo(x + length / 2, y - length / 6);
      ctx.lineTo(x + length / 2, y + length / 6);
      ctx.lineTo(x + length / 6, y + length / 6);
      ctx.lineTo(x + length / 6, y + length / 2);
      ctx.lineTo(x - length / 6, y + length / 2);
      ctx.lineTo(x - length / 6, y + length / 6);
      ctx.lineTo(x - length / 2, y + length / 6);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();

      const squareSize = length / 3;
      ctx.beginPath();
      ctx.moveTo(x - squareSize / 2, y - length / 6 - squareSize); 
      ctx.lineTo(x + squareSize / 2, y - length / 6 - squareSize); 
      ctx.lineTo(x + squareSize / 2, y - length / 6);
      ctx.lineTo(x - squareSize / 2, y - length / 6);
      ctx.closePath();
      ctx.fillStyle = color;
      ctx.fill();
    }

    function vicsek(x, y, length, n, color) {
      if (n === 0) {
        drawCross(x, y, length, color);
        return;
      }

      vicsek(x, y, length / 3, n - 1, color);
      vicsek(x + length / 3, y, length / 3, n - 1, color);
      vicsek(x - length / 3, y, length / 3, n - 1, color);
      vicsek(x, y + length / 3, length / 3, n - 1, color);
      vicsek(x, y - length / 3, length / 3, n - 1, color);
    }

    vicsek(300, 370, 550, this.maxIterations, this.color);
    }
  }
};
</script>

