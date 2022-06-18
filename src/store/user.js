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
		async getNewUser(store) {
			const response = await this._vm.$axios.postHandled('/users', {});
			if(response.isError) {
				return response; //TODO HANDLE ERROR AND SUCCESS BETTER
			}

			return new User(response);
        },
		async createAndAssignNewUser(store) {
			store.commit('setUserAccount', {});
			store.commit('setLoadingUserAccount', true);

			const createNewUserResponse = await store.dispatch('getNewUser');
			store.commit('setUserAccount', createNewUserResponse);
			
			store.commit('setLoadingUserAccount', false);

			return createNewUserResponse;
		}
	},
	modules: {},
};
