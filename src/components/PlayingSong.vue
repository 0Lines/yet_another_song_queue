<template>
    <v-sheet class="d-flex align-center">
		<v-avatar class="ml-4" size="125">
			<v-img class="spin" :class="imageClass" :src="song.thumbnail_link" />
		</v-avatar>

        <youtube style="" :video-id="song.videoid" ref="youtube" />

		<v-card flat min-width="0" width="100%">
			<v-card-title class="d-block text-truncate">
				<v-icon class="mr-2" color="secondary"> mdi-music </v-icon>{{ song.name }}
			</v-card-title>
			
			<v-card-subtitle class="d-block text-truncate">
				<v-icon class="mr-2" color="secondary"> mdi-account-music </v-icon>{{ song.artist }}
			</v-card-subtitle>

			<v-card-actions class="justify-center">
				<v-btn icon x-large @="previousSong">
					<v-icon size="54" color="secondary"> mdi-skip-previous </v-icon>
				</v-btn>

				<v-btn icon x-large @click="handleClick">
					<v-icon size="58" color="secondary"> {{ playButtonIcon }} </v-icon>
				</v-btn>

				<v-btn icon x-large @click="nextSong">
					<v-icon size="54" color="secondary"> mdi-skip-next </v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-sheet>
</template>

<script>
import Song from "@/models/Song.js"

export default {
    props: {
        song: {
			type: Song,
		}
    },
    mixins: {},
    data() {
        return {
            videoId: ''
        }
    },
    directives: {},
    components: {},
    computed: {
        playButtonIcon() {
            return this.isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle'
        },
        imageClass() {
            return this.isPlaying ? 'running' : 'paused'
        },
        player() {
            return this.$refs.youtube.player
        },
        id_room() {
            return this.$store.state.room.roomInfo.id_room
        },
        isPlaying() {
            return this.$store.state.room.isPlaying
        },
    },
    watch: {},
    methods: {
        handleClick() {
            this.isPlaying ? this.stop() : this.play()
        },
        play() {
            this.$socket.emit('play', this.id_room)
        },
        stop() {
            this.$socket.emit('pause', this.id_room)
        },
        nextSong() {
            this.$store.dispatch('room/nextSong');
        },
        previousSong() {
            this.$store.dispatch('room/previousSong');
        },
    },
    created() {
        this.$socket.on('getCurrentState', (state) => {
            console.log('Current state is: ', state);
            if (state.isPlaying) {
                this.$store.dispatch('room/play');
                this.$refs.youtube.player.seekTo(state.startFrom); 
                this.$refs.youtube.player.playVideo()
            } else {
                this.$store.dispatch('room/pause');
                this.$refs.youtube.player.pauseVideo()
            }
        });
        this.$socket.on('getCurrentSong', (id_song) => {
            if (state.id_song && (state?.id_song != this.$store.playingSong))
                this.$store.dispatch('changePlayingSong', state.id_song);
        });
		this.$socket.on('play', (startFrom) => {
            this.$refs.youtube.player.seekTo(startFrom); 
            console.log("Current time: ", startFrom);
            console.log("RECEIVED: Play Music - Id Room: ", this.id_room)
	        this.$store.dispatch('room/play', this.id_room)
            this.$refs.youtube.player.playVideo()
		});
		this.$socket.on('pause', () => {
            console.log("RECEIVED: Pause Music - Id Room: ", this.id_room)
	        this.$store.dispatch('room/pause', this.id_room)
            this.$refs.youtube.player.pauseVideo()
		});
		this.$socket.on('changeCurrentSong', (id_song) => {
            console.log("RECEIVED: Change Current Song - Id Song: ", id_song);
	        this.$store.dispatch('room/changePlayingSong', id_song);
		});
    }
}
</script>

<style>
    @keyframes spinning {
        from { transform: rotate(0deg) }
        to { transform: rotate(360deg) }
    }
    .spin {
        animation-name: spinning;
        animation-duration: 3s;
        animation-iteration-count: infinite;
        animation-timing-function: linear;
    }
	.running {
		animation-play-state: running;
	}
	.paused {
		animation-play-state: paused;
	}
</style>
