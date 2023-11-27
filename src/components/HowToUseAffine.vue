<template>
  <div>
    <div class="page-heading">
      <h1 class="caption">HOW TO USE THE PROGRAM?</h1>
    </div>
    <div class="background">
      <div class="main-content">
        <div class="description">
          <img
            src="../assets/HowToUseAffine.png"
            alt="Screenshot"
            style="height: 650px; box-shadow: 0px 0px 20px #04101a"
          />
          <div class="text" style="margin: 0 110px">
            <h2>1</h2>
            <p style="margin-bottom: 25px">Enter the coordinates of the diagonals of your square.</p>
            <h2>2</h2>
            <p style="margin-bottom: 25px">Use the scroll bar to scale (increase, decrease) the square.</p>
            <h2>3</h2>
            <p style="margin-bottom: 25px">Use the scroll bar to change the scale of the canvas (grid size).</p>
            <h2>4</h2>
            <p style="margin-bottom: 25px">
              Use the scroll bar to move your square along the X and Y coordinates respectively.
            </p>
            <h2>5</h2>
            <p style="margin-bottom: 25px">
              Select the checkbox according to what you want your square to rotate around.
            </p>
            <h2>6</h2>
            <p style="margin-bottom: 25px">Use the scroll bar to set the rotation angle of your square.</p>
            <h2>7</h2>
            <p style="margin-bottom: 25px">Canvas with grid and your square inside</p>
            <h2>8</h2>
            <p style="margin-bottom: 25px">
              Finally click "Save as file" to save your coordinate system with a square as a picture to your computer
            </p>
          </div>
        </div>
        <v-btn class="btn" style="margin: 75px 0 0 0" variant="flat" color="#D73246" @click="navigateTo('affine')"
          >&lt;</v-btn
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    navigateTo(route) {
      this.$router.push({ name: route });
    },
  },
};
</script>

<style scoped>
@import "./fractals-styles.css";
.description {
  display: flex;
  align-items: center;
  margin-top: 25px;
}
h2 {
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 36px;
  color: #d73246;
}

p {
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  color: white;
}

.learn-more-btn:hover {
  background-image: url("../assets/AboutBtnPressed.svg");
}
.caption {
  color: white;
  font-family: "Roboto", sans-serif;
  font-size: 40px;
  margin: 0;
  font-weight: bold;
}
.page-heading {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 100px 165px 0;
}
.background {
  background-image: url("../assets/background.svg");
}
.main-content {
  background: linear-gradient(0deg, rgba(98, 19, 28, 0.4) 0%, rgba(217, 217, 217, 0) 100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 100px 165px;
}
.fractal-builder {
  width: 100%;
  background-color: #04101a;
  padding: 80px;
  margin: 75px 165px;
}
</style>
