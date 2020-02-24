import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Style from "@/assets/style.css";
import axios from "axios";
import './firebase'
import {rtdbPlugin} from 'vuefire'
Vue.use(rtdbPlugin);
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;
Vue.use(Style);


new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
