<template>
  <div class="computer-graphics-component">
    <div class="top-section">
      <div class="left-section">
        <p class="caption">LEARN ABOUT COMPUTER GRAPHICS</p>
      </div>
      <div class="right-section">
        <button class="start-button" @click="openTest">Take Test</button>
      </div>
    </div>
    <div class="block">
      <div class="background-image">
        <div class="content">
          <h2>FRACTALS</h2>
          <p>
            A fractal curve is, loosely, a mathematical curve whose shape retains the same general pattern of
            irregularity, regardless of how high it is magnified, that is, its graph takes the form of a fractal. Lorem
            ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
            magna aliqua.
          </p>
          <div class="buttons">
            <button class="go-to-lab-button" @click="navigateTo('fractals')">Go to Lab</button>
            <button class="read-more-button" @click="openMoreFractals">Read More</button>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="background-image-color">
        <div class="content">
          <h2>COLOR SCHEME</h2>
          <p>
            A color space is a specific organization of colors. In combination with color profiling supported by various
            physical devices, it supports reproducible representations of color – whether such representation entails an
            analog or a digital representation. A "color space" is a useful conceptual tool for understanding the color
            capabilities of a particular device or digital file.
          </p>
          <div class="buttons">
            <button class="go-to-lab-button" @click="navigateTo('colors')">Go to Lab</button>
            <button class="read-more-button" @click="openMoreColors">Read More</button>
          </div>
        </div>
      </div>
    </div>
    <div class="block">
      <div class="background-image">
        <div class="content">
          <h2>AFFINE TRANSFORMATION</h2>
          <p>
            Affine transformation is a linear mapping method that preserves points, straight lines, and planes. Sets of
            parallel lines remain parallel after an affine transformation. The affine transformation technique is
            typically used to correct for geometric distortions or deformations that occur with non-ideal camera angles.
          </p>
          <div class="buttons">
            <button class="go-to-lab-button" @click="navigateTo('affine')">Go to Lab</button>
            <button class="read-more-button" @click="openMoreAffine">Read More</button>
          </div>
        </div>
      </div>
    </div>
    <div style="display: flex; justify-content: flex-start; width: 100%">
      <v-btn class="btn" variant="flat" color="#D73246" @click="navigateTo('main-page')">&lt;</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
    openTest() {
      window.open("https://play.howstuffworks.com/quiz/fractals-quiz", "_blank");
    },
    openMoreFractals() {
      window.open("https://en.wikipedia.org/wiki/Fractal", "_blank");
    },
    openMoreColors() {
      window.open("https://en.wikipedia.org/wiki/Color_scheme", "_blank");
    },
    openMoreAffine() {
      window.open("https://en.wikipedia.org/wiki/Affine_transformation", "_blank");
    },
  },
};
</script>

<style scoped>
.background-image-color {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 400px;
  background-color: #1f3244;
  background-image: url("../assets/bgAboutC.png");
}
.computer-graphics-component {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 165px;
  background: linear-gradient(0deg, rgba(217, 217, 217, 0) 0%, rgba(215, 50, 70, 0.4) 100%);
}

.top-section {
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
}

.left-section {
  text-align: left;
}

.caption {
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 40px;
  font-weight: bold;
}

.right-section {
  text-align: right;
  padding: 20px 0px;
}

.start-button {
  background-color: #ffffff;
  color: #1f3244;
  font-size: 24px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  width: 190px;
  height: 47px;
}

.block {
  display: flex;
  width: 100%;
  margin-bottom: 65px;
}

.background-image {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 100%;
  min-height: 400px;
  background-color: #1f3244;
  background-image: url("../assets/bgAbout.png");
}

.content {
  color: white;
  padding: 66px 66px 20px 66px;
  flex-grow: 1;
  display: flex;
  min-height: 400px;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 23px;
}

h2 {
  font-size: 20px;
  margin: 0;
}

p {
  font-family: Roboto;
  font-size: 20px;
  margin: 10px 0;
  max-width: 840px;
}
.buttons {
  margin-top: auto; /* Розмістити кнопку внизу блоку */
}
.go-to-lab-button {
  background-color: #ffffff;
  color: #d73246;
  width: 190px;
  max-height: 50px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  margin-right: 24px;
  display: inline-block;
}
.read-more-button {
  background: transparent;
  color: white;
  max-width: 190px;
  max-height: 50px;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  border-radius: 5px;
  margin-top: auto;
  display: inline-block;
}
</style>
