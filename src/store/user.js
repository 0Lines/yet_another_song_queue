import User from "@/models/User";
import { handleAxiosError } from "@/utils/axios";

export default {
	namespaced: true,
	state: {
		loading: false,
		account: {},
	},
	mutations: {
		setLoading(state, value) {
			state.loading = value;
		}
	},
	actions: {
		async getNewUser(store) {
			return await this._vm.axios
			.post('/users', {})
			.then((response) => {
				return new User(response.data);
			})
			.catch((error) => { 
				return handleAxiosError(error);
			})
        },
	},
	modules: {},
};
