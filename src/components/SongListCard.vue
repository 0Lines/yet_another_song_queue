<template>
    <v-list-item>
        <v-list-item-avatar>
            <v-icon class="secondary" dark>mdi-music</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>{{ song.name }}</v-list-item-title>

            <v-list-item-subtitle>{{ song.artist }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-btn @click="deleteSong" icon>
                <v-icon color="warning">mdi-close</v-icon>
            </v-btn>
        </v-list-item-action>
      </v-list-item>
</template>

<script>

export default {
    props: {
        index: {
            required: true,
            type: Number,
        },
        song: {
            required: true,
            type: Object,
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
    methods: {
        deleteSong() {
            if(confirm("Tem certeza que deseja remover essa musica?"))
                this.$emit("deleteSong", this.index);
        }
    },
}
</script>

<style>
</style>