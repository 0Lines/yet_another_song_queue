<template>
    <v-card flat>
        <div class="d-flex">
            <v-avatar class="ma-3" size="125" tile>
                <v-img :src="song.thumbnails[0].url"></v-img>
            </v-avatar>
			
            <div>
                <v-card-title class="text-h5">{{ song.title }}</v-card-title>
                <v-card-subtitle>{{ song.ownerChannelName }}</v-card-subtitle>
            </div>
        </div>
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
        }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {},
}
</script>

<style>
</style>