<template>
    <v-card tile flat min-height="100vh">

		<v-app-bar color="accent" flat app>
			<v-icon class="mr-4" color="warning" @click="goToHome">mdi-music-circle</v-icon>
			<v-toolbar-title class="mr-3 text-capitalize">{{ room.roomInfo.name }}</v-toolbar-title> <!-- TODO MISSING SOME LOADING HERE -->
			
			<v-menu offset-y :close-on-content-click="false" max-width="min-content" max-height="400">
				<template v-slot:activator="{ on, attrs }">
					<v-btn icon v-bind="attrs" v-on="on">
						<v-icon>mdi-account-multiple</v-icon>
					</v-btn>
				</template>

				<UserList
					color="accent"
					:loading="false"
					:errorMessage="room.participants.errorMessage"
					:users="room.participants.slice().sort((a, b) => a.nickname > b.nickname ? 1 : -1 )"
					style="min-width: 220px;"
				/>
			</v-menu>

			<v-tooltip v-model="shareTooltip" bottom>
				<template v-slot:activator="{}">
					<v-btn class="mr-2" icon @click="shareRoom">
						<v-icon >mdi-share</v-icon>
					</v-btn>
				</template>

          		<span>{{tooltipMessage}}</span>
        	</v-tooltip>

			<v-spacer/>

			<v-menu offset-y :close-on-content-click="false" max-width="min-content">
				<template v-slot:activator="{ on, attrs }">
					<div v-bind="attrs" v-on="on"> <!-- TODO DIV TO HANDLE ACTIVATOR EVENTS (obs: if u know how to remove this and make the custom component handle it pls do it) -->
						<UserAvatar
							color="accent"
							:loading="user.loadingUserAccount"
							:isError="user.account.isError"
							:userName="user.account.nickname"
							:userAvatarSrc="userAvatarSrc"
							style="max-width: fit-content;"
						/>
					</div>
				</template>

				<v-sheet color="accent">
					<UserListItem
						:loading="user.loadingUserAccount"
						:errorMessage="user.account.errorMessage"
						:userId="user.account.id_user"
						:userName="user.account.nickname"
						:userAvatarSrc="userAvatarSrc"
						style="min-width: 220px;"
					/>
				</v-sheet>
			</v-menu>
			
		</v-app-bar>

		<v-main style="height: 100%;">
			<v-container class="d-flex flex-column pa-6" style="max-width: 1000px; height: 100%;">

				<v-progress-circular v-if="room.loadingRoomInfo" class="ma-auto" indeterminate/>

				<ApiError
					v-else-if="room.pageError"
					:errorStatusCode="room.pageError.errorStatus"
					:errorStatusMessage="room.pageError.statusMessage"
					:errorMessage="room.pageError.errorMessage"
				/>

                <Room ref="room" v-else/>

            </v-container>
        </v-main>

		<ConfirmationDialog ref="confirmationDialog" @rejected="1==1" @accepted="playCmon">
			<div>Gostaria de escutar as músicas desta sala?</div>
		</ConfirmationDialog>
    </v-card>
</template>

<script>
import Room from '@/components/room/Room.vue'
import UserAvatar from '@/components/user/UserAvatar.vue'
import UserList from '@/components/user/UserList.vue'
import ApiError from '@/components/ApiError.vue'
import UserListItem from '@/components/user/UserListItem.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

export default {
    props: {
		id_room: String
	},
    mixins: {},
    data() {
        return {
			timeout: null,
			shareTooltip: false,
			tooltipMessage: ""
		}
    },
    directives: {},
    components: { 
        UserAvatar, UserListItem, UserList, Room, ApiError, ConfirmationDialog
    },
    computed: {
		room: {
			get() {
				return this.$store.state.room;
			}
		},
		user: {
			get() {
				return this.$store.state.user;
			}
		},
		userAvatarSrc() {
			if(!this.user.account.profilesrc)
				return null;
			return `${process.env.VUE_APP_API_URI}${this.user.account.profilesrc}`
		}
	},
	watch: {},
	methods: {
		goToHome() {
			this.$router.push("/home")
		},
		async shareRoom() {
			if(this.$isMobile) {
				try {
					await navigator.share({ title: 'YASQ', text: 'Join my party at YASQ', url: window.location.href });
					this.tooltipMessage = "Success!";
				} catch(err) {
					this.tooltipMessage = "Error: " + err;
				}
			} else {
				navigator.clipboard.writeText(window.location.href);
				this.tooltipMessage = "Link copied!";
			}

			this.shareTooltip = true;
			clearTimeout(this.timeout);
			this.timeout = setTimeout(() => { this.shareTooltip = false }, 1500);
		},
		playCmon() {
			this.$refs.room?.playYTComponent();
		}
	},
	created() {
		if(!this.id_room) {
			this.$router.push({ name: 'home' });
			return false;
		}

		this.$store.dispatch('room/enterRoom', this.id_room);

		/* TODO SEPARATE BELOW ROOM EVENTS IN ANOTHER FILE OR SOMETHING LIKE THAT... */
		//ONLY REGISTER SOCKET EVENTS IF THEY WERE NOT YET REGISTERED (ta meio gambi)
		//this.$socket._callbacks sometimes is '{}' sometimes is undefined grr...
		if(Object.keys(this.$socket._callbacks ?? {}).length == 0) { 
			this.$socket.on('refreshUsers', () => {
				console.log("RECEIVED: Refresh Users - Id Room: ", this.id_room);
				this.$store.dispatch('room/getRoomParticipants', this.id_room);
			});

			this.$socket.on("refreshPlaylist", () => {
				console.log("RECEIVED: Refresh Playlist - Id Room: ", this.id_room);
				this.$store.dispatch('room/getPlaylist', this.id_room);
			});

			this.$socket.on('getCurrentState', async (state) => {
				console.log('RECEIVED: Current state is: ', state);
				this.$store.dispatch('room/pause');
				await this.$store.dispatch('room/changePlayingSong', state.currentSongId);

				this.$refs.room?.jumpYTComponentTimeTo(state.startFrom);
				this.$refs.room?.pauseYTComponent();
			});

			this.$socket.on("play", (startFrom) => {
				console.log("RECEIVED: Play Music - start from: ", startFrom);
				this.$store.dispatch("room/play");
				
				this.$refs.room?.jumpYTComponentTimeTo(startFrom);
				this.$refs.room?.playYTComponent();
			});

			this.$socket.on("pause", () => {
				console.log("RECEIVED: Pause Music");
				this.$store.dispatch("room/pause");

				this.$refs.room?.pauseYTComponent();
			});

			/* this.$socket.on('getCurrentSong', (id_song) => {
				if (id_song && (id_song != this.$store.playingSong))
					this.$store.dispatch('changePlayingSong', state.id_song);
			}); */

			this.$socket.on("changeCurrentSong", (song) => {
				console.log("RECEIVED: Change Current Song - Id Song: ", song.id_song);
				this.$store.dispatch('room/changePlayingSong2', song);
			});
		}
	},
	mounted(){
		this.$refs.confirmationDialog.openConfirmationDialog();
	}
}
</script>

<style scoped>
</style>
