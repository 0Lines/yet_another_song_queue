<template>
    <v-card tile flat min-height="100vh">
        <v-app-bar color="accent" flat app>
            <v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
        </v-app-bar>

        <v-main>
            <v-sheet width="50%" class="text-center ma-auto">

                <v-form class="mt-10 ">
                    <v-btn block @click="createRoomBtn">Criar sala</v-btn>

                    <div class="d-flex align-center mt-5"> 
                        <v-text-field v-model="roomCode" color="grey" label="Código da sala" class="mr-5"></v-text-field>
                        <v-btn @click="enterRoomBtn(roomCode)">Entrar na sala</v-btn>
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
		async createRoomBtn() {
			const user = this.$store.getters['user/userAccount'];

			const userAssigned = user.id ? user : await this.$store.dispatch('user/createAndAssignNewUser');
			if(userAssigned.isError)
				return false;

			const createRoomResponse = await this.$store.dispatch('room/createRoom', "TOME");
			if(createRoomResponse.isError) {
				console.log("Error when creating room: " + createRoomResponse);
				return false;
			}

			const enterRoomResponse = await this.$store.dispatch('room/enterRoom', {
				id_room: createRoomResponse.id_room,
				id_user: userAssigned.id
			});

			if(enterRoomResponse.isError) {
				console.log("Error when entering room: " + response);
				return false;
			}

			console.log("Ented room: " + enterRoomResponse);
			console.log(enterRoomResponse);
		},
		async enterRoomBtn(roomCode) {
		}
	},
}
</script>

<style>
</style>