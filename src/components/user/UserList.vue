<template>
	<v-card class="d-flex justify-center align-center" :color="color">
		<v-progress-circular v-if="loading" class="ma-14" width="5" size="50" indeterminate/>

		<v-card-text v-else-if="errorMessage">
			Erro:<br/> {{errorMessage}}
		</v-card-text>

		<v-list v-else :color="color">
			<UserListItem v-for="(user, index) in users" :key="index" v-bind="getUserPropObject(user)"/>
		</v-list>
	</v-card>
</template>

<script>
import UserListItem from '@/components/user/UserListItem.vue';

export default {
	props: {
		color:			String, /* TODO REVER ESSA PASSADA DE COLOR PARA OS COMPONENTES GENÉRICOS */
		loading: 		Boolean,
		errorMessage: 	String,

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
				userName: user.nickname,
				userAvatarSrc: `${process.env.VUE_APP_API_URI}${user.profilesrc}` 
			}
		}
	},
}
</script>

<style>
</style>