<template>
    <v-card flat class="pa-4">
		<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@800&display=swap" rel="stylesheet"/>

		<div class="container">
			<span v-for="(char, index) in errorCodeSplited" :key="index" class="bigLetter">
				{{char}}
			</span>
		</div>

		<div class="text-center font-italic grey--text mb-8" style="margin-top: -30px">
			❝ {{errorStatusMessage}} ❞ <span v-html="errorMessage"></span> 
		</div>

		<div class="text-center">
			<v-btn outlined @click="goHome">Back To Home</v-btn>
		</div>
	</v-card>
</template>

<script>
export default {
	props: {
		errorStatusCode: Number,
		errorStatusMessage: String,
		errorMessage: String,

	},
    mixins: {},
    data() {
        return { }
    },
    directives: {},
    components: {},
    computed: {
		errorCodeSplited: {
			get() {
				return this.errorStatusCode.toString().split("");
			}
		}
	},
    watch: {},
    methods: {
		goHome() {
			this.$router.push({ name: 'home' })
		}
	}
}
</script>

<style scoped>
	.container {
		text-align: center;
		font-family: "Poppins", sans-serif;
		font-weight: 800;
	}
	.bigLetter {
		font-size: 8rem;
		text-shadow: -0.08em 0.03em 0.12em rgba(0, 0, 0, 0.7);
	}
	.container .bigLetter:not(:first-child) {
		margin-left: -0.3em;
	}
</style>
