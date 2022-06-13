import { handleAxiosError } from "@/utils/axios"
import Song from "@/models/Song.js"
import Room from "@/models/Room.js"
import User from "../models/User";

export default {
	namespaced: true,
	state: {
		room: new Room({}),
		participants: [],
		playingSong: new Song({}),
		songQueue: [],
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
				.then(async (response) => {
					store.state.room = new Room(response.data);
					store.state.participants = await store.dispatch('getRoomParticipants', id_room);
					return response.data;
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		},
		async getRoomParticipants(store, id_room) {
			return await this._vm.axios.get('/room-participants/' + id_room)
				.then((response) => {
					return response.data.map(user => new User(user));
				}).catch((error) => { 
					return handleAxiosError(error);
				});
		}
	},
	modules: {},
};
