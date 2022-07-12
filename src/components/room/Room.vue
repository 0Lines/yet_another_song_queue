<template>
    <v-sheet>
		<SearchBar class="round-container mb-5"/>

		<SongPlayer
			class="round-container mb-5"
			v-if="currentPlayingSong.id_song"
			:songName="currentPlayingSong.name"
			:songArtist="currentPlayingSong.artist"
			:songThumbNail="currentPlayingSong.thumbnail_link"
			:isPlaying="isPlaying"
			@play="requestPlay"
			@pause="requestPause"
		/>

		<youtube v-if="currentPlayingSong.id_song" :video-id="currentPlayingSong.videoid" ref="youtube" style="height: 200px;"/>

		<PlayList :playlist="playlist" class="round-container mb-5"/>
    </v-sheet>
</template>

<script>
import SongPlayer from '@/components/SongPlayer.vue'
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
        PlayList, SongPlayer, SearchBar,
    },
    computed: {
        ...mapGetters({
            currentPlayingSong: 'room/currentPlayingSong',
            playlist: 'room/playlist',
            isPlaying: 'room/isPlaying',
            roomInfo: 'room/roomInfo',
        }),
    },
    watch: {},
    methods: {
		requestPlay() {
			this.$socket.emit('play', this.roomInfo.id_room)
		},
		requestPause() {
			this.$socket.emit('pause', this.roomInfo.id_room)
		},
		requestPreviousSong() {
			//TODO MAYBE SOME BEHAVIOUR OF RETURNING TO THE BEGINING OF THE SONG AND IF USER CLICKS AGAIN GO TO PREVIOUS SONG
			this.$store.dispatch('room/previousSong');
		},
		requestNextSong() {
            this.$store.dispatch('room/nextSong');
		},
		jumpYTComponentTimeTo(time) {
			this.$refs.youtube?.player.seekTo(time); 
		},
		playYTComponent() {
            this.$refs.youtube?.player.playVideo();
		},
		pauseYTComponent() {
			this.$refs.youtube?.player.pauseVideo();
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
