<template>
  <div class="main-content">
    <div class="page-heading">
      <h1 class="caption">AFFINE TRANFORMATIONS</h1>
      <a href="https://en.wikipedia.org/wiki/Affine_transformation" target="_blank"
        ><div class="learn-more-btn"></div
      ></a>
    </div>
    <div class="content">
      <div class="toolbar-btn">
        <div class="buttons">
          <v-btn class="btn" style="width: 255px" variant="flat" color="#D73246" @click="saveImage">
            Save As File
            <svg-icon style="padding-left: 5px; color: #ffffff" type="mdi" :path="mdiContentSaveAll"></svg-icon>
          </v-btn>
        </div>
        <img src="../assets/Icon.svg" alt="Info" @click="navigateTo('how-to-affine')" />
      </div>
      <div class="work-area">
        <div class="input-form" style="height: auto">
          <div class="input-field">
            <label>Coordinates of diagonal end points:</label>
            <div class="coords">
              <label class="sub-label" for="X1">X1:</label>
              <input
                class="coordiante-input"
                type="number"
                id="X1"
                step="1"
                v-model="SquareDiagonalX1"
                @input="
                  () => {
                    SquareDiagonalY1 = SquareDiagonalX1;
                    redrawSquare();
                  }
                "
              />
              <label class="sub-label" for="Y1">Y1:</label>
              <input
                class="coordiante-input"
                type="number"
                id="Y1"
                step="1"
                v-model="SquareDiagonalY1"
                @input="
                  () => {
                    SquareDiagonalX1 = SquareDiagonalY1;
                    redrawSquare();
                  }
                "
              />
            </div>
            <div class="coords">
              <label class="sub-label" for="X2">X2:</label>
              <input
                class="coordiante-input"
                type="number"
                id="X2"
                step="1"
                v-model="SquareDiagonalX2"
                @input="
                  () => {
                    SquareDiagonalY2 = SquareDiagonalX2;
                    redrawSquare();
                  }
                "
              />
              <label class="sub-label" for="Y2">Y2:</label>
              <input
                class="coordiante-input"
                type="number"
                id="Y2"
                step="1"
                v-model="SquareDiagonalY2"
                @input="
                  () => {
                    SquareDiagonalX2 = SquareDiagonalY2;
                    redrawSquare();
                  }
                "
              />
            </div>
          </div>

          <div class="input-field">
            <label for="scale">Change rectangle size:</label>
            <input type="range" id="scale" min="1" max="5" step="0.1" v-model="sizeScale" @input="redrawSquare" />
          </div>
          <div class="input-field">
            <label for="scale">Change canvas scaling:</label>
            <input type="range" id="scale" min="0.4" max="3" step="0.2" v-model="gridScale" @input="redrawSquare" />
          </div>
          <div class="input-field">
            <label>Move your rectangle:</label>
            <label class="sub-label" for="translationX">Move across X:</label>
            <input
              type="range"
              id="translationX"
              :min="minX"
              :max="maxX"
              step="0.1"
              v-model="translationX"
              @input="redrawSquare"
            />
            <label class="sub-label" for="translationY">Move across Y:</label>
            <input
              type="range"
              id="translationY"
              :min="minY"
              :max="maxY"
              step="0.1"
              v-model="translationY"
              @input="redrawSquare"
            />
          </div>
          <div class="input-field">
            <label>Rotation:</label>
            <label class="sub-label" v-for="checkbox in checkboxes" :key="checkbox.id">
              <input type="checkbox" @input="handleCheckbox(checkbox.id)" :checked="checkbox.checked" />
              {{ checkbox.caption }}
            </label>
            <label class="sub-label" style="padding-top: 15px" for="angle">Enter rotation angle:</label>
            <input type="range" id="angle" :min="0" :max="360" step="0.1" v-model="angle" @input="redrawSquare" />
          </div>
        </div>
        <div class="picture-container">
          <canvas ref="canvasAffineTransform" width="600" height="850" alt="Affine trasformation canvas"></canvas>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: flex-start; width: 100%">
      <v-btn class="btn" variant="flat" color="#D73246" @click="navigateTo('main-page')">&lt;</v-btn>
    </div>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import {
  drawXAxisTicks,
  drawNegativeXAxisTicks,
  drawYAxisTicks,
  drawNegativeYAxisTicks,
  getCoordinatsOfPoint,
  applyTranslationOnArray,
  applyScale,
  applyAngle,
} from "./AffineTransformationFunctions.js";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiContentSaveAll } from "@mdi/js";
export default {
  data() {
    return {
      mdiContentSaveAll,
      uploadedFileName: "AffineTransformationImage.png",
      minX: -10,
      maxX: 10,
      minY: -10,
      maxY: 10,
      SquareDiagonalX1: 0,
      SquareDiagonalY1: 0,
      SquareDiagonalX2: 2,
      SquareDiagonalY2: 2,
      sizeScale: 1,
      gridScale: 1,
      grid_size: 20,
      x_axis_distance_grid_lines: 20,
      y_axis_distance_grid_lines: 15,
      x_axis_starting_point: { number: 1, suffix: "" },
      y_axis_starting_point: { number: 1, suffix: "" },
      rectangleArray: [[], [], [], []],
      translationX: 0,
      translationY: 0,
      angle: 0,
      checkboxes: [
        { id: 1, caption: "Rotate relatively to (0,0)", checked: false },
        { id: 2, caption: "Rotate relatively to bottom left corner", checked: false },
        { id: 3, caption: "Rotate relatively to top left corner", checked: false },
        { id: 4, caption: "Rotate relatively to top right corner", checked: false },
        { id: 5, caption: "Rotate relatively to bottom right corner", checked: false },
      ],
      selectedCheckbox: null,
    };
  },
  components: {
    SvgIcon,
  },
  methods: {
    saveImage() {
      const canvas = this.$refs.canvasAffineTransform;
      canvas.toBlob((blob) => {
        saveAs(blob, this.uploadedFileName);
      });
    },
    redrawCoordinates() {
      const canvas = this.$refs.canvasAffineTransform;
      var ctx = canvas.getContext("2d");

      console.log(canvas.width, canvas.height);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      var num_lines_x = Math.floor(canvas.height / (this.grid_size / this.gridScale));
      var num_lines_y = Math.floor(canvas.width / (this.grid_size / this.gridScale));
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#000000";
      // Draw grid lines along X-axis
      for (var i = 0; i <= num_lines_x; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        if (i == this.x_axis_distance_grid_lines * this.gridScale) ctx.strokeStyle = "#000000";
        else ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_x) {
          ctx.moveTo(0, (this.grid_size / this.gridScale) * i);
          ctx.lineTo(canvas.width, (this.grid_size / this.gridScale) * i);
        } else {
          ctx.moveTo(0, (this.grid_size / this.gridScale) * i + 0.5);
          ctx.lineTo(canvas.width, (this.grid_size / this.gridScale) * i + 0.5);
        }
        ctx.stroke();
      }

      // Draw grid lines along Y-axis
      for (i = 0; i <= num_lines_y; i++) {
        ctx.beginPath();
        ctx.lineWidth = 1;
        if (i == this.y_axis_distance_grid_lines * this.gridScale) ctx.strokeStyle = "#000000";
        else ctx.strokeStyle = "#e9e9e9";

        if (i == num_lines_y) {
          ctx.moveTo((this.grid_size / this.gridScale) * i, 0);
          ctx.lineTo((this.grid_size / this.gridScale) * i, canvas.height);
        } else {
          ctx.moveTo((this.grid_size / this.gridScale) * i + 0.5, 0);
          ctx.lineTo((this.grid_size / this.gridScale) * i + 0.5, canvas.height);
        }
        ctx.stroke();
      }

      ctx.translate(
        this.y_axis_distance_grid_lines * this.gridScale * (this.grid_size / this.gridScale),
        this.x_axis_distance_grid_lines * this.gridScale * (this.grid_size / this.gridScale)
      );
      drawXAxisTicks(
        ctx,
        this.grid_size,
        this.gridScale,
        this.x_axis_starting_point,
        num_lines_y,
        this.y_axis_distance_grid_lines
      );
      drawNegativeXAxisTicks(
        ctx,
        this.grid_size,
        this.gridScale,
        this.x_axis_starting_point,
        this.y_axis_distance_grid_lines
      );
      drawYAxisTicks(
        ctx,
        this.grid_size,
        this.gridScale,
        this.y_axis_starting_point,
        num_lines_x,
        this.x_axis_distance_grid_lines
      );
      drawNegativeYAxisTicks(
        ctx,
        this.grid_size,
        this.gridScale,
        this.y_axis_starting_point,
        this.x_axis_distance_grid_lines
      );
    },

    drawRectangleArray(color) {
      const canvas = this.$refs.canvasAffineTransform;
      var ctx = canvas.getContext("2d");
      ctx.beginPath();
      ctx.moveTo(
        (this.rectangleArray[0][0] / this.x_axis_starting_point.number) * (this.grid_size / this.gridScale),
        (-this.rectangleArray[0][1] / this.y_axis_starting_point.number) * (this.grid_size / this.gridScale)
      );
      for (let i = 1; i < this.rectangleArray.length; i++) {
        ctx.lineTo(
          (this.rectangleArray[i][0] / this.x_axis_starting_point.number) * (this.grid_size / this.gridScale),
          (-this.rectangleArray[i][1] / this.y_axis_starting_point.number) * (this.grid_size / this.gridScale)
        );
      }
      ctx.closePath();
      ctx.strokeStyle = color;
      ctx.stroke();
    },
    redrawSquare() {
      this.rectangleArray = getCoordinatsOfPoint(
        this.SquareDiagonalX1,
        this.SquareDiagonalY1,
        this.SquareDiagonalX2,
        this.SquareDiagonalY2
      );
      this.redrawCoordinates();
      this.rectangleArray = applyScale(this.rectangleArray, Number.parseFloat(this.sizeScale));
      this.resizeScrollBars();
      applyTranslationOnArray(
        this.rectangleArray,
        Number.parseFloat(this.translationX),
        Number.parseFloat(this.translationY)
      );
      this.rectangleArray = applyAngle(
        this.rectangleArray,
        Number.parseFloat(this.angle),
        this.selectedCheckbox !== null ? this.selectedCheckbox.id : 1
      );
      this.drawRectangleArray("#d73246");
    },
    resizeScrollBars() {
      this.minX = -(this.y_axis_distance_grid_lines * this.gridScale + this.rectangleArray[0][0]);
      this.maxX = this.y_axis_distance_grid_lines * this.gridScale - this.rectangleArray[2][0];
      this.minY = -(this.x_axis_distance_grid_lines * this.gridScale + this.rectangleArray[0][1]);
      this.maxY = this.x_axis_distance_grid_lines * this.gridScale - this.rectangleArray[2][1];
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    handleCheckbox(id) {
      var chk = this.checkboxes.find((item) => item.id === id);
      if (chk.checked === false) {
        this.selectedCheckbox = chk;
        chk.checked = true;
        this.checkboxes.forEach((checkbox) => {
          if (checkbox.id !== id) {
            checkbox.checked = false;
          }
        });
      } else {
        this.selectedCheckbox = null;
        chk.checked = false;
      }
      console.log(this.selectedCheckbox);
    },
  },
  mounted() {
    this.redrawCoordinates();
    this.rectangleArray = getCoordinatsOfPoint(
      this.SquareDiagonalX1,
      this.SquareDiagonalY1,
      this.SquareDiagonalX2,
      this.SquareDiagonalY2
    );
    this.drawRectangleArray("#d73246");
  },
};
</script>

