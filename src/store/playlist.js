import axios from 'axios';

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
			const videoInfo = await axios.post('/video', {url: param.url});
			const video = new Song(videoInfo.data);

			store.state.songs.push(video);
			store.state.playingSong = new Song(videoInfo.data);
		},
		loga(store, { state, commit, rootState }) {
			console.log('TA TUDO LOGADO')
		},
	},
	modules: {},
};
