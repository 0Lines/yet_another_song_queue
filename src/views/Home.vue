<template>
    <v-card tile height="100vh">
        <AppBar />

        <v-main app>
            <v-container class="pa-6">
                <SearchBar class="round-container mb-5"/>

				<PlayingSong v-show="songQueue.length > 0 || 1==1" class="round-container mb-5" :song="currentPlayingSong" />

				<PlayList :playList="songQueue" class="round-container"/>
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

import { mapGetters } from 'vuex'

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
        ...mapGetters({
            currentPlayingSong: 'playlist/currentPlayingSong',
            songQueue: 'playlist/songQueue',
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
