<template>
    <v-card>
		{{errorCode}}
		{{errorMessage}}
		<v-btn @click="goHome">Home</v-btn>
	</v-card>
</template>

<script>
export default {
	props: {
		errorCode: Number,
		errorMessage: String,

	},
    mixins: {},
    data() {
        return { }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
		goHome() {
			this.$router.push({ name: 'home' })
		}
	}
}
</script>

<style scoped>
</style>
