<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
        color="#fd2a65"
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
    <v-dialog
      class="mb-15"
      v-model="addCategoryDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-row align="center" justify="center">
          <v-btn
            class="rounded-xl mt-5"
            color="blue darken-4"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-tag-plus</v-icon>
          </v-btn>
        </v-row>
      </template>
      <v-card class="rounded-xl no-scrollable">
        <v-toolbar class="mb-5" color="indigo darken-4" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-plus-circle-outline</v-icon>
                Ajouter une catégorie</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-row align="center" justify="center">
          <v-img
            src="@/assets/category.png"
            height="200"
            max-width="200"
          ></v-img>
        </v-row>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="name"
                  label="Nom de la catégorie*"
                  placeholder="Entrer le nom de la catégorie"
                  prepend-icon="mdi-tag"
                  color="#fd2a65"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Description*"
                  prepend-icon="mdi-tag"
                  placeholder="Entrer la description de la catégorie"
                  color="#fd2a65"
                  filled
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            class="rounded-xl"
            color="red"
            text
            @click="addCategoryDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn class="rounded-xl" color="indigo" text @click="addCategory()">
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- SNACKBAR -->
    <!-- Add category -->
    <v-snackbar color="green" v-model="snackbarAddCategory"
      >Votre catégorie a bien été ajoutée !
      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text
          v-bind="attrs"
          @click="snackbarAddCategory = false"
        >
          Fermer
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";
import Component from "vue-class-component";
import Categories from "@/ui/views/Categories";

@Component
export default class AddCategory extends Vue {
  name = "";
  description = "";

  addCategoryDialog = false;
  snackbarAddCategory = false;
  overlay = false;

  addCategory(): void {
    this.overlay = true;
    axios
      .post(process.env.VUE_APP_MOCKAPI_URL + `/category`, {
        name: this.name,
        description: this.description,
        createdAt: new Date(),
      })
      .then(() => {
        this.overlay = false;
        (this.$parent as Categories).getCategories();
        this.snackbarAddCategory = true;
        this.addCategoryDialog = false;
        this.name = "";
        this.description = "";
      });
  }
}
</script>
