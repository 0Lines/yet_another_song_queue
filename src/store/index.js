import Vue from "vue";
import Vuex from "vuex";

import playlist from "./playlist";
import user from "./user"

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: {
		playlist,
		user
	},
});
