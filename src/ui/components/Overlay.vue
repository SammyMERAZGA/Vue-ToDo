<template>
  <v-overlay :value="overlay">
    <v-progress-circular
      color="#fd2a65"
      indeterminate
      size="64"
    ></v-progress-circular>
  </v-overlay>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Overlay extends Vue {
  overlay = false;
}
</script>
