<template>
    <v-sheet>
		<SearchBar class="round-container mb-5"/>

		<PlayingSong v-if="playlist.length > 0" class="round-container mb-5" :song="currentPlayingSong" />

		<PlayList :playlist="playlist" class="round-container mb-5"/>

		<v-btn @click="copyRoomUrl">Share Room</v-btn>
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
        PlayList, 
        PlayingSong,
        SearchBar,
    },
    computed: {
        ...mapGetters({
            currentPlayingSong: 'room/currentPlayingSong',
            playlist: 'room/playlist',
        }),
    },
    watch: {},
    methods: {
		testeSocket() {
			this.$socket.emit('eventFromClientTest1', 1);
		},
		testeSocket2() {
			this.$socket.emit('eventFromClientTest2', { customVar: [1, 2, 3], customVar2: "rbc" });
		},
		copyRoomUrl() {
			navigator.clipboard.writeText(window.location.href);
		}
	}
}
</script>

<style scoped>
    .round-container {
        border: 3px solid #B7A587;
        border-radius: 4px;
    }
</style>