<style scoped>
.coords {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.coordiante-input {
  width: 30%;
  margin: 10px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 250px;
}
.toolbar-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px;
}
.learn-more-btn {
  cursor: pointer;
  height: 65px;
  width: 415px;
  background-size: 100% 100%;
  background-image: url("../assets/AboutBtn.svg");
}

.learn-more-btn:hover {
  background-image: url("../assets/AboutBtnPressed.svg");
}
.content {
  width: 100%;
  background-color: #04101a;
  padding: 80px;
  margin: 75px 165px;
}

.work-area {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 50px;
  justify-content: space-between;
}

.caption {
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 40px;
  margin: 0;
  font-weight: bold;
}
.title {
  color: white;
  font-size: 18px;
  padding-bottom: 30px;
  font-weight: 600;
}
.page-heading {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.main-content {
  background: linear-gradient(0deg, rgba(215, 50, 70, 0.4) 0%, rgba(217, 217, 217, 0) 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 165px;
}

.picture-container {
  height: 868px;
  background-color: #ffffff;
  border-radius: 5px;
}

.sub-label {
  font-size: small;
  color: #c4b2b2;
}
canvas {
  object-fit: contain;
  border-radius: 5px;
  background-color: #ffffff;
}

input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 15px;
  height: 15px;
  border: 2px solid #d73246;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
}

input[type="checkbox"]:checked::before {
  content: "\2714";
  display: block;
  width: 15px;
  height: 15px;
  text-align: center;
  line-height: 15px;
  font-size: 21px;
  color: #fff;
}
</style>
