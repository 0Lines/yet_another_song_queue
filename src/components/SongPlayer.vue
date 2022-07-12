<template>
    <v-sheet class="d-flex align-center">
		<v-avatar class="ml-4" size="125">
			<v-img class="spin" :class="imageClass" :src="songThumbNail" />
		</v-avatar>

		<v-card flat min-width="0" width="100%">
			<v-card-title class="d-block text-truncate">
				<v-icon class="mr-2" color="secondary"> mdi-music </v-icon>{{ songName }}
			</v-card-title>
			
			<v-card-subtitle class="d-block text-truncate">
				<v-icon class="mr-2" color="secondary"> mdi-account-music </v-icon>{{ songArtist }}
			</v-card-subtitle>

			<v-card-actions class="justify-center">
				<v-btn icon x-large>
					<v-icon size="54" color="secondary" @click="previousSong"> mdi-skip-previous </v-icon>
				</v-btn>

				<v-btn icon x-large @click="playButtonFunction">
					<v-icon size="58" color="secondary"> {{ playButtonIcon }} </v-icon>
				</v-btn>

				<v-btn icon x-large>
					<v-icon size="54" color="secondary" @click="nextSong"> mdi-skip-next </v-icon>
				</v-btn>
			</v-card-actions>
		</v-card>

	</v-sheet>
</template>

<script>
export default {
    props: {
		songName: String,
		songArtist: String,
		songThumbNail: String,

		isPlaying: Boolean,
    },
    mixins: {},
    data() {
        return {
        }
    },
    directives: {},
    components: {},
    computed: {
        playButtonIcon() {
            return this.isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle'
        },
		playButtonFunction() {
			return this.isPlaying ? this.pause : this.play;
		},
        imageClass() {
            return this.isPlaying ? 'running' : 'paused'
        },
    },
    watch: {},
    methods: {
		play() {
			this.$emit('play');
		},
		pause() {
			this.$emit('pause');
		},
		previousSong() {
			this.$emit('previousSong');
		},
		nextSong() {
			this.$emit('nextSong');
        },
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
