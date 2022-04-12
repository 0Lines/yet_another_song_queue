<template>
    <v-card tile height="100vh">
        <AppBar />
        <v-main app>
            <v-container class="pa-6">
                <SearchBar />
				<PlayingSong 
                    v-if="playlist.songs.length > 0" 
                    :song="playlist.playingSong" 
                    class="round-container my-5"
                />
				<PlayList :playList="playlist.songs" class="round-container"/>
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
import AppBar from '@/components/AppBar.vue'
import PlayingSong from '@/components/PlayingSong.vue'
import PlayList from '@/components/PlayList.vue'
import SearchBar from '@/components/SearchBar.vue'

import { mapState } from 'vuex'

export default {
    props: {},
    mixins: {},
    data() {
        return { }
    },
    directives: {},
    components: { 
        AppBar, 
        PlayList, 
        PlayingSong,
        SearchBar,
    },
    computed: {
        ...mapState({
            playlist: state => state.playlist,
        }),
    },
    watch: {},
    methods: {},
}
</script>

<style scoped>
    .round-container {
        border: 3px solid #B7A587;
        border-radius: 4px;
    }
</style>
