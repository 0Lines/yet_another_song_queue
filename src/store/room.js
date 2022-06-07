import { handleAxiosError } from "@/utils/axios"
import Song from "@/models/Song.js"

export default {
	namespaced: true,
	state: {
		id_room: "6c4134e2-eed5-4300-b589-664852144565", //TODO JUST FOR TESTING :D
		songQueue: [],
		playingSong: new Song({}),
	},
	getters: {
		songQueue(state) {
			return state.songQueue;
		},
		currentPlayingSong(state) {
			return state.playingSong;
		}
	},
	mutations: {},
	actions: {
		//TODO SEARCH IF AXIOS CALLS THAT ONLY RETURN THE DATA NEEDS TO BE IN THE STORE AND IN THIS WAY
		async addSongInPlaylist(store, mediaURL) {
			return await this._vm.axios.post('/songs', { search_text: mediaURL, id_room: store.state.id_room }) //TODO API RECEIVES LINK VIA SEARCH_TEXT
				.then((response) => {
					//return new Song(response.data);
					return true; //TODO RETHINK WHAT THIS REQUEST SHOULD DO IF SUCCESS, SINCE SOCKET WILL HANDLE THE SUCCESS
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		},
		async createRoom(store, name) {
			return await this._vm.axios.post('/rooms', { name })
				.then((response) => {
					return response.data;
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		},
		async enterRoom(store, { id_room, id_user }) {
			return await this._vm.axios.put('/enter-room', { id_room, id_user })
				.then((response) => {
					return response.data;
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		}
	},
	modules: {},
};
