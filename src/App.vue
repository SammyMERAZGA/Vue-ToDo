<template>
  <v-app>
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Sidebar from "@/ui/components/Sidebar/Sidebar.vue";

@Component({
  components: {
    Sidebar,
  },
})
export default class App extends Vue {}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
#app {
  font-family: "Poppins", sans-serif;
}
</style>
