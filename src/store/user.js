import User from "../models/User";

export default {
	namespaced: true,
	state: {
		logged: {},
	},
	mutations: {},
	actions: {
		async createUser(store, param) {
			await this._vm.axios
			.post('/create/user', {})
			.then((response) => {
				store.state.logged = new User(response.data);
			})
			.catch(() => { 
				console.log('insert snackbar error')
			})
        },
	},
	modules: {},
};
