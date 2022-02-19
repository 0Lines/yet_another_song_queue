<template>
  <v-app>
    <AppBar />
    <v-main app>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-main>

    <v-footer color="primary" dark app>
      <v-col class="text-center" cols="12">
        O ano é {{ new Date().getFullYear() }} e teu pai ainda PASSA NO AMEX...
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import AppBar from "@/components/AppBar.vue"

export default {
    props: {},
    mixins: {},
    data(){
        return {
        }
    },
    directives: {},
    components: {
      AppBar
    },
    computed: {},
    watch: {},
    methods: {},
}
</script>

<style>
  .round-container {
      border: 3px solid #B7A587 !important;
      border-radius: 4px !important;
  }
</style>
