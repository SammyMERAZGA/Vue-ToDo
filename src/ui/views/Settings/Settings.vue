<template>
  <div>
    <h1 class="text-center mt-3">Paramètres</h1>
    <v-row align="center" justify="center">
      <img
        class="mr-15"
        src="@/assets/svg/settings.svg"
        alt="settings image from storyset"
        width="300"
      />
    </v-row>
    <v-row justify="center" align="center">
      <v-col class="d-flex" cols="12" sm="6">
        <v-select
          class="rounded-lg"
          :items="languages"
          item-text="name"
          item-value="code"
          label="Langue du site"
          color="#fd2a65"
          disabled
        ></v-select>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn class="rounded-lg white--text" tile color="#0f4cae">
        <v-icon color="white" left> mdi-content-save </v-icon>
        Enregistrer les modifications
      </v-btn>
    </v-row>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
