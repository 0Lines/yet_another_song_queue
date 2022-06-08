<template>
    <v-sheet>
		<SearchBar class="round-container mb-5"/>

		<PlayingSong v-show="songQueue.length > 0" class="round-container mb-5" :song="currentPlayingSong" />

		<PlayList :playList="songQueue" class="round-container mb-5"/>

		<v-btn @click="testeSocket">socketTest1</v-btn>
		<v-btn @click="testeSocket2">socketTest2</v-btn>
		<v-btn @click="copyRoomUrl">Compartilhar sala</v-btn>
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
            songQueue: 'room/songQueue',
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
	},
	created() {
		//GAMBIARRA REGISTRAR SOCKET EVENT AQUI, MAS É SO DEMONSTRAÇÃO 
		this.$socket.on('retrieveFromServer', (msg) => {
			console.log("Received '" + JSON.stringify(msg) + "'' from server via 'retrieveFromServer' event");
		});
	}
}
</script>

<style scoped>
    .round-container {
        border: 3px solid #B7A587;
        border-radius: 4px;
    }
</style>
