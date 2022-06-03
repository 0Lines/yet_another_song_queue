<template>
	<v-card flat rounded="pill" color="accent" @click="$emit('click')">
		<v-badge :value="isError" color="error" content="!" overlap bottom offset-x="20" offset-y="20">
			<v-avatar>
				<v-skeleton-loader v-if="loading" type="avatar"/>
				<img v-else-if="userAvatarSrc" :src="userAvatarSrc">
				<v-icon v-else color="secondary" large dark>mdi-account-circle</v-icon>
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