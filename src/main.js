import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios';

Vue.config.productionTip = false;

Vue.prototype.axios = axios.create({
  baseURL: process.env.VUE_APP_API_URI
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");
