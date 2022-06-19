import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import axios from 'axios';
import { registerErrorHandledApiCallsOnAxios } from "@/utils/axios";
import { io } from "socket.io-client";
import VueYoutube from 'vue-youtube'

const socket = io(process.env.VUE_APP_SOCKET_URI);

Vue.config.productionTip = false;

Vue.prototype.$socket = socket;

const axiosInstance = axios.create({ baseURL: process.env.VUE_APP_API_URI });
registerErrorHandledApiCallsOnAxios(axiosInstance);
Vue.prototype.$axios = axiosInstance;

Vue.prototype.$isMobile = navigator.userAgentData.mobile;

Vue.use(VueYoutube);

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount("#app");
