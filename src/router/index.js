import FractalsPage from "@/components/FractalsPage";
import MainPage from "@/components/MainPage";
import MandelbrotFracatal from "@/components/MandelbrotFracatal";
import VicsekFractal from "@/components/VicsekFractal";
import JuliaFractal from "@/components/JuliaFractal";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", component: MainPage, name: "main-page" },
  { path: "/fractals", component: FractalsPage, name: "fractals", children: [
      { path: "", component: MandelbrotFracatal },
      { path: "mandelbrot", component: MandelbrotFracatal, name: "mandelbrot" },
      { path: "vicsek", component: VicsekFractal, name: "vicsek" },
      { path: "julia", component: JuliaFractal, name: "julia" }
  ] },
 

]; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
