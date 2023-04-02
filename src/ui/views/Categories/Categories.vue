<template>
  <v-container class="pa-5">
    <h1 class="text-center">Liste des catégories</h1>
    <v-row align="center" justify="center">
      <img
        class="mt-5"
        src="@/assets/category.png"
        alt="Category image from storyset"
        width="300"
      />
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <h1 class="overline indigo--text text-center">Ajouter une catégorie</h1>
        <AddCategory />
      </v-col>
    </v-row>
    <v-row justify="center">
      <v-card width="1200" class="rounded-xl mt-8 table-card" elevation="5">
        <v-data-table
          :headers="headersCategoriesTable"
          :items="categories"
          :item-class="colorRow"
          :footer-props="{
            'items-per-page-text': 'Nb éléments par page',
            'items-per-page-all-text': 'Tout',
            'items-per-page-options': [10, 20, -1],
          }"
        >
          <template v-slot:no-data>
            <h1>Aucun résultats</h1>
          </template>
          <template v-slot:[`footer.page-text`]="props">
            <span v-if="props.itemsLength > 1"
              >{{ props.pageStart }}/{{ props.pageStop }} de
              {{ props.itemsLength }}</span
            >
          </template>
          <template v-slot:[`item.actions`]="{ item }">
            <v-btn icon @click="editCategory(item)">
              <v-icon small color="indigo darken-1"> mdi-pencil </v-icon>
            </v-btn>
            <v-btn icon>
              <v-icon
                small
                color="pink lighten-1"
                @click="deleteCategory(item.id)"
              >
                mdi-delete
              </v-icon>
            </v-btn>
          </template>
        </v-data-table>
      </v-card>
    </v-row>
    <!-- DIALOG UPDATE -->
    <v-dialog
      class="mb-15"
      v-model="updateCategoryDialog"
      persistent
      max-width="600px"
    >
      <v-card class="rounded-xl">
        <v-toolbar color="#023e8a" class="mb-5" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-pencil-circle-outline</v-icon>
                Modifier une catégorie</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="category.name"
                  label="Nom de la catégorie*"
                  placeholder="Entrer le nouveau nom de la catégorie"
                  prepend-icon="mdi-tag"
                  color="#fd2a65"
                  :rules="nameRules"
                  :counter="50"
                  clearable
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="category.description"
                  label="Description"
                  prepend-icon="mdi-text-box"
                  placeholder="Entrer la nouvelle description de la catégorie"
                  color="#fd2a65"
                  clearable
                  filled
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn class="rounded-xl" color="black" text @click="clear()">
            Tout effacer
          </v-btn>
          <v-btn
            class="rounded-xl"
            color="red"
            text
            @click="updateCategoryDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn
            class="rounded-xl"
            color="indigo"
            text
            @click="updateCategory()"
          >
            Modifier
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- SNACKBAR -->
    <!-- Update category -->
    <Snackbar
      message="Votre catégorie a bien été modifiée."
      color="blue"
      ref="snackbarUpdateCategory"
    />
    <!-- Delete category -->
    <Snackbar
      message="Votre catégorie a bien été supprimée."
      color="pink lighten-1"
      ref="snackbarDeleteCategory"
    />
  </v-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped src="./style.css"></style>
