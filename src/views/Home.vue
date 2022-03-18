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

				<PlayingSong 
                    v-if="playlist.songs.length > 0" 
                    :song="playlist.playingSong" 
                    class="round-container my-5"
                />

				<PlayList :playList="playlist.songs" class="round-container"/>
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

import { mapState } from 'vuex'
import { mapActions } from 'vuex'

export default {
    props: {},
    mixins: {},
    data(){
        return {
            searchedSong: "",
        }
    },
    directives: {},
    components: { 
        AppBar, 
        PlayList, 
        PlayingSong,
    },
    computed: {
        ...mapState({
            playlist: state => state.playlist,
        }),
        ...mapActions(['playlist/loga'])
    },
    watch: {},
    methods: {
        async validateAndAddSong() {
            const videoInfo = await this.axios.post('/video',{url: this.searchedSong});
            const video = new Song(videoInfo.data);

            this.songs.push(video);

            this.currentPlayingSong = new Song(videoInfo.data);
        },
    },
    mounted() {
        console.log(this.playlist);
        this.$store.dispatch('playlist/loga');
        this.$store.dispatch('loga');
    }
}
</script>

<style scoped>
    .round-container {
        border: 3px solid #B7A587;
        border-radius: 4px;
    }
</style>