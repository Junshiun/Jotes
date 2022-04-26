import HomePage from "../pages/HomePage";
import MainPage from "../pages/MainPage";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "HomePage",
      component: HomePage,
    },
    {
      path: "/main",
      name: "MainPage",
      component: MainPage,
    },
    {
      path: "/:others",
      redirect: "/",
      component: HomePage,
    },
  ],
});
