<template>
    <v-sheet class="pa-2">
        <v-text-field
            v-model="searchString"
            label="Search"
            color="secondary"
            prepend-inner-icon="mdi-magnify"
            single-line
            outlined
            dense
            hide-details
            :loading="loadingSong"
            :disabled="loadingSong"
            @keydown.enter="searchAndQueueNewSong">
        </v-text-field>
    </v-sheet>
</template>

<script>
export default {
    props: {},
    mixins: {},
    data(){
        return {
            searchString: '',
            loadingSong: false,
        }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
        async searchAndQueueNewSong() {
			if(this.searchString != ''){
				this.loadingSong = true

				const APIresponse = await this.$store.dispatch('room/addSongInPlaylist', this.searchString);
				if(APIresponse.isError)
					console.log("Erro searching new song: " + APIresponse.errorMessage);
				else
					console.log("Success when requesting to add song into the room.");;

				this.searchString = '' 
				this.loadingSong = false
			}
        },
    },
}
</script>

<style>
</style>
