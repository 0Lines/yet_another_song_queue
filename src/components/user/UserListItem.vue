<template>
	<v-skeleton-loader v-if="loading" type="list-item-avatar-two-line" width="350"/>
	
	<v-list-item v-else>
		<v-list-item-content v-if="errorMessage">
			<v-list-item-title>{{ errorMessage }}</v-list-item-title>
		</v-list-item-content>
		
		<template v-else>
			<v-list-item-avatar>
				<v-img v-if="userAvatarSrc" :src="userAvatarSrc">
					<template v-slot:placeholder>
						<v-row class="fill-height ma-0" align="center" justify="center">
							<v-progress-circular indeterminate />
						</v-row>
					</template>
				</v-img>

				<v-icon v-else color="secondary" large dark>mdi-account-circle</v-icon> <!-- TODO MAYBE REMOVE THIS AND USE A STD IMG -->
			</v-list-item-avatar>

			<v-list-item-content>
				<v-list-item-title>{{ userName }}</v-list-item-title>
				<v-list-item-subtitle>{{ userId }}</v-list-item-subtitle>
			</v-list-item-content>
		</template>
	</v-list-item>
</template>

<script>
export default {
	props: {
		loading: 		Boolean,
		errorMessage: 	String,

		userId: 		String,
		userName: 		String,
		userAvatarSrc: 	String,
	},
	mixins: {},
	data(){
		return {
		}
	},
	directives: {},
	components: {},
	computed: {},
	watch: {},
	methods: {},
}
</script>

<style>
</style>