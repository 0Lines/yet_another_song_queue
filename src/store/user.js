import User from "@/models/User";
import { handleAxiosError } from "@/utils/axios";

export default {
	namespaced: true,
	state: {
		loadingUserAccount: false,
		account: {},
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
			return await this._vm.axios.post('/users', {})
			.then((response) => {
				return new User(response.data);
			})
			.catch((error) => { 
				return handleAxiosError(error);
			})
        },
		async createAndAssignNewUser(store) {
			store.commit('setLoadingUserAccount', true);

			const createNewUserResponse = await store.dispatch('getNewUser');
			store.commit('setUserAccount', createNewUserResponse);
			
			store.commit('setLoadingUserAccount', false);

			return createNewUserResponse;
		}
	},
	modules: {},
};
