<template>
	<v-card>
		<v-skeleton-loader v-if="loading" type="list-item-avatar-two-line" width="352"/>

		<v-card-text v-else-if="errorMessage">
			Erro: {{errorMessage}}
		</v-card-text>

		<v-list v-else>
			<UserListItem v-for="(user, index) in users" :key="index" v-bind="getUserPropObject(user)"/>
		</v-list>
	</v-card>
</template>

<script>
import UserListItem from '@/components/user/UserListItem.vue';

export default {
	props: {
		loading: 		{ type: Boolean, default: false },
		errorMessage: 	{ type: String },

		users: 			{ type: Array, default: () => [] },
	},
	mixins: {},
	data(){
		return {
		}
	},
	directives: {},
	components: {
		UserListItem
	},
	computed: {},
	watch: {},
	methods: {
		getUserPropObject(user) { //TODO REPENSAR O USO DAS VARIAVES, PROPS E O QUÃO GENÉRICO ESTÁ ISSO
			return {
				userName:user.nickname,
				userAvatarSrc: `${process.env.VUE_APP_API_URI}${user.profilesrc}` 
			}
		}
	},
}
</script>

<style>
</style>