<template>
    <v-card tile flat min-height="100vh">
        <v-app-bar color="accent" flat app>
            <v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
        </v-app-bar>
        <v-main>
            <v-sheet width="50%" class="text-center ma-auto">
                <v-form class="mt-10 ">
                    <v-btn block @click="createRoom">
                        Criar sala
                    </v-btn>
                    <div class="d-flex align-center mt-5"> 
                        <v-text-field v-model="roomCode" color="grey" label="Código da sala" class="mr-5"></v-text-field>
                        <v-btn @click="enterRoom">
                            Entrar na sala
                        </v-btn>
                    </div>
                </v-form>
            </v-sheet>
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
        }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
		async createRoom() {
			console.log('creating room....');

			const response = await this.$store.dispatch('room/createRoom', "TOME");
			if(response.isError) {
				console.log(response);
			} else {
				console.log(response);
			}
		},
		async enterRoom() {
			console.log('entering room... ' + this.roomCode);

			const response = await this.$store.dispatch('room/enterRoom', this.roomCode);
			if(response.isError) {
				console.log(response);
			} else {
				console.log(response);
			}
		}
	},
}
</script>

<style>
</style>