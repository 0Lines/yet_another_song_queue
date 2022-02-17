<template>
  <v-app>
    <v-app-bar color="primary" dark flat rounded app>
      <v-toolbar-title>Yet Another Song Queue</v-toolbar-title>
    </v-app-bar>

    <v-main app>
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
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer color="primary" dark app>
      <v-col
        class="text-center"
        cols="12"
      >
        O ano é {{ new Date().getFullYear() }} e teu pai ainda...
      </v-col>
    </v-footer>
  </v-app>
</template>


<style>
.round-container {
  border: 3px solid #B7A587;
  border-radius: 4px;
}
</style>
