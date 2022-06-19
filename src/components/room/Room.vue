<template>
    <v-sheet>
		<SearchBar class="round-container mb-5"/>

		<PlayingSong v-if="currentPlayingSong" class="round-container mb-5" :song="currentPlayingSong" />

		<PlayList :playlist="playlist" class="round-container mb-5"/>
    </v-sheet>
</template>

<script>
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
        PlayList, PlayingSong, SearchBar,
    },
    computed: {
        ...mapGetters({
            currentPlayingSong: 'room/currentPlayingSong',
            playlist: 'room/playlist',
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
