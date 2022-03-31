<template>
    <v-sheet class="round-container pa-2 mb-5">
        <v-text-field
            dense
            outlined
            single-line
            hide-details
            label="Search"
            color="secondary"
            prepend-inner-icon="mdi-magnify"
            v-model="searchString"
            :loading="loadingSong"
            :disabled="loadingSong"
            @keydown.enter="validateAndAddSong">
        </v-text-field>
    </v-sheet>
</template>

<script>
export default {
    props: {},
    mixins: {},
    data(){
        return {
            searchString: '',
            loadingSong: false,
        }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
        async validateAndAddSong() {
            this.loadingSong = true
            await this.$store.dispatch('playlist/validateAndAddSong', { url: this.searchString })
            this.searchString = '' 
            this.loadingSong = false
        },
    },
}
</script>

<style>
</style>
