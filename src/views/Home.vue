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
                        @keyup.enter="validateAndAddSong"
                    ></v-text-field>
                </v-sheet>
                <v-container class="round-container pa-0 my-5">
                    <PlayingSong />
                </v-container>
                <v-list v-if="songs.length > 0" class="round-container">
                    <SongListCard 
                        v-for="(song, n) in songs" 
                        :key="n" 
                        :index="n" 
                        :song="song" 
                        @deleteSong="remove"
                    />
                </v-list>
                <v-container v-else class="round-container pa-0 my-5">
                    <v-card elevation="0">
                        <v-card-title class="justify-center">
                            <span>Your playlist is empty!🤠</span>
                        </v-card-title>
                        <v-card-text class="text-center">
                            Add songs by pasting the youtube or spotify link into the search bar. 🔥
                        </v-card-text>
                    </v-card>
                </v-container>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import SongListCard from "@/components/SongListCard.vue"
import PlayingSong from "@/components/PlayingSong.vue"
import ytdl from "ytdl-core"

export default {
    props: {},
    mixins: {},
    data(){
        return {
            songs: [],
            songUrl: "",
        }
    },
    directives: {},
    components: { 
        SongListCard, 
        PlayingSong,
    },
    computed: {},
    watch: {},
    methods: {
        async validateAndAddSong() {
            const info = await ytdl.getInfo(this.songUrl);
            console.log(info);
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