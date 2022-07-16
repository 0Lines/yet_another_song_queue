import Song from "@/models/Song.js";
import Room from "@/models/Room.js";
import User from "@/models/User.js";
import MirroredJukebox from "@/classes/MirroredJukebox";

export default {
	namespaced: true,
	state: {
		pageError: null, //TODO REMOVE THIS AND ITS USAGE PLSSSSS

		loadingRoomInfo: false,
		roomInfo: new Room({}),

		mirroredJukebox: new MirroredJukebox(),

		loadingParticipants: false,
		participants: [],

		loadingPlaylist: false,
		playlist: [],
	},
	getters: {
		playlist(state) {
			return state.playlist;
		},
		roomInfo(state) {
			return state.roomInfo;
		},
		mirroredJukebox(state) {
			return state.mirroredJukebox;
		}
	},
	mutations: {},
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

					this._vm.$socket.emit('subscribeToRoom', id_room);
					store.dispatch('refreshRoomParticipants', id_room);
					await store.dispatch('refreshPlaylist', id_room);
					await store.dispatch('registerSocketRoomEvents', this._vm.$socket);
					this._vm.$socket.emit('getCurrentState', id_room); 
				}
			}

			store.state.loadingRoomInfo = false;
		},
		async refreshRoomParticipants(store, id_room) {
			store.state.loadingParticipants = true;

			const response = await this._vm.$axios.getHandled('/rooms/participants/', id_room);
			if(response.isError) {
				store.state.participants = response;
			} else {
				store.state.participants = response.map(user => new User(user));
			}

			store.state.loadingParticipants = false;
		},
		async refreshPlaylist(store, id_room) {
			store.state.loadingPlaylist = true;

			const response = await this._vm.$axios.getHandled('/songs/', id_room);
			if(response.isError) {
				store.state.playlist = response;
			} else {
				store.state.playlist = response.map(song => new Song(song));
			}

			store.state.loadingPlaylist = false;
		},
		previousSong(store) {
			const currentSong = store.state.mirroredJukebox.playingSong;

            const previousSong = store.state.playlist.find((song) => {
                return song.priority == currentSong.priority - 1; //TODO THIS WAY OF GETTING THE SONG IS WRONG (cannot just put -1)
            });

            if (previousSong)
                store.dispatch('requestSongChange', previousSong.id_song);
        },
        nextSong(store) {
			const currentSong = store.state.mirroredJukebox.playingSong;

            const nextSong = store.state.playlist.find((song) => {
				return song.priority == currentSong.priority + 1; //TODO THIS WAY OF GETTING THE SONG IS WRONG (cannot just put +1)
            });
			console.log(nextSong);

            if (nextSong)
                store.dispatch('requestSongChange', nextSong.id_song);
        },
        requestSongChange(store, id_song) {
            console.log('Requesting Song Change - Id Song: ', id_song);
            this._vm.$socket.emit('changeCurrentSong', { id_room: store.state.roomInfo.id_room, id_song: id_song });
        },
		registerSocketRoomEvents(store, socket) {
			if(socket._callbacks?. refreshUsers == undefined) { //TODO (kinda bad) checking if 'refreshUsers' is not yet registered
				
				socket.on('refreshUsers', () => {
					console.log("RECEIVED: Refresh Users");
					store.dispatch('refreshRoomParticipants', store.state.roomInfo.id_room);
				});

				socket.on("refreshPlaylist", () => {
					console.log("RECEIVED: Refresh Playlist");
					store.dispatch('refreshPlaylist', store.state.roomInfo.id_room);

					//TODO XGR (fix just for the first song... bug can still happens)
					if(store.state.playlist.length == 0)
						this._vm.$socket.emit('getCurrentState', store.state.roomInfo.id_room); 
				});

				socket.on("play", (songElapsedTime) => {
					console.log("RECEIVED: Play Music - from time: ", songElapsedTime/1000);
					store.state.mirroredJukebox.play(songElapsedTime)
				});

				socket.on("pause", (songElapsedTime) => {
					console.log("RECEIVED: Pause Music - in time ", songElapsedTime/1000);
					store.state.mirroredJukebox.pause(songElapsedTime)
				});

				socket.on('getCurrentState', (state) => {
					console.log('RECEIVED: Current state is: ', state);

					const playingSong = store.state.mirroredJukebox.playingSong;
					if(!playingSong || playingSong.id_song != state.currentSongId) {
						const song = store.state.playlist.find((song) => { return song.id_song == state.currentSongId });
						console.log(store.state.playlist);
						console.log(song);
						if(song)
							store.state.mirroredJukebox.changeSong(song);
					}

					if(state.isPlaying)
						store.state.mirroredJukebox.play(state.songElapsedTime)
					else
						store.state.mirroredJukebox.pause(state.songElapsedTime)
				});

				socket.on("changeCurrentSong", (id_song) => {
					console.log("RECEIVED: Change Current Song - Song: ", id_song);
					console.log(store.state.playlist);
					const song = store.state.playlist.find((song) => { return song.id_song == id_song });
					console.log(song);
					store.state.mirroredJukebox.changeSong(song);
				});
				return true;
			}
			return false;
		}
	},
	modules: {},
};
