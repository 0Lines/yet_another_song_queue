import User from "@/models/User";

export default {
	namespaced: true,
	state: {
		loadingUserAccount: false,
		account: new User({}),
	},
	getters: {
		userAccount(state) {
			return state.account;
		}
	},
	mutations: {
		setUserAccount(state, user) {
			state.account = user;
		},
		setLoadingUserAccount(state, value) {
			state.loadingUserAccount = value;
		}
	},
	actions: {
		async createAndAssignNewUser(store) {
			store.commit('setUserAccount', {});
			store.commit('setLoadingUserAccount', true);

			let newUser = await this._vm.$axios.postHandled('/users', {});
			if(!newUser.isError)
				newUser = new User(newUser);

			store.commit('setUserAccount', newUser);
			store.commit('setLoadingUserAccount', false);

			return newUser;
		}
	},
	modules: {},
};
