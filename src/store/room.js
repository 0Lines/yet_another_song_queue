import Song from "@/models/Song.js";
import Room from "@/models/Room.js";
import User from "@/models/User.js";

export default {
	namespaced: true,
	state: {
		pageError: null, //TODO REMOVE THIS AND ITS USAGE PLSSSSS

		loadingRoomInfo: false,
		roomInfo: new Room({}),

		loadingParticipants: false,
		participants: [],

		loadingPlaylist: false,
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
			state.loadingRoomInfo = value;
		}
	},
	actions: {
		async addSongInPlaylist(store, mediaURL) {
			const response = await this._vm.$axios.postHandled('/songs', {
				search_text: mediaURL,	//API RECEIVES LINK VIA SEARCH_TEXT
				id_room: store.state.roomInfo.id_room
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
		async enterRoom(store, id_room) {
			store.state.loadingRoomInfo = true;

			let currentUser = store.rootGetters['user/userAccount'];
			if(!currentUser.id_user)
				currentUser = await store.dispatch('user/createAndAssignNewUser', null, {root: true});

			if(currentUser.isError) {
				this.pageError = currentUser;
				return false;
			}

			const response = await this._vm.$axios.putHandled('/enter-room', { id_room, id_user: currentUser.id_user });
			if(response.isError) {
				store.state.pageError = response;
			} else {
				store.state.roomInfo = new Room(response);

				store.dispatch('subscribeToRoom');
				store.dispatch('getPlaylist', id_room);
				store.dispatch('getRoomParticipants', id_room);
			}

			store.state.loadingRoomInfo = false;
			return !response.isError;
		},
        subscribeToRoom(store) { 
            console.log('Subscribing to room', store.state.roomInfo.id_room);
            this._vm.$socket.emit('subscribeToRoom', store.state.roomInfo.id_room);
        },
		async getRoomParticipants(store, id_room) {
			store.state.loadingParticipants = true;

			const response = await this._vm.$axios.getHandled('/rooms/participants/', id_room);
			if(response.isError) {
				store.state.participants = response;
			} else {
				store.state.participants = response.map(user => new User(user));
			}

			store.state.loadingParticipants = false;
			return !response.isError;
		},
		async getPlaylist(store, id_room) {
			store.state.loadingPlaylist = true;

			const response = await this._vm.$axios.getHandled('/songs/', id_room);
			if(response.isError) {
				store.state.playlist = response;
			} else {
				store.state.playlist = response.map(song => new Song(song));
				store.state.playingSong = new Song(store.state.playlist.shift() ?? {});
			}

			store.state.loadingPlaylist = false;
			return !response.isError;
		},
	},
	modules: {},
};
