<template>
    <v-card tile flat min-height="100vh">
        <v-app-bar color="accent" flat dense app>
            <v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
        </v-app-bar>

        <v-main style="height: 100%;">
            <!--TODO - Center the contents and add the logo -->
			<v-container class="d-flex flex-column justify-center pa-6" style="max-width: 900px; height: 100%;">
				<v-form ref="formRoomName" lazy-validation class="mb-8" @submit="createRoom" onSubmit="return false;">
					<h2>🥳 Create my own party</h2>
					<v-text-field v-model="roomName" color="grey" label="Name" class="align-baseline" :rules="roomNameRules">
						<template v-slot:append-outer>
							<v-btn x-large width="200" class="font-weight-bold" @click="createRoom">Create Room</v-btn> <!-- TODO ON MOBILE THIS BUTTONS ARE TOO LARGE -->
						</template>
					</v-text-field>
				</v-form>

				<v-form ref="formRoomCode" lazy-validation @submit="enterRoom" onSubmit="return false;">
					<h2>😎 Join my friends</h2>
					<v-text-field v-model="roomCode" color="grey" label="Code" class="align-baseline" :rules="roomCodeRules">
						<template v-slot:append-outer>
							<v-btn x-large width="200" class="font-weight-bold" @click="enterRoom">Enter Room</v-btn> <!-- TODO ON MOBILE THIS BUTTONS ARE TOO LARGE -->
						</template>
					</v-text-field>
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

			roomNameRules: [
				v => !!v || 'Name is required'
			],
			roomCodeRules: [
				v => !!v || 'Code is required',
				v => this.roomCodeIndexInUrl(v) == -1 || !!this.getRoomCodeFromUrl(v) || 'Code is required',
			],
        }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
		roomCodeIndexInUrl(url) {
			const index = url.lastIndexOf("room/");
			if(index == -1)
				return -1
			return index + 5; //5 is the size of "room/"
		},
		getRoomCodeFromUrl(url) {
			const urlMatchIndex = this.roomCodeIndexInUrl(url);
			if(urlMatchIndex != -1)
				return url.substring(urlMatchIndex); 
			
			return "";
		},
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

			let roomCode = this.getRoomCodeFromUrl(this.roomCode);
			if(!roomCode)
				roomCode = this.roomCode

			this.$router.push({ name: 'room', params: { id_room: roomCode } });
		},
	},
}
</script>

<style>
</style>
