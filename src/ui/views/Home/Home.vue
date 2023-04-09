<template>
  <v-container class="pa-5">
    <h1 id="title">To Do Beast</h1>
    <FilterBar />
    <v-row align="center" justify="center">
      <h1 class="overline black--text text-center">Ajouter une note</h1>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn class="rounded-xl mt-2 mb-2 borderBtn" color="#fd2a65" dark>
        <v-icon>mdi-note-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mt-10 mb-5" justify="center" align="center">
      <Card />
    </v-row>
    <v-pagination
      v-model="page"
      color="#fd2a65"
      :length="4"
      circle
    ></v-pagination>
  </v-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped src="./style.css"></style>
