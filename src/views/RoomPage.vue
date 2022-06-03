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

        <v-main app>
            <v-container class="pa-6">
                <Room />
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

export default {
    props: {},
    mixins: {},
    data() {
        return {
		}
    },
    directives: {},
    components: { 
        UserAccountPreview,
        UserAccount,
        Room
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
			return `${process.env.VUE_APP_API_URI}/${this.user.account.profilesrc}`
		}
	},
    watch: {},
    methods: {
		async createUser() {
			this.loadingUser = true;
			const response = await this.$store.dispatch('user/getNewUser');
			if(response.isError) {
				console.log(response.errorMessage);
				this.user.account = response;
			} else {
				this.user.account = response;
			}

			this.loadingUser = false;
		}
	},
	created() {
		//TODO CREATE USER SHOULD BE AFTER USER ENTERED ROOM, NOT ON THIS CREATED
		this.createUser();
	}
}
</script>

<style scoped>
</style>
