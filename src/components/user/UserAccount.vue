<template>
	<v-card :color="color">
		<v-skeleton-loader v-if="loading" type="list-item-avatar-two-line" width="352"/>

		<v-card-text v-else-if="errorMessage">
			Erro: {{errorMessage}}
		</v-card-text>

		<v-list v-else :color="color">
			<v-list-item>

				<v-list-item-avatar>
					<v-img v-if="userAvatarSrc" :src="userAvatarSrc">
						<template v-slot:placeholder>
							<v-row class="fill-height ma-0" align="center" justify="center">
								<v-progress-circular indeterminate />
							</v-row>
						</template>
					</v-img>

					<v-icon v-else color="secondary" large dark>mdi-account-circle</v-icon>
				</v-list-item-avatar>

				<v-list-item-content>
					<v-list-item-title>{{ userName }}</v-list-item-title>
					<v-list-item-subtitle>{{ userId }}</v-list-item-subtitle>
				</v-list-item-content>

			</v-list-item>
		</v-list>
	</v-card>
</template>

<script>
export default {
	props: {
		loading: 		{ type: Boolean, default: false },
		errorMessage: 	{ type: String },
		userId: 		{ type: String, default: "N/A" },
		userName: 		{ type: String, default: "N/A" },
		userAvatarSrc: 	{ type: String },
		color: 			{ type: String },
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