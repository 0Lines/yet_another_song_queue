<template>
	<div class="d-flex align-center" style="height: 96px;">
		<div class="loader-container">
			<div class="rectangle-1"></div>
			<div class="rectangle-2"></div>
			<div class="rectangle-3"></div>
			<div class="rectangle-4"></div>
			<div class="rectangle-5"></div>
			<div class="rectangle-6"></div>
			<div class="rectangle-5"></div>
			<div class="rectangle-4"></div>
			<div class="rectangle-3"></div>
			<div class="rectangle-2"></div>
			<div class="rectangle-1"></div> 
		</div>
	</div>
</template>

<script>

export default {
	props: {},
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
	.loader-container {
		position: relative;
		height: 32px;
		width: max-content;
	}

	.loader-container > div {
		position: relative;
		display: inline-block;
		background: #03A9F4;
		height: 100%;
		width: 8px;
		margin: 0;
		-webkit-animation: load 3s ease-in-out infinite;
		animation: load 3s ease-in-out infinite;
	}

	.loader-container .rectangle-2 {
		-webkit-animation-delay: 0.1s;
		animation-delay: 0.1s;
	}

	.loader-container .rectangle-3 {
		-webkit-animation-delay: 0.2s;
		animation-delay: 0.2s;
	}

	.loader-container .rectangle-4 {
		-webkit-animation-delay: 0.3s;
		animation-delay: 0.3s;
	}

	.loader-container .rectangle-5 {
		-webkit-animation-delay: 0.4s;
		animation-delay: 0.4s;
	}

	.loader-container .rectangle-6 {
		-webkit-animation-delay: 0.5s;
		animation-delay: 0.5s;
	}

	@-moz-keyframes load {
		0%,
		100% {
			-moz-transform: scaleY(1);
			background: #03A9F4;
		}
		16.67% {
			-moz-transform: scaleY(3);
			background: #FF5722;
		}
		33.33% {
			-moz-transform: scaleY(1);
			background: #FF5252;
		}
		50% {
			-moz-transform: scaleY(3);
			background: #E91E63;
		}
		66.67% {
			-moz-transform: scaleY(1);
			background: #9C27B0;
		}
		83.34% {
			-moz-transform: scaleY(3);
			background: #673AB7;
		}
	} 

	@-webkit-keyframes load {
		0%,
		100% {
			-webkit-transform: scaleY(1);
			background: #03A9F4;
		}
		16.67% {
			-webkit-transform: scaleY(3);
			background: #FF5722;
		}
		33.33% {
			-webkit-transform: scaleY(1);
			background: #FF5252;
		}
		50% {
			-webkit-transform: scaleY(3);
			background: #E91E63;
		}
		66.67% {
			-webkit-transform: scaleY(1);
			background: #9C27B0;
		}
		83.34% {
			-webkit-transform: scaleY(3);
			background: #673AB7;
		}
	} 

	@keyframes load {
		0%,
		100% {
			transform: scaleY(1);
			background: #03A9F4;
		}
		16.67% {
			transform: scaleY(3);
			background: #FF5722;
		}
		33.33% {
			transform: scaleY(1);
			background: #FF5252;
		}
		50% {
			transform: scaleY(3);
			background: #E91E63;
		}
		66.67% {
			transform: scaleY(1);
			background: #9C27B0;
		}
		83.34% {
			transform: scaleY(3);
			background: #673AB7;
		}
	} 
</style>