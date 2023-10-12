import Vue from "vue";
import VueRouter from "vue-router";
import HeaderMenu from "@/components/HeaderMenu";
import Fractals from "@/components/Fractals";
import ColorSchemes from "@/components/ColorSchemes";
import AffineTransformations from "@/components/AffineTransformations";

Vue.use(VueRouter);

const routes = [
  { path: "/fractals", component: Fractals, name: "fractals" },
  { path: "/color-schemes", component: ColorSchemes, name: "color-schemes" },
  {path: "/affine-transformations",component: AffineTransformations, name: "affine-transformations",},
];

const router = new VueRouter({
  routes,
});

export default router;
