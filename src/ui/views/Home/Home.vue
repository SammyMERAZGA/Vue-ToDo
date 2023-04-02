<template>
  <v-container class="pa-5">
    <h1 class="text-center">To Do Beast</h1>
    <v-row align="center" justify="center">
      <img id="beast" src="@/assets/gohan.jpeg" alt="Beast" width="500" />
    </v-row>
    <v-row align="center" justify="center">
      <h1 class="overline indigo--text text-center">Ajouter une note</h1>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn class="rounded-xl mt-2" color="blue darken-4" dark>
        <v-icon>mdi-note-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="pa-5" justify="center" align="center">
      <v-card
        v-for="note in notes"
        :key="note.id"
        class="pa-5 ma-5 elevation-5"
        width="300"
        variant="outlined"
      >
        <v-card-item>
          <div>
            <div class="text-overline mb-1">{{ note.category }}</div>
            <div class="text-h6 mb-1">{{ note.title }}</div>
            <div class="text-caption">{{ note.description }}</div>
          </div>
        </v-card-item>
        <v-card-actions>
          <v-btn color="#00296b" icon small>
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn color="#fd2a65" icon small>
            <v-icon>mdi-trash-can</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped src="./style.css"></style>
