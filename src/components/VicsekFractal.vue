<template>
  <div class = "fractal-container">
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
    <canvas ref="fractalCanvas" id="fractal"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const canvas = this.$refs.fractalCanvas;
    const ctx = canvas.getContext("2d");
    canvas.width = 600;
    canvas.height = 740;
    
    function drawCross(x, y, length) {
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
      ctx.fillStyle = "dark";
      ctx.fill();

      // Draw a square on top
      const squareSize = length / 3;
      ctx.beginPath();
      ctx.moveTo(x - squareSize / 2, y - length / 6 - squareSize); // Adjusted y-coordinate
      ctx.lineTo(x + squareSize / 2, y - length / 6 - squareSize); // Adjusted y-coordinate
      ctx.lineTo(x + squareSize / 2, y - length / 6);
      ctx.lineTo(x - squareSize / 2, y - length / 6);
      ctx.closePath();
      ctx.fillStyle = "dark";
      ctx.fill();
    }

    function vicsek(x, y, length, n) {
      if (n === 0) {
        drawCross(x, y, length);
        return;
      }

      vicsek(x, y, length / 3, n - 1);
      vicsek(x + length / 3, y, length / 3, n - 1);
      vicsek(x - length / 3, y, length / 3, n - 1);
      vicsek(x, y + length / 3, length / 3, n - 1);
      vicsek(x, y - length / 3, length / 3, n - 1);
    }

    vicsek(300, 300, 300, 1);
  },
};
</script>

<style scoped>

  #fractal{
    max-width: 600px;
    border-radius: 5px;
    background-color: white;
  }
  .fractal-container
  {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 55px 0;
  }

  
</style>
