<template>
  <v-card elevation="3" class="mb-10 rounded-xl px-3 py-2" id="card-filter">
    <div class="d-flex">
      <v-col class="d-flex" cols="4" sm="4" id="my-select">
        <v-autocomplete
          label="Catégorie"
          hide-details="true"
          class="rounded-lg"
          color="#fd2a65"
          no-data-text="Aucune catégorie"
          outlined
          dense
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex" cols="4" sm="4" id="my-select">
        <v-autocomplete
          label="Statut"
          hide-details="true"
          class="rounded-lg"
          color="#fd2a65"
          no-data-text="Aucun statut"
          outlined
          dense
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex" cols="4" sm="4" id="my-select">
        <v-autocomplete
          label="Favoris"
          hide-details="true"
          class="rounded-lg"
          color="#fd2a65"
          no-data-text="Aucun favori"
          outlined
          dense
          clearable
        ></v-autocomplete>
      </v-col>
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class FilterBar extends Vue {}
</script>

<style scoped>
#my-select .v-text-field--outlined fieldset {
  border: #fd2a65 1px solid !important;
}

#card-filter {
  border: 1px solid #0b1fd0;
}
</style>
