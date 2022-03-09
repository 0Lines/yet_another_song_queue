<template>
    <v-card dark>
        <div class="d-flex flex-no-wrap">
            <v-avatar class="ma-3" size="125" tile>
                <v-img :src="thumbsrc"></v-img>
            </v-avatar>
            <div>
                <v-card-title class="text-h5">{{ playingSong.title }}</v-card-title>
                <v-card-subtitle>{{ playingSong.ownerChannelName }}</v-card-subtitle>
            </div>
        </div>
    </v-card>
</template>

<script>

export default {
    props: {
        playingSong:  {
            type: Object,
            required: true
        },
        thumbsrc: {
            type: String,
            required: true
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