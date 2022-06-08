<template>
    <v-card tile flat min-height="100vh">
        <v-app-bar color="accent" flat app>
            <v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
        </v-app-bar>

        <v-main style="height: 100%;">
			<v-container class="d-flex flex-column justify-center pa-6" style="height: 100%;">

				<v-form ref="form" v-model="formIsValid" lazy-validation>
					<v-btn class="mb-5" block @click="createRoomBtn">Criar sala</v-btn>

					<div class="d-flex align-center"> 
						<v-text-field v-model="roomCode" color="grey" label="Código da sala" class="mr-5" :rules="roomCodeRules"/>
						<v-btn @click="enterRoomBtn">Entrar na sala</v-btn>
					</div>
				</v-form>
				
			</v-container>
        </v-main>

        <v-footer color="accent" app>
            <v-col class="text-center" cols="12">
                Yet Another Song Queue - Under GPL-3.0 License, {{ new Date().getFullYear() }}
            </v-col>
        </v-footer>
    </v-card>
</template>

<script>

export default {
    props: {},
    mixins: {},
    data(){
        return {
			roomCode: "",
			formIsValid: true,

			roomCodeRules: [
				v => !!v || 'Código é obrigatório'
			],
        }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
		async createRoomBtn() {
			const createRoomResponse = await this.$store.dispatch('room/createRoom', "TOME"); //TODO NOME DA SALA CHUMBADO
			if(createRoomResponse.isError)
				return false;

			this.$router.push({ name: 'room', params: { id_room: createRoomResponse.id_room } });
		},
		async enterRoomBtn() {
			if(!this.$refs.form.validate())
				return false;
				
			this.$router.push({ name: 'room', params: { id_room: this.roomCode } });
		},
	},
}
</script>

<style>
</style>