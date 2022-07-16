<template>
    <v-sheet>
		<SearchBar class="round-container mb-5"/>

		<SongPlayer
			class="round-container mb-5"
			v-if="mirroredJukebox.playingSong"
			:songName="mirroredJukebox.playingSong.name"
			:songArtist="mirroredJukebox.playingSong.artist"
			:songThumbNail="mirroredJukebox.playingSong.thumbnail_link"
			:isPlaying="mirroredJukebox.isPlaying"
			@play="requestPlay"
			@pause="requestPause"
			@previousSong="requestPreviousSong"
			@nextSong="requestNextSong"
		/>

		<youtube :video-id="mirroredJukebox.playingSong.videoid" ref="youtube" style="height: 200px;"/>

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
            roomInfo: 'room/roomInfo',
            mirroredJukebox: 'room/mirroredJukebox',
            playlist: 'room/playlist',
        }),
		mirroredJukeboxClone() { //THIS CLONE IS A FIX FOR 'BUG' https://stackoverflow.com/questions/50682261/vue-watch-array-push-same-old-and-new-values
			return JSON.parse(JSON.stringify(this.mirroredJukebox));
		}
    },
    watch: {
		mirroredJukeboxClone: {
			handler(newVal, oldVal) {
				if(!oldVal.playingSong?.id_song || oldVal.playingSong.id_song != newVal.playingSong.id_song) {
					setTimeout(() => { this.handleJukeboxChanges(newVal); }, 3000); //TODO THIS IS BAD (its waiting for the yt component to 'load')
				} else {
					this.handleJukeboxChanges(newVal);
				}
			},
			deep: true
		}
	},
    methods: {
		handleJukeboxChanges(newVal) {
			if(newVal.isPlaying) {
				this.$refs.youtube?.player.seekTo((Date.now() - newVal.startedAt)/1000); 
				this.$refs.youtube?.player.playVideo();
			} else {
				this.$refs.youtube?.player.seekTo((newVal.stoppedAt - newVal.startedAt)/1000); 
				this.$refs.youtube?.player.pauseVideo();
			}
		},
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
	},
}
</script>

<style scoped>
    .round-container {
        border: 3px solid #B7A587;
        border-radius: 4px;
    }
</style>
