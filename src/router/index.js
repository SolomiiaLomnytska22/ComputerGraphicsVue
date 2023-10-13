import FractalsPage from "@/components/FractalsPage";
import MainPage from "@/components/MainPage";
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: "/", component: MainPage, name: "main-page" },
  { path: "/fractals", component: FractalsPage, name: "fractals" },

]; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router;
