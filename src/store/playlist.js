import Song from "@/models/Song.js"

export default {
	namespaced: true,
	state: {
		songs: [],
		playingSong: {},
	},
	mutations: {},
	actions: {
		async validateAndAddSong(store, param) {
			const videoInfo = await this._vm.axios.post('/video', {url: param.url});
			const video = new Song(videoInfo.data);

			store.state.songs.push(video);
			store.state.playingSong = new Song(videoInfo.data);
		},
		async removeSong(store, param) {
			store.state.songs.splice(param.index, 1);
		},
	},
	modules: {},
};
