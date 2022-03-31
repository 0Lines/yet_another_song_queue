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
            await this._vm.axios
            .post('/video', { url: param.url })
            .then((response) => {
                const video = new Song(response.data)
                store.state.songs.push(video)
                store.state.playingSong = video
            })
            .catch(() => { 
                 console.log('insert snackbar error')
            })
		},
		async removeSong(store, param) {
			store.state.songs.splice(param.index, 1)
		},
	},
	modules: {},
};
