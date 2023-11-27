<template>
  <div class="main-content">
    <div class="page-heading">
      <h1 class="caption">COLOR SCHEMES</h1>
      <a href="https://www.geeksforgeeks.org/difference-between-rgb-cmyk-hsv-and-yiq-color-models/" target="_blank">
        <div class="learn-more-btn"></div>
      </a>
    </div>

    <div class="content">
      <div class="toolbar-btn">
        <div class="buttons">
          <ImageUploader style="margin-right: 10px" @file-selected="handleFileSelected"></ImageUploader>
          <v-btn class="btn" variant="flat" color="#D73246" @click="saveImage"
            >Save
            <svg-icon style="padding-left: 5px; color: #ffffff" type="mdi" :path="mdiContentSaveAll"></svg-icon>
          </v-btn>
          <span class="filename">{{ uploadedFileName }}</span>
        </div>
        <img src="../assets/Icon.svg" alt="Info" @click="navigateTo('how-to-colors')" />
      </div>
      <div class="work-area">
        <div class="picture-container">
          <canvas ref="imageCanvas" alt="Your Image" @mousemove="getPixelColor"></canvas>
          <div class="toolbar">
            <v-btn
              class="btn"
              variant="text"
              color="white"
              @mousedown="buttonPressed = true"
              @mouseup="buttonPressed = false"
            >
              <svg-icon style="color: #ffffff" type="mdi" :path="mdiEyeOff"></svg-icon>
            </v-btn>
            <span class="info"
              ><h3 style="display: inline">HSV:</h3>
              {{ formattedHSV }}
            </span>
            <span class="info"
              ><h3 style="display: inline">CMYK:</h3>
              {{ formattedCMYK }}</span
            >
          </div>
          <canvas v-show="!buttonPressed" ref="newImageCanvas" alt="Your Image" @mousemove="getPixelColor"></canvas>
        </div>
        <div class="input-form" style="height: auto">
          <p class="title">Change the brightness and saturation of the blue color:</p>
          <div class="input-field">
            <label for="brightness">Brightness:</label>
            <input type="range" id="brightness" min="-1" max="1" step="0.01" v-model="brightnessValue" />
          </div>
          <div class="input-field">
            <label for="saturation">Saturation:</label>
            <input type="range" id="saturation" min="-1" max="1" step="0.01" v-model="saturationValue" />
          </div>
          <v-btn class="btn" variant="flat" color="#D73246" @click="adjustSaturationAndBrightness">Apply</v-btn>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: flex-start; width: 100%">
      <v-btn class="btn" variant="flat" color="#D73246" @click="navigateTo('main-page')">&lt;</v-btn>
    </div>
  </div>
</template>

<script>
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiUpload, mdiContentSaveAll, mdiEyeOff } from "@mdi/js";
import ImageUploader from "./ImageUploader.vue";
import { hsvToRgb, rgbToHsv, rgbToCmyk /*, cmykToRgb*/ } from "./ConvertionFunctions";
import { saveAs } from "file-saver";
export default {
  data() {
    return {
      mdiUpload,
      mdiContentSaveAll,
      mdiEyeOff,
      selectedImage: "/PlaceHolder.png",
      uploadedFileName: "",
      saturationValue: 0,
      brightnessValue: 0,
      pixelColor: { rgb: "N/A", cmyk: "N/A", hsv: "N/A" },
      buttonPressed: false,
    };
  },
  computed: {
    formattedHSV() {
      if (this.pixelColor.hsv === "N/A") {
        return this.pixelColor.hsv;
      }
      const roundedValues = this.pixelColor.hsv.map((value) => Math.round(value * 1000) / 1000);
      return roundedValues.join(", ");
    },
    formattedCMYK() {
      if (this.pixelColor.cmyk === "N/A") {
        return this.pixelColor.cmyk;
      }
      const roundedValues = this.pixelColor.cmyk.map((value) => Math.round(value * 1000) / 1000);
      return roundedValues.join(", ");
    },
  },
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    saveImage() {
      const canvas = this.$refs.newImageCanvas;
      canvas.toBlob((blob) => {
        saveAs(blob, this.uploadedFileName);
      });
    },
    handleFileSelected(data) {
      this.selectedImage = data.selectedImage;
      this.uploadedFileName = data.uploadedFileName;

      this.drawImage(this.$refs.imageCanvas);
      this.drawImage(this.$refs.newImageCanvas);

      this.saturationValue = 0;
      this.brightnessValue = 0;
    },
    drawImage(canvas) {
      const context = canvas.getContext("2d");
      const image = new Image();
      image.src = this.selectedImage;
      image.onload = () => {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
      };
    },
    getPixelColor(event) {
      const canvas = this.$refs.imageCanvas;
      const ctx = canvas.getContext("2d");
      const x = event.offsetX;
      const y = event.offsetY;

      const pixelData = ctx.getImageData(x, y, 1, 1).data;
      const r = pixelData[0];
      const g = pixelData[1];
      const b = pixelData[2];

      this.pixelColor = {
        rgb: `rgb(${r}, ${g}, ${b})`,
        cmyk: rgbToCmyk(r, g, b),
        hsv: rgbToHsv(r, g, b),
      };
    },
    adjustSaturationAndBrightness() {
      let pixels;
      const originalCanvas = this.$refs.imageCanvas;
      console.log("Saturation:" + this.saturationValue, " Brightness" + this.brightnessValue);

      pixels = originalCanvas.getContext("2d").getImageData(0, 0, originalCanvas.width, originalCanvas.height).data;

      for (let i = 0; i < originalCanvas.height; ++i) {
        for (let j = 0; j < originalCanvas.width; ++j) {
          let pos = i * originalCanvas.width + j;
          pos *= 4;
          var pixel = {
            r: pixels[pos],
            g: pixels[pos + 1],
            b: pixels[pos + 2],
          };
          var hsv = rgbToHsv(pixel.r, pixel.g, pixel.b);

          if (hsv[0] * 360 > 200 && hsv[0] * 360 < 260) {
            hsv[1] += parseFloat(this.saturationValue);
            hsv[2] += parseFloat(this.brightnessValue);

            var rgb = hsvToRgb(hsv[0], hsv[1], hsv[2]);

            pixels[pos] = rgb[0];
            pixels[pos + 1] = rgb[1];
            pixels[pos + 2] = rgb[2];
          }
        }
      }
      this.$refs.newImageCanvas.getContext("2d").putImageData(new ImageData(pixels, originalCanvas.width), 0, 0);
    },
  },
  components: {
    SvgIcon,
    ImageUploader,
  },
  mounted() {
    this.drawImage(this.$refs.imageCanvas);
    this.drawImage(this.$refs.newImageCanvas);
  },
};
</script>

<style scoped>
@import "./fractals-styles.css";

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
canvas:hover {
  cursor: pointer;
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
.info {
  padding: 0px 5px;
  margin: 0;
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
.content {
  width: 100%;
  background-color: #04101a;
  padding: 80px;
  margin: 75px 165px;
}

.work-area {
  display: flex;
  flex-direction: row;
  margin-top: 50px;
  justify-content: space-between;
}

.picture-container {
  height: 375px;
  width: 575px;
  background-color: #1f3244;
  border-radius: 5px;
}

.picture-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: stretch;
  position: relative;
  overflow: hidden;
}

.picture-container canvas {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.toolbar {
  background: rgba(4, 16, 26, 0.5);
  color: white;
  padding: 10px;
  z-index: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.filename {
  color: #ffffff;
  margin-left: 10px;
}
</style>
