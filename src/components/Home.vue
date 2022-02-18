<template>
    <v-container>
        <v-row no-gutters class="my-5">
            <v-col cols="12" class="round-container pa-2">
                <v-text-field
                    label="Search"
                    single-line
                    outlined
                    color="secondary"
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                ></v-text-field>
            </v-col>
        </v-row>

        <v-list class="round-container">
            <SongListCard v-for="n in 6" :key="n"/>
        </v-list>
    </v-container>
</template>

<script>
import SongListCard from "@/components/SongListCard.vue"

export default {
    props: {},
    mixins: {},
    data(){
        return {
        }
    },
    directives: {},
    components: { SongListCard },
    computed: {},
    watch: {},
    methods: {},
}
</script>

<style>
</style>