<template>
    <v-card tile flat min-height="100vh">

		<v-app-bar color="accent" flat app>
			<v-menu offset-y :close-on-content-click="false" max-width="min-content">
				<template v-slot:activator="{ on, attrs }">
					<v-toolbar-title v-bind="attrs" v-on="on">ROOM NAME</v-toolbar-title>
				</template>

				<UserList
					color="accent"
					:loading="loadingUser"
					:errorMessage="user.account.errorMessage"
					:users="room.participants"
					style="min-width: 220px;"
				/>
			</v-menu>

			<v-spacer></v-spacer>
			<v-menu offset-y :close-on-content-click="false" max-width="min-content">
				<template v-slot:activator="{ on, attrs }">
					<div v-bind="attrs" v-on="on"> <!-- TODO DIV TO HANDLE ACTIVATOR EVENTS (obs: if u know how to remove this and make the custom component handle it pls do it) -->
						<UserAvatar
							color="accent"
							:loading="loadingUser"
							:isError="user.account.isError"
							:userName="user.account.nickname"
							:userAvatarSrc="userAvatarSrc"
						/>
					</div>
				</template>

				<v-sheet color="accent">
					<UserListItem
						:loading="loadingUser"
						:errorMessage="user.account.errorMessage"
						:userId="user.account.id"
						:userName="user.account.nickname"
						:userAvatarSrc="userAvatarSrc"
						style="min-width: 220px;"
					/>
				</v-sheet>
			</v-menu>
		</v-app-bar>

        <v-main style="height: 100%;">
			<v-container class="d-flex flex-column pa-6" style="height: 100%;">

				<v-progress-circular v-if="loading" class="ma-auto" indeterminate/>

				<ApiError
					v-else-if="pageError != null"
					:errorStatusCode="pageError.errorStatus"
					:errorStatusMessage="pageError.statusMessage"
					:errorMessage="pageError.errorMessage"
				/>

                <Room v-else/>

            </v-container>
        </v-main>
    </v-card>
</template>

<script>
import Room from '@/components/Room.vue'
import UserAvatar from '@/components/user/UserAvatar.vue'
import UserList from '@/components/user/UserList.vue'
import ApiError from '@/components/ApiError.vue'
import UserListItem from '@/components/user/UserListItem.vue'

export default {
    props: {
		id_room: String
	},
    mixins: {},
    data() {
        return {
			loading: false,
			pageError: null,
		}
    },
    directives: {},
    components: { 
        UserAvatar, UserListItem, UserList, Room, ApiError
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
		loadingUser: {
			get () {
				return this.user.loadingUserAccount;
			},
			set (value) {
				this.$store.commit('user/setLoadingUserAccount', value)
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
		async getCurrentUserOrCreateOne() {
			const user = this.$store.getters['user/userAccount'];
			if(user.id)
				return user
			
			return await this.$store.dispatch('user/createAndAssignNewUser');
		},
		async initialize() {
			this.loading = true;

			const currentUser = await this.getCurrentUserOrCreateOne();
			if(currentUser.isError) {
				this.pageError = currentUser;
			} else {
				const enterRoomResponse = await this.$store.dispatch('room/enterRoom', { id_room: this.id_room, id_user: currentUser.id });
				if(enterRoomResponse.isError) 
					this.pageError = enterRoomResponse;
			}

			this.loading = false;
		}
	},
	created() {
		if(!this.id_room) {
			this.$router.push({ name: 'home' });
			return false;
		}

		this.initialize();
	}
}
</script>

<style scoped>
</style>
