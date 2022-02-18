<template>
    <v-container>
        <v-row no-gutters>
            <v-col cols="12" class="round-container pa-2">
                <v-text-field
                    label="Search"
                    single-line
                    outlined
                    color="secondary"
                    prepend-inner-icon="mdi-magnify"
                    hide-details
                ></v-text-field>
                <v-icon>mdi-magnify</v-icon>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
export default {
    props: {},
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