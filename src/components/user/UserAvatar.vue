<template>
	<v-card flat rounded="pill" color="accent" @click="$emit('click')"> <!-- TODO MAYBE REMOVE THIS -->
		<v-badge :value="isError" color="error" content="!" overlap bottom offset-x="20" offset-y="20">
			<v-avatar>

				<v-skeleton-loader v-if="loading" type="avatar"/>

				<v-img v-else-if="userAvatarSrc" :src="userAvatarSrc">
					<template v-slot:placeholder>
						<v-row class="fill-height ma-0" align="center" justify="center">
							<v-progress-circular indeterminate />
						</v-row>
					</template>
				</v-img>

				<v-icon v-else color="secondary" large dark>mdi-account-circle</v-icon> <!-- TODO MAYBE REMOVE THIS AND USE A STD IMG -->
				
			</v-avatar>
		</v-badge>
	</v-card>
</template>

<script>
export default {
	props: {
		loading: 		{ type: Boolean, default: false },
		isError: 		{ type: Boolean, default: false },
		userAvatarSrc:	{ type: String },
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

<style scoped>
	/* https://github.com/vuetifyjs/vuetify/issues/11771 */
	/* .heightFix >>> .v-skeleton-loader__list-item-avatar-two-line {
		height: 100% !important;
	} */
</style>