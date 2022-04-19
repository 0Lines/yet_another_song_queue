<template>
	<v-app-bar color="accent" flat app>
		<v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
		<v-spacer></v-spacer>

		<v-skeleton-loader
			v-if="loadingUser"
			class="heightCorrection"
			width="200"
			height="inherit"
			type="list-item-avatar-two-line"
		/>
		
		<v-menu
			v-else
			v-model="menu"
			offset-y
			bottom
			open-on-click
			:close-on-content-click="false"
		>
			<template v-slot:activator="{ on, attrs }">
				<v-sheet v-bind="attrs" v-on="on" color="accent">
					<span class="mr-3">{{ fullname }}</span>
					<v-avatar size="45">
						<img :src="profilesrc">
					</v-avatar>
				</v-sheet>
			</template>

			<v-card>
				<v-list>
					<v-list-item>
						<v-list-item-avatar>
							<v-avatar size="45">
								<img :src="profilesrc">
							</v-avatar>
						</v-list-item-avatar>

						<v-list-item-content>
							<v-list-item-title>{{ fullname }}</v-list-item-title>
							<v-list-item-subtitle>{{ id }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>

				<v-divider></v-divider>

				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn text @click="menu = false">Cancel</v-btn>
				</v-card-actions>
			</v-card>
		</v-menu>
	</v-app-bar>
</template>

<script>

import { mapState } from 'vuex';

export default {
	props: {},
	mixins: {},
	data(){
		return {
			menu: false,
		}
	},
	directives: {},
	components: {},
	computed: {
		...mapState({
			user: state => state.user,
		}),
		loadingUser: {
			get () {
				return this.user.loading;
			},
			set (value) {
				this.$store.commit('user/setLoading', value)
			}
		},
		id() {
			return this.user.account.id;
		},
		fullname() {
			return `${this.user.account.firstname} ${this.user.account.lastname}`;
		},
		profilesrc() {
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
			} else {
				this.user.account = response;
			}

			this.loadingUser = false;
		}
	},
	created() {
		this.createUser();
	}
}
</script>

<style scoped>
	/* https://github.com/vuetifyjs/vuetify/issues/11771 */
	.heightCorrection >>> .v-skeleton-loader__list-item-avatar-two-line {
		height: 100% !important;
	}
</style>