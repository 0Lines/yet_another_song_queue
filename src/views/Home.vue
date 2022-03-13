<template>
    <v-card tile height="100vh">
        <AppBar />

        <v-main app>
            <v-container class="pa-6">
                <v-sheet class="round-container pa-2 mb-5">
                    <v-text-field
                        v-model="searchedSong"
                        label="Search"
                        color="secondary"
                        single-line
                        outlined
                        hide-details
                        dense
                        prepend-inner-icon="mdi-magnify"
                        @keydown.enter="validateAndAddSong"
                    ></v-text-field>
                </v-sheet>

				<PlayingSong :song="currentPlayingSong" class="round-container my-5"/>

				<PlayList class="round-container"/>
            </v-container>
        </v-main>

        <v-footer color="primary" app>
            <v-col class="text-center" cols="12">
                O ano é {{ new Date().getFullYear() }} e teu pai ainda PASSA NO AMEX...
            </v-col>
        </v-footer>
    </v-card>
</template>

<script>
import AppBar from "@/components/AppBar.vue"
import PlayingSong from "@/components/PlayingSong.vue"
import PlayList from '@/components/PlayList.vue'
import Song from "@/models/Song.js"

export default {
    props: {},
    mixins: {},
    data(){
        return {
            searchedSong: "",
            songs: [],
            currentPlayingSong: new Song(
                {
					title: "Playing Sound",
					ownerChannelName: "Ellie Goulding",
					thumbnails: [{ url: "https://cdn.vuetifyjs.com/images/cards/halcyon.png" }] 
				}
            ),
        }
    },
    directives: {},
    components: { 
        AppBar, PlayList, PlayingSong,
    },
    computed: {},
    watch: {},
    methods: {
        async validateAndAddSong() {
            const videoInfo = await this.axios.post('/video',{url: this.searchedSong});
            this.currentPlayingSong = new Song(videoInfo.data);
        }
    },
}
</script>

<style scoped>
    .round-container {
        border: 3px solid #B7A587;
        border-radius: 4px;
    }
</style>