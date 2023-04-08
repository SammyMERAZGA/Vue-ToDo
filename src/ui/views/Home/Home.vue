<template>
  <v-container class="pa-5">
    <h1 class="text-center pa-3 indigo--text">To Do Beast</h1>
    <FilterBar />
    <v-row align="center" justify="center">
      <h1 class="overline indigo--text text-center">Ajouter une note</h1>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn class="rounded-xl mt-2 mb-2" color="blue darken-4" dark>
        <v-icon>mdi-note-plus</v-icon>
      </v-btn>
    </v-row>
    <v-row class="mb-5" justify="center" align="center">
      <v-card
        v-for="note in notes"
        :key="note.id"
        class="pa-5 ma-5 elevation-5 rounded-xl borderCard"
        width="300"
        variant="outlined"
      >
        <v-card-item>
          <div>
            <div class="text-overline text-center mb-1">
              {{ note.category }}
            </div>
            <div><v-divider></v-divider></div>
            <div class="text-h5 text-center ma-2">{{ note.title }}</div>
            <div class="text-caption text-center">{{ note.description }}</div>
            <div><v-divider class="ma-3"></v-divider></div>
          </div>
        </v-card-item>
        <v-card-action>
          <div class="text-overline indigo--text text-center mb-1">
            {{ note.status }}
          </div>
          <div><v-divider class="ma-3"></v-divider></div>
          <div align="center">
            <v-btn color="blue darken-4" icon small>
              <v-icon>mdi-calendar-clock</v-icon>
            </v-btn>
            <v-btn color="orange darken-2" icon small>
              <v-icon>mdi-progress-helper</v-icon>
            </v-btn>
            <v-btn color="green" icon small>
              <v-icon>mdi-check-decagram</v-icon>
            </v-btn>
          </div>
        </v-card-action>
      </v-card>
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
