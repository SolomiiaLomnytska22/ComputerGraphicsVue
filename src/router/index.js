import FractalsPage from "@/components/FractalsPage";
import MainPage from "@/components/MainPage";
import MandelbrotFracatal from "@/components/MandelbrotFracatal";
import VicsekFractal from "@/components/VicsekFractal";
import HowToUseFractals from "@/components/HowToUseFractals";
import ColorsPage from "@/components/ColorsPage";
import AboutCG from "@/components/AboutCG";
import AffineTransformation from "@/components/AffineTransformation"

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", component: MainPage, name: "main-page" },
  {
    path: "/fractals",
    component: FractalsPage,
    name: "fractals",
    children: [
      { path: "", component: MandelbrotFracatal },
      { path: "mandelbrot", component: MandelbrotFracatal, name: "mandelbrot" },
      { path: "vicsek", component: VicsekFractal, name: "vicsek" },
    ],
  },
  { path: "/how-to-use-fractal-builder", component: HowToUseFractals, name: "how-to-fractals" },
  { path: "/colors", component: ColorsPage, name: "colors" },
  { path: "/aboutcg", component: AboutCG, name: "aboutcg" },
  { path: "/affine", component: AffineTransformation, name: "affine"}
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
