import Song from "@/models/Song.js";
import Room from "@/models/Room.js";
import User from "@/models/User.js";

export default {
	namespaced: true,
	state: {
		pageError: null, //TODO REMOVE THIS AND ITS USAGE PLSSSSS

		loadingRoomInfo: false,
		roomInfo: new Room({}),
		isPlaying: false,
		startFrom: 0,

		loadingParticipants: false,
		participants: [],

		loadingPlaylist: false,
		playlist: [],
		playingSong: new Song({}),
	},
	getters: {
		playlist(state) {
			return state.playlist;
		},
		currentPlayingSong(state) {
			return state.playingSong;
		},
		roomInfo(state) {
			return state.roomInfo;
		},
		isPlaying(state) {
			return state.isPlaying;
		}
	},
	mutations: {},
	actions: {
        play(store) {
            store.state.isPlaying = true;
        },
        pause(store) {
            store.state.isPlaying = false;
        },
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
			store.state.pageError = null;

			let currentUser = store.rootGetters['user/userAccount'];
			if(!currentUser.id_user)
				currentUser = await store.dispatch('user/createAndAssignNewUser', null, {root: true});

			if(currentUser.isError) {
				store.state.pageError = currentUser;
			} else {
				const response = await this._vm.$axios.putHandled('/enter-room', { id_room, id_user: currentUser.id_user });
				
				if(response.isError) {
					store.state.pageError = response;
				} else {
					store.state.roomInfo = new Room(response);

					store.dispatch('subscribeToRoom');
					store.dispatch('getPlaylist', id_room);
					store.dispatch('getRoomParticipants', id_room);
				}
			}

			store.state.loadingRoomInfo = false;
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
		},
		async getPlaylist(store, id_room) {
			store.state.loadingPlaylist = true;

			const response = await this._vm.$axios.getHandled('/songs/', id_room);
			if(response.isError) {
				store.state.playlist = response;
			} else {
				store.state.playlist = response.map(song => new Song(song));
                this._vm.$socket.emit('getCurrentSong', store.state.roomInfo.id_room);
			}

			store.state.loadingPlaylist = false;
		},
        subscribeToRoom(store) { 
            console.log('Subscribing to room', store.state.roomInfo.id_room);
            this._vm.$socket.emit('subscribeToRoom', store.state.roomInfo.id_room);
            this._vm.$socket.emit('getCurrentState', store.state.roomInfo.id_room);
        },
		previousSong(store) {
			const currentSongIndex = store.state.playlist.findIndex((song) => {
                return song.id_song == store.state.playingSong.id_song;
            });
            const previousSong = store.state.playlist.find((song) => {
                return song.priority == currentSongIndex - 1;
            });

            if (previousSong)
                store.dispatch('requestSongChange', previousSong.id_song);
        },
        nextSong(store) {
			const currentSongIndex = store.state.playlist.findIndex((song) => {
                return song.id_song == store.state.playingSong.id_song;
            });
            const nextSong = store.state.playlist.find((song) => {
                return song.priority == currentSongIndex + 1;
            });

            if (nextSong)
                store.dispatch('requestSongChange', nextSong.id_song);
        },
        requestSongChange(store, id_song) {
            console.log('Requesting Song Change - Id Song: ', id_song);
            this._vm.$socket.emit('changeCurrentSong', {
                id_room: store.state.roomInfo.id_room,
                id_song: id_song,
            });
        },
        changePlayingSong(store, id_song) {
            console.log('Playing Song - Id Song: ', id_song);
			const song = store.state.playlist.find((song) => {
                return song.id_song == id_song;
            });
			console.log(song);
            store.state.playingSong = song;
            //List should start from the current song
        },
	},
	modules: {},
};
