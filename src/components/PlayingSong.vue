<template>
    <v-card flat>
        <v-row class="ma-2">
            <v-avatar class="ma-3" size="125">
                <v-img :class="imageClass" :src="song.thumbnails[0].url" />
            </v-avatar>
		
            <v-col>	
                <div>
                    <v-card-title class="pl-0 pt-0" style="overflow: hidden; text-overflow: ellipsis;">
                        <v-icon color="secondary" class="mr-2"> mdi-music </v-icon>
                        {{ song.title }}
                    </v-card-title>
                    <v-card-subtitle class="pl-0 pt-0">
                        <v-icon color="secondary" class="mr-2"> mdi-account-music </v-icon>
                        {{ song.ownerChannelName }}
                    </v-card-subtitle>
                </div>

                <v-sheet class="d-flex justify-center">
                    <v-btn
                        icon
                        x-large
                        class="mr-2">
                        <v-icon size="54" color="secondary"> mdi-skip-previous </v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        x-large
                        @click="handleClick"
                        class="mr-2">
                        <v-icon size="58" color="secondary"> {{ playButtonIcon }} </v-icon>
                    </v-btn>
                    <v-btn
                        icon
                        x-large
                        class="mr-2">
                        <v-icon size="54" color="secondary"> mdi-skip-next </v-icon>
                    </v-btn>
                </v-sheet>
            </v-col>	
        </v-row>
    </v-card>
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
