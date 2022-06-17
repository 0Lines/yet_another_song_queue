<template>
    <v-card tile flat min-height="100vh">
        <v-app-bar color="accent" flat dense app>
            <v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
        </v-app-bar>

        <v-main style="height: 100%;">
            <!--TODO - Center the contents and add the logo -->
			<v-container class="d-flex flex-column pa-6" style="max-width: 900px; height: 100%;">
				<v-form ref="formRoomName" v-model="formIsValid" lazy-validation>
					<div class="d-flex align-center"> 
                        <v-col>
                            <h2>🥳 Create my own party</h2>
                            <v-row class="my-2">
                                <v-text-field v-model="roomName" color="grey" label="Name" class="mr-5" :rules="roomNameRules"/>
                                <v-btn x-large width="200" class="font-weight-bold" @click="createRoom">Create Room</v-btn>
                            </v-row>
                        </v-col>
                    </div>
				</v-form>

				<v-form ref="formRoomCode" v-model="formIsValid" lazy-validation>
					<div class="d-flex align-center"> 
                        <v-col>
                            <h2>😎 Join my friends</h2>
                            <v-row class="my-2">
                                <v-text-field v-model="roomCode" color="grey" label="Code" class="mr-5" :rules="roomCodeRules"/>
                                <v-btn x-large width="200" class="font-weight-bold" @click="enterRoom">Enter Room</v-btn>
                            </v-row>
                        </v-col>
					</div>
                </v-form>
			</v-container>
        </v-main>
    </v-card>
</template>

<script>

export default {
    props: {},
    mixins: {},
    data() {
        return {
			roomName: "",
			roomCode: "",
			formIsValid: true,

			roomCodeRules: [
				v => !!v || 'Code is required'
			],
			roomNameRules: [
				v => !!v || 'Name is required'
			],
        }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
		async createRoom() {
			if(!this.$refs.formRoomName.validate())
				return false;

			const createRoomResponse = await this.$store.dispatch('room/createRoom', this.roomName);
			if(createRoomResponse.isError)
				return false;

			this.$router.push({ name: 'room', params: { id_room: createRoomResponse.id_room } });
		},
		async enterRoom() {
			if(!this.$refs.formRoomCode.validate())
				return false;
				
			this.$router.push({ name: 'room', params: { id_room: this.roomCode } });
		},
	},
}
</script>

<style>
</style>
