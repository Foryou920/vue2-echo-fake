import Vue from "vue";
import VueRouter from "vue-router";

// import Home from "@/pages/index.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    // component: Home
    component: () => import("@/pages/index.vue")
  },
  {
    path: "/detail",
    name: "detail",
    component: () => import("@/pages/detail.vue")
  }
];

const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});

export default router;
