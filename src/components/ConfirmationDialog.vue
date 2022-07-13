<template>
	<v-dialog v-model="open" persistent scrollable max-width="300px">
		<v-card>

			<v-card-title>{{title}}</v-card-title>

			<v-card-text style="max-height: 300px;">
				<slot></slot>
			</v-card-text>

			<v-card-actions>
				<v-btn color="blue darken-1" text @click="reject">{{rejectBtnText}}</v-btn>
				<v-btn color="blue darken-1" text @click="accept">{{acceptBtnText}}</v-btn>
			</v-card-actions>
			
		</v-card>
    </v-dialog>
</template>

<script>

export default {
	props: {
		title: 			{ type: String, default: "Você confirma?" },
		rejectBtnText: 	{ type: String, default: "Cancelar"},
		acceptBtnText: 	{ type: String, default: "Confirmar"},
	},
	mixins: {},
	data(){
		return {
			open: false,
		}
	},
	directives: {},
	components: {},
	computed: {},
	watch: {},
	methods: {
		openConfirmationDialog() {
			this.open = true;
		},
		accept() {
			this.$emit("accepted");
			this.closeDialog();
		},
		reject() {
			this.$emit("rejected");
			this.closeDialog();
		},
		closeDialog() {
			this.open = false;
		}
	},
}
</script>

<style>
</style>