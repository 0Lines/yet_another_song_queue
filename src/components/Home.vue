<template>
    <v-container class="d-flex flex-column">
        <v-row no-gutters class="justify-center">
            <v-col cols="10">
                <v-sheet class="round-container pa-2 my-5">
                    <v-text-field
                        label="Search"
                        single-line
                        outlined
                        color="secondary"
                        prepend-inner-icon="mdi-magnify"
                        hide-details
                        dense
                        height="20px"
                        v-model="songUrl"
                        @keyup.enter="validateAndSong"
                    ></v-text-field>
                </v-sheet>
                <v-list class="round-container">
                    <SongListCard v-for="(song, n) in songs" :key="n" :index="n" :song="song" @deleteSong="remove"/>
                </v-list>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SongListCard from "@/components/SongListCard.vue"

export default {
    props: {},
    mixins: {},
    data(){
        return {
            songs: [
                {name: "bu", artist: "oia"},
                {name: "asdasdsa", artist: "lelele"},
                {name: "caraio", artist: "oloco"},
            ],
            songUrl: "",
        }
    },
    directives: {},
    components: { SongListCard },
    computed: {},
    watch: {},
    methods: {
        validateAndAddSong() {

        },
        remove(index) {
            this.songs.splice(index, 1);
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