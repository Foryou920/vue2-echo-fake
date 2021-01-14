import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import store from "@/store";

import fastclick from "fastclick";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/css/swiper.css";

import "@/assets";
import "@/mock";
import "@/filters";

Vue.config.productionTip = false;
fastclick.attach(document.body);
Vue.use(VueAwesomeSwiper);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
