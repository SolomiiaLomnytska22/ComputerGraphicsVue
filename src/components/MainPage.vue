<template>
  <div>
    <div class="main-content">
      <div class="learn-more-btn" @click="navigateTo('aboutcg')"></div>
      <div class="rectangle"><CardsMainPage></CardsMainPage></div>
    </div>
    <FooterMainPage></FooterMainPage>
  </div>
</template>

<script>
import ArrowBtn from "../assets/ArrowGroup.svg";
import FooterMainPage from "./FooterMainPage.vue";
import CardsMainPage from "./CardsMainPage.vue";
export default {
  components: {
    FooterMainPage,
    CardsMainPage,
  },
  methods: {
    changeImage(newSrc) {
      console.log("please fix me" + newSrc);
      this.imageSrc = newSrc;
    },
    navigateToNextPage() {
      this.$router.push({ name: "next-page" });
    },
    navigateTo(route) {
      this.$router.push({ name: route });
    },
  },
  data() {
    return {
      imageSrc: ArrowBtn,
    };
  },
};
</script>

<style scoped>
.learn-more-btn {
  margin-bottom: 60px;
  cursor: pointer;
  width: 1110px;
  height: 155px;
  background-size: 100% 100%;
  background-image: url("../assets/ArrowGroup.svg");
}

.learn-more-btn:hover {
  background-image: url("../assets/ArrowGroupOnPress.svg");
}
.main-content {
  background: linear-gradient(180deg, rgba(215, 50, 70, 0.4) 0%, rgba(217, 217, 217, 0) 100%);
  padding: 120px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.rectangle {
  width: 1110px;
  height: 575px;
  background-color: #04101a;
}
</style>
