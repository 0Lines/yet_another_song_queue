import { handleAxiosError } from "@/utils/axios";
import Song from "@/models/Song.js";
import Room from "@/models/Room.js";
import User from "@/models/User.js";

export default {
	namespaced: true,
	state: {
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
	mutations: {},
	actions: {
		//TODO SEARCH IF AXIOS CALLS THAT ONLY RETURN THE DATA NEEDS TO BE IN THE STORE AND IN THIS WAY
		async addSongInPlaylist(store, mediaURL) {
			return await this._vm.axios.post('/songs', {
                    search_text: mediaURL,	//TODO API RECEIVES LINK VIA SEARCH_TEXT
                    id_room: store.state.room.id_room
                }).then((response) => {
                    //return new Song(response.data);
                    return true; //TODO RETHINK WHAT THIS REQUEST SHOULD DO IF SUCCESS, SINCE SOCKET WILL HANDLE THE SUCCESS
                }).catch((error) => { 
                    return handleAxiosError(error);
                });
		},
        async removeSongInPlaylist(store, { id_song, id_room }) { 
            return await this._vm.axios.delete('/songs', {
                    data: { 
                        id_song,
                        id_room
                    },
                }).then((response) => { 
                    console.log('Song removed!');
                    return true; //TODO - Think about a proper response
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
					store.state.room = new Room(response.data);
                    store.dispatch('subscribeToRoom');
					store.dispatch('getPlaylist', id_room);
					store.dispatch('getRoomParticipants', id_room);
					return response.data;
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		},
        subscribeToRoom(store) { 
            console.log('Subscribing to room', store.state.room.id_room);
            this._vm.$socket.emit('subscribeToRoom', store.state.room.id_room);
        },
        //Remove if it won't be used anymore
        async getRoom(store, id_room) {
            return await this._vm.axios.get('rooms/' + id_room)
                .then((response) => {
					store.state.room = new Room(response.data);
                    return response.data;
                }).catch((error) => {
					return handleAxiosError(error);
                });
        },
		async getRoomParticipants(store, id_room) {
			return await this._vm.axios.get('/rooms/participants/' + id_room)
				.then((response) => {
					store.state.participants = response.data.map(user => new User(user));
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		},
		async getPlaylist(store, id_room) {
			return await this._vm.axios.get('/songs/' + id_room)
				.then((response) => {
					store.state.playlist = response.data.map(song => new Song(song));
                    store.state.playingSong = store.state.playlist[0];
                    store.state.playlist.shift();
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		},
	},
	modules: {},
};
