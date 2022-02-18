<template>
  <v-app>
    <v-app-bar color="primary" dark flat rounded app>
      <v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
    </v-app-bar>

    <v-main app>
      <transition name="fade">
        <router-view></router-view>
      </transition>
    </v-main>

    <v-footer color="primary" dark app>
      <v-col class="text-center" cols="12">
        O ano é {{ new Date().getFullYear() }} e teu pai ainda...
      </v-col>
    </v-footer>
  </v-app>
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

<style scoped>
</style>
