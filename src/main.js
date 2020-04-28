import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Style from "@/assets/style.css";
import { firestorePlugin } from 'vuefire'

Vue.use(firestorePlugin)
Vue.use(Style);
Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
