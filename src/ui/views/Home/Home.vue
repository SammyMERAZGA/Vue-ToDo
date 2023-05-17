<template>
  <v-container class="pa-5">
    <h1 id="title">To Do Beast</h1>
    <FilterBar />
    <v-row align="center" justify="center">
      <v-col cols="12" sm="4">
        <h1 class="overline black--text text-center">Ajouter une tâche</h1>
        <AddTodo />
      </v-col>
    </v-row>
    <v-row class="mt-10 mb-5" justify="center" align="center">
      <v-card
        v-for="todo in paginatedList.slice(0, 10)"
        :key="todo.id"
        class="pa-5 ma-5 elevation-5 rounded-xl borderCard"
        id="todoCard"
        :color="isDoneColor(todo)"
        width="300"
        height="280"
        variant="outlined"
      >
        <v-card-item>
          <div>
            <div class="text-overline text-center mb-1 indigo--text">
              Catégorie : {{ todo.category }}
            </div>
            <div><v-divider></v-divider></div>
            <div class="text-h5 text-center ma-2">{{ todo.title }}</div>
            <div class="text-caption text-center">{{ todo.description }}</div>
          </div>
        </v-card-item>
        <v-card-action>
          <div class="text-overline indigo--text text-center mb-1">
            Statut : {{ todo.status }}
          </div>
          <div
            class="mt-2 text-caption text--secondary text-center font-italic"
          >
            Créé le {{ todo.created_at }}
          </div>
          <div><v-divider class="ma-3"></v-divider></div>
          <div class="d-flex align-center justify-center">
            <v-btn icon text @click="putFavorite(todo.id)">
              <v-icon id="heart" color="red"> {{ isFavorite(todo) }}</v-icon>
            </v-btn>
            <v-btn icon text @click="putDone(todo.id)">
              <v-icon id="check" color="green"> {{ isDone(todo) }}</v-icon>
            </v-btn>
          </div>
        </v-card-action>
      </v-card>
    </v-row>
    <v-pagination
      v-model="page"
      color="#fd2a65"
      :length="totalPages"
      circle
    ></v-pagination>
  </v-container>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped src="./style.css"></style>
