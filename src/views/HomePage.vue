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
			const createRoomResponse = await this.$store.dispatch('room/createRoom', "TOME");
			if(createRoomResponse.isError)
				return false;

			this.$router.push({ name: 'room', params: { id_room: createRoomResponse.id_room } });
		},
		async enterRoomBtn(id_room) {
			if(!id_room)
				return false;
				
			this.$router.push({ name: 'room', params: { id_room } });
		},
	},
}
</script>

<style>
</style>