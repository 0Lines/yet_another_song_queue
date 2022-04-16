<template>
    <v-sheet class="d-flex align-center">
		<v-avatar class="ml-4" size="125">
			<v-img :class="imageClass" :src="song.thumbnails[0].url" />
		</v-avatar>

		<v-card flat min-width="0" width="100%">
			<v-card-title class="d-block text-truncate">
				<v-icon class="mr-2" color="secondary"> mdi-music </v-icon>{{ song.title }}
			</v-card-title>
			
			<v-card-subtitle class="d-block text-truncate">
				<v-icon class="mr-2" color="secondary"> mdi-account-music </v-icon>{{ song.ownerChannelName }}
			</v-card-subtitle>

			<v-card-actions class="justify-center">
				<v-btn icon x-large>
					<v-icon size="54" color="secondary"> mdi-skip-previous </v-icon>
				</v-btn>

				<v-btn icon x-large @click="handleClick">
					<v-icon size="58" color="secondary"> {{ playButtonIcon }} </v-icon>
				</v-btn>

				<v-btn icon x-large>
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
    data(){
        return {
            isPlaying: true,
        }
    },
    directives: {},
    components: {},
    computed: {
        playButtonIcon() {
            return this.isPlaying ? 'mdi-pause-circle' : 'mdi-play-circle'
        },
        imageClass() {
            return this.isPlaying ? 'spin' : ''
        },
    },
    watch: {},
    methods: {
        handleClick() {
            this.isPlaying ? this.stop() : this.play()
        },
        play() {
            this.isPlaying = true
        },
        stop() {
            this.isPlaying = false
        }
    },
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
</style>
