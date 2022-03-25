<template>
    <v-card tile height="100vh">
        <AppBar />
        <v-main app>
            <v-container class="pa-6">
                <v-sheet class="round-container pa-2 mb-5">
                    <v-text-field
                        dense
                        outlined
                        single-line
                        hide-details
                        label="Search"
                        color="secondary"
                        prepend-inner-icon="mdi-magnify"
                        v-model="searchedSong"
                        :loading="loadingSong"
                        :disabled="loadingSong"
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

export default {
    props: {},
    mixins: {},
    data(){
        return {
            searchedSong: "",
            loadingSong: false,
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
    },
    watch: {},
    methods: {
        async validateAndAddSong() {
            this.loadingSong = true;
            await this.$store.dispatch('playlist/validateAndAddSong', {url: this.searchedSong})
            this.loadingSong = false;
        },
    },
}
</script>

<style scoped>
    .round-container {
        border: 3px solid #B7A587;
        border-radius: 4px;
    }
</style>