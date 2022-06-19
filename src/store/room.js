import Song from "@/models/Song.js";
import Room from "@/models/Room.js";
import User from "@/models/User.js";

export default {
	namespaced: true,
	state: {
		loadingRoom: false,
		room: new Room({}),
		participants: [],
		playingSong: new Song({}),
		playlist: [],
	},
	getters: {
		playlist(state) {
			return state.playlist;
		},
		currentPlayingSong(state) {
			return state.playingSong;
		}
	},
	mutations: {
		setLoadingRoom(state, value) {
			state.loadingRoom = value;
		}
	},
	actions: {
		async addSongInPlaylist(store, mediaURL) {
			const response = await this._vm.$axios.postHandled('/songs', {
				search_text: mediaURL,	//API RECEIVES LINK VIA SEARCH_TEXT
				id_room: store.state.room.id_room
			});

			//BUSINESS RULES ARE ALLOWED HERE =)
			return response;
		},
        async removeSongInPlaylist(store, { id_song, id_room }) { 
			const response = await this._vm.$axios.deleteHandled('/songs', { id_song, id_room });
			//BUSINESS RULES ARE ALLOWED HERE =)
			return response;
        },
		async createRoom(store, name) {
			const response = await this._vm.$axios.postHandled('/rooms', { name });
			//BUSINESS RULES ARE ALLOWED HERE =)
			return response;
		},
		async enterRoom(store, { id_room, id_user }) {
			const response = await this._vm.$axios.putHandled('/enter-room', { id_room, id_user });
			if(response.isError) {
				store.state.room = response;
				return response; //TODO HANDLE ERROR AND SUCCESS BETTER
			}

			store.state.room = new Room(response);
			store.dispatch('subscribeToRoom');
			store.dispatch('getPlaylist', id_room);
			store.dispatch('getRoomParticipants', id_room);
			return response;
		},
        subscribeToRoom(store) { 
            console.log('Subscribing to room', store.state.room.id_room);
            this._vm.$socket.emit('subscribeToRoom', store.state.room.id_room);
        },
		async getRoomParticipants(store, id_room) {
			const response = await this._vm.$axios.getHandled('/rooms/participants/', id_room);
			if(response.isError) { //TODO HANDLE ERROR AND SUCCESS BETTER
				return false;
			}

			store.state.participants = response.map(user => new User(user));
			return true;
		},
		async getPlaylist(store, id_room) {
			const response = await this._vm.$axios.getHandled('/songs/', id_room);
			if(response.isError) { //TODO HANDLE ERROR AND SUCCESS BETTER
				return false;
			}

			store.state.playlist = response.map(song => new Song(song));
			store.state.playingSong = store.state.playlist.shift();
			return true;
		},
	},
	modules: {},
};
