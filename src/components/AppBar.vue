<template>
	<v-app-bar color="accent" flat app>
		<v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-menu
			v-model="menu"
			:close-on-content-click="false"
			:nudge-width="200"
			offset-y
			bottom
			open-on-hover
			open-on-click
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
							<v-list-item-subtitle>{{ user.logged.id }}</v-list-item-subtitle>
						</v-list-item-content>
					</v-list-item>
				</v-list>
				<v-divider></v-divider>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn
						text
						@click="menu = false"
					>
						Cancel
					</v-btn>
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
		fullname() {
			return `${this.user.logged.firstname} ${this.user.logged.lastname}`;
		},
		profilesrc() {
			return `${process.env.VUE_APP_API_URI}/${this.user.logged.profilesrc}`
		}
	},
	watch: {},
	methods: {
		async createUser() {
			await this.$store.dispatch('user/createUser');
		}
	},
	beforeMount() {
		this.createUser();
	}
}
</script>

<style>
</style>