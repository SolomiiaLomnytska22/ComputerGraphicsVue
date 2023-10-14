import FractalsPage from "@/components/FractalsPage";
import MainPage from "@/components/MainPage";
import MandelbrotJulia from "@/components/MandelbrotJulia";
import VicsekFractal from "@/components/VicsekFractal";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", component: MainPage, name: "main-page" },
  { path: "/fractals", component: FractalsPage, name: "fractals", children: [
      { path: "", component: MandelbrotJulia },
      { path: "mandelbrot", component: MandelbrotJulia, name: "mandelbrot" },
      { path: "vicsek", component: VicsekFractal, name: "vicsek" }
  ] },
 

]; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
