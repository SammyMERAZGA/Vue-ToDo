<template>
  <v-app>
    <Sidebar />
    <v-main>
      <router-view />
    </v-main>
    <Footer />
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import Sidebar from "@/ui/components/Sidebar/Sidebar.vue";
import Footer from "@/ui/components/Footer.vue";

@Component({
  components: {
    Sidebar,
    Footer,
  },
})
export default class App extends Vue {}
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
#app {
  font-family: "Poppins", sans-serif;
}

.no-scrollable {
  overflow-x: hidden;
  overflow-y: hidden;
}

.borderBtn {
  border: #0f4cae 2px solid !important;
  color: #fff;
  font-weight: 900;
}

.borderBtn:hover {
  transition: all 0.3s;
  transform: scale(1.3);
}
</style>
