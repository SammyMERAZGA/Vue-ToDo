<template>
  <div>
    <h1 class="text-center">Home</h1>

    <v-text-field
      v-model="newTodoTitle"
      class="pa-3"
      label="Enter a todo"
      append-icon="mdi-plus"
      outlined
      hide-details
      clearable
      @click:append="addTodo()"
      @keyup.enter="addTodo()"
    ></v-text-field>

    <div v-for="todo in todos" :key="todo.id">
      <v-list class="pt-0" flat>
        <v-list-item
          @click="doneTodo(todo.id)"
          :class="{ 'green lighten-3': todo.done }"
        >
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="todo.done" color="primary"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title
                :class="{ 'text-decoration-line-through': todo.done }"
                >{{ todo.text }}</v-list-item-title
              >
            </v-list-item-content>

            <v-list-item-action>
              <v-btn @click.stop="deleteTodo(todo.id)" icon>
                <v-icon color="red darken-3">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </v-list>
    </div>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped src="./style.css"></style>
