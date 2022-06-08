<template>
    <v-card tile flat min-height="100vh">

        <v-app-bar color="accent" flat app>
			<v-toolbar-title>Yet Another Song Queue</v-toolbar-title>

			<v-spacer></v-spacer>
			<v-menu offset-y :close-on-content-click="false" max-width="min-content">
				<template v-slot:activator="{ on, attrs }">
					<div v-bind="attrs" v-on="on"> <!-- DIV TO HANDLE ACTIVATOR EVENTS (obs: if u know how to remove this and make the custom component handle it pls do it) -->
						<UserAccountPreview
							:loading="loadingUser"
							:isError="user.account.isError"
							:userName="userName"
							:userAvatarSrc="userAvatarSrc"
						/>
					</div>
				</template>

				<UserAccount
					color="accent"
					:loading="loadingUser"
					:errorMessage="user.account.errorMessage"
					:userId="userId"
					:userName="userName"
					:userAvatarSrc="userAvatarSrc"
					style="min-width: 220px;"
				/>
			</v-menu>
		</v-app-bar>

        <v-main style="height: 100%;">
			<v-container class="d-flex flex-column justify-center pa-6" style="height: 100%;">
				<v-progress-circular v-if="loading" class="ma-auto" indeterminate/>
				<ApiError v-else-if="pageError != null" :errorCode="pageError.errorStatus" :errorMessage="pageError.errorMessage"/>
                <Room v-else/>
            </v-container>
        </v-main>

        <v-footer color="accent" app>
            <v-col class="text-center" cols="12">
                Yet Another Song Queue - Under GPL-3.0 License, {{ new Date().getFullYear() }}
            </v-col>
        </v-footer>
    </v-card>
</template>

<script>
import Room from '@/components/Room.vue'
import UserAccountPreview from '@/components/user/UserAccountPreview.vue'
import UserAccount from '@/components/user/UserAccount.vue'
import ApiError from '@/components/ApiError.vue'

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
        UserAccountPreview, UserAccount, Room, ApiError
    },
    computed: {
		user: {
			get() {
				return this.$store.state.user;
			}
		},
		loadingUser: {
			get () {
				return this.user.loading;
			},
			set (value) {
				this.$store.commit('user/setLoading', value)
			}
		},
		userId() {
			return this.user.account.id;
		},
		userName() {
			return `${this.user.account.firstname} ${this.user.account.lastname}`;
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
