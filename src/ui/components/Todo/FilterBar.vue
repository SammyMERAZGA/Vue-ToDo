<template>
  <v-card elevation="3" class="mb-10 rounded-xl px-3 py-2" id="card-filter">
    <div class="d-flex">
      <v-col class="d-flex" cols="4" sm="4" id="my-select">
        <v-autocomplete
          class="rounded-lg"
          label="Catégorie"
          :items="categories"
          item-text="name"
          item-value="id"
          no-data-text="Aucune catégorie"
          hide-details="true"
          color="#fd2a65"
          outlined
          dense
          clearable
        ></v-autocomplete>
      </v-col>
      <v-col class="d-flex" cols="4" sm="4" id="my-select">
        <v-autocomplete
          label="Statut"
          :items="statuses"
          item-text="name"
          item-value="id"
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
          :items="favoritesTodos"
          item-text="title"
          item-value="id"
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
// Entities
import { Category } from "@/entities/types/Category";
import { Status } from "@/entities/types/Status";
import { Todo } from "@/entities/types/Todo";
// Services
import { getCategories, getFavoriteTodos, getStatuses } from "@/services";

@Component
export default class FilterBar extends Vue {
  categories: Category[] = [];
  statuses: Status[] = [];
  favoritesTodos: Todo[] = [];

  async loadCategories(): Promise<void> {
    this.categories = await getCategories();
  }

  async loadStatuses(): Promise<void> {
    this.statuses = await getStatuses();
  }

  async loadTodosFavorites(): Promise<void> {
    this.favoritesTodos = await getFavoriteTodos();
  }

  mounted() {
    this.loadCategories();
    this.loadStatuses();
    this.loadTodosFavorites();
  }
}
</script>

<style scoped>
#my-select .v-text-field--outlined >>> fieldset {
  border: #fd2a65 2px solid !important;
}

#card-filter {
  border: 2px solid #0f4cae;
}

#my-select:hover .v-text-field--outlined >>> fieldset {
  border-color: #fd2a65;
  transition: border-color 0.3s ease-in-out;
}

#my-select:hover .v-autocomplete {
  transform: scale(1.05);
  transition: transform 0.3s ease-in-out;
}
</style>
