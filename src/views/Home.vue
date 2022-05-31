<template>
    <v-card tile flat min-height="100vh">
        <AppBar />

        <v-main app>
            <v-container class="pa-6">
                <SearchBar class="round-container mb-5"/>

				<PlayingSong v-show="songQueue.length > 0" class="round-container mb-5" :song="currentPlayingSong" />

				<PlayList :playList="songQueue" class="round-container mb-5"/>

				<v-btn @click="testeSocket">socketTest1</v-btn>
				<v-btn @click="testeSocket2">socketTest2</v-btn>
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
    methods: {
		testeSocket() {
			this.$socket.emit('eventFromClientTest1', 1);
		},
		testeSocket2() {
			this.$socket.emit('eventFromClientTest2', { customVar: [1, 2, 3], customVar2: "rbc" });
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
