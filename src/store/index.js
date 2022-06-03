import Vue from "vue";
import Vuex from "vuex";

import room from "./room";
import user from "./user"

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		room,
		user
	},
});
