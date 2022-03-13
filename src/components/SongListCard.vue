<template>
    <v-list-item>
        <v-list-item-avatar>
            <v-icon class="secondary">mdi-music</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
            <v-list-item-title>{{ song.name }}</v-list-item-title>

            <v-list-item-subtitle>{{ song.artist }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action>
            <v-btn @click="remove" icon>
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
        remove() {
            if(confirm("Tem certeza que deseja remover essa musica?"))
                this.$emit("remove", this.index);
        }
    },
}
</script>

<style>
</style>