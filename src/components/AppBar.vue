<template>
    <v-app-bar color="primary" flat app>
        <v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
        <v-spacer></v-spacer>

        <span class="mr-3">{{random_name}}</span>
        <v-avatar size="45">
            <!-- gerar imagem random também -->
            <img alt="user" src="https://cdn.pixabay.com/photo/2020/06/24/19/12/cabbage-5337431_1280.jpg">
        </v-avatar>
    </v-app-bar>
</template>

<script>
import names from "@/plugins/name"

export default {
    props: {},
    mixins: {},
    data(){
        return {
            random_name: "",
        }
    },
    directives: {},
    components: {},
    computed: {},
    watch: {},
    methods: {
        capFirst(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        generateRandomNick() {
            let firstname = this.capFirst(`${names.firstnames[this.getRandomInt(0, names.firstnames.length + 1)]}`);
            let lastname = this.capFirst(`${names.lastnames[this.getRandomInt(0, names.lastnames.length + 1)]}`);

            this.random_name = `${firstname} ${lastname}`
        },
    },
    mounted() {
        this.generateRandomNick();
    }
}
</script>

<style>
</style>