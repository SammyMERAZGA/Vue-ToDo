<template>
  <v-snackbar
    v-model="showSnackbar"
    :color="color"
    :top="top"
    :bottom="bottom"
    :right="right"
    :left="left"
  >
    {{ message }}
    <template v-slot:action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="showSnackbar = false">
        Fermer
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class Snackbar extends Vue {
  @Prop(String) message!: string;
  @Prop(String) color!: string;
  @Prop(Boolean) top?: boolean;
  @Prop(Boolean) bottom?: boolean;
  @Prop(Boolean) right?: boolean;
  @Prop(Boolean) left?: boolean;

  showSnackbar = false;

  show() {
    this.showSnackbar = true;
  }
}
</script>
