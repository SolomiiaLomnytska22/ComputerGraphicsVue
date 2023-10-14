<template>
  <div>
    <canvas ref="fractalCanvas"></canvas>
  </div>
</template>

<script>
export default {
  mounted() {
    const canvas = this.$refs.fractalCanvas;
    const ctx = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 1000;
    
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

    vicsek(500, 500, 500, 1);
  },
};
</script>
