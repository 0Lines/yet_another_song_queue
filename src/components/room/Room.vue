<template>
    <v-sheet>
		<SearchBar class="round-container mb-5"/>

		<SongPlayer
			v-if="mirroredJukebox.playingSong.id_song"
			class="round-container mb-5"
			:loading="fakeLoadingSong"
			:songName="mirroredJukebox.playingSong.name"
			:songArtist="mirroredJukebox.playingSong.artist"
			:songThumbNail="mirroredJukebox.playingSong.thumbnail_link"
			:isPlaying="mirroredJukebox.isPlaying"
			@play="requestPlay"
			@pause="requestPause"
			@previousSong="requestPreviousSong"
			@nextSong="requestNextSong"
		/>

		<youtube
			ref="youtube"
			:video-id="mirroredJukebox.playingSong.videoid"
			style="height: 200px;"
			@ready="cued"
			@cued="cued"
			@buffering="buffering"
		/>

		<PlayList :playlist="playlist" class="round-container mb-5"/>

		<ConfirmationDialog ref="confirmationDialog" @rejected="1==1" @accepted="playFromConfirmation">
			<div>Gostaria de escutar as músicas desta sala?</div>
		</ConfirmationDialog>
    </v-sheet>
</template>

<script>
import SongPlayer from '@/components/SongPlayer.vue'
import PlayList from '@/components/PlayList.vue'
import SearchBar from '@/components/SearchBar.vue'
import ConfirmationDialog from '@/components/ConfirmationDialog.vue'

import { mapGetters } from 'vuex'

export default {
    props: {},
    mixins: {},
    data() {
        return {
			waitingForBuffering: false,
		}
    },
    directives: {},
    components: { 
        PlayList, SongPlayer, SearchBar, ConfirmationDialog
    },
    computed: {
        ...mapGetters({
            roomInfo: 'room/roomInfo',
            mirroredJukebox: 'room/mirroredJukebox',
            playlist: 'room/playlist',
        }),
		mirroredJukeboxClone() { //THIS CLONE IS A FIX FOR A KNOWN 'BUG' https://stackoverflow.com/questions/50682261/vue-watch-array-push-same-old-and-new-values
			return JSON.parse(JSON.stringify(this.mirroredJukebox));
		},
		fakeLoadingSong: {
			get() {
				return this.$store.state.room.fakeLoadingSong;
			},
			set(v) {
				this.$store.state.room.fakeLoadingSong = v;
			}
		}
    },
    watch: {
		mirroredJukeboxClone: {
			handler(newVal) {
				this.handleSongChanges(newVal);
			},
			deep: true
		},
	},
	methods: {
		playFromConfirmation() {
			this.handleSongChanges(this.mirroredJukeboxClone);
		},
		cued() {
			console.log("cued");
			this.waitingForBuffering = true;
			this.$refs.youtube?.player.playVideo();//TODO CATCH THE FATHER :)
		},
		buffering() {
			console.log("buffering");
			if(this.waitingForBuffering) {
				this.waitingForBuffering = false;
				this.fakeLoadingSong = false;
				this.handleSongChanges(this.mirroredJukeboxClone);
			}
		},
		handleSongChanges(newVal) {
			console.warn(newVal);
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
	mounted() {
		this.$refs.confirmationDialog.openConfirmationDialog();
		this.fakeLoadingSong = true;
	}
}
</script>

<style scoped>
    .round-container {
        border: 3px solid #B7A587;
        border-radius: 4px;
    }
</style>
