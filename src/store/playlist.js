import { handleAxiosError } from "@/utils/axios"
import Song from "@/models/Song.js"

export default {
	namespaced: true,
	state: {
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
		//TODO SEARCH IF AXIOS CALLS THAT ONLY RETURN THE DATA NEEDS TO BE IN THE STORE
		//REMEMBER THAT THIS FUNCTION ONLY GETS YOUTUBE MEDIA INFORMATION
		async getMediaInformationFromURL(store, mediaURL) {
			return await this._vm.axios.post('/video', { url: mediaURL })
				.then((response) => {
					return new Song(response.data);
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		},
		async addSongToQueue(store, song) {
			store.state.songQueue.push(song);
			store.state.playingSong = song;
		},
		async removeSong(store, songIndex) {
			store.state.songQueue.splice(songIndex, 1)
		},
	},
	modules: {},
};
