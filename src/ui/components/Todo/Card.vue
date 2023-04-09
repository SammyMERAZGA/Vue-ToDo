<template>
  <v-row class="mb-5" justify="center" align="center">
    <v-card
      v-for="todo in todos"
      :key="todo.id"
      class="pa-5 ma-5 elevation-5 rounded-xl borderCard"
      id="todoCard"
      width="300"
      variant="outlined"
    >
      <v-card-item>
        <div>
          <div class="d-flex align-center justify-start">
            <v-btn icon text @click="addFavorite(todo.id)">
              <v-icon id="heart" color="red"> {{ isFavorite(todo) }}</v-icon>
            </v-btn>
          </div>
          <div class="text-overline text-center mb-1">
            Catégorie : {{ todo.category_id }}
          </div>
          <div><v-divider></v-divider></div>
          <div class="text-h5 text-center ma-2">{{ todo.title }}</div>
          <div class="text-caption text-center">{{ todo.description }}</div>
        </div>
      </v-card-item>
      <v-card-action>
        <div class="text-overline indigo--text text-center mb-1">
          Statut : {{ todo.status_id }}
        </div>
        <div><v-divider class="ma-3"></v-divider></div>
        <h1 class="text-center overline indigo--text">Actions:</h1>
        <div align="center">
          <v-tooltip
            v-for="status in statuses"
            :key="status.id"
            :color="status.color"
            top
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn :color="status.color" v-bind="attrs" v-on="on" icon small>
                <v-icon>{{ status.icon }}</v-icon>
              </v-btn>
            </template>
            <span class="font-weight-black">{{ status.name }}</span>
          </v-tooltip>
        </div>
        <div class="mt-2 text-caption text--secondary text-center font-italic">
          Créé le {{ todo.created_at }}
        </div>
      </v-card-action>
    </v-card>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
// Entities
import { Todo } from "@/entities/types/Todo";
import { Status } from "@/entities/types/Status";
// Services
import { getTodos, updateTodo, getStatuses } from "@/services/index";

@Component
export default class Card extends Vue {
  todos: Todo[] = [];
  statuses: Status[] = [];

  // ========== CRUD ========== //

  async getTodos() {
    this.todos = await getTodos();
    this.todos.forEach((todo) => {
      todo.created_at = moment(todo.created_at).format("DD/MM/YYYY");
    });
  }

  async getStatuses() {
    this.statuses = await getStatuses();
  }

  created(): void {
    this.getTodos();
    this.getStatuses();
  }

  async addFavorite(id: number) {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      todo.is_favorite = !todo.is_favorite;
      await updateTodo({
        id: todo.id,
        title: todo.title,
        description: todo.description,
        completed: todo.completed,
        category_id: todo.category_id,
        status_id: todo.status_id,
        is_favorite: todo.is_favorite,
      });
    }
  }

  // ========== OTHER METHODS ========== //

  isFavorite(todo: Todo): string {
    if (todo.is_favorite) {
      return "mdi-heart";
    } else {
      return "mdi-heart-outline";
    }
  }
}
</script>

<style scoped>
.borderCard {
  border: 2px solid #0f4cae;
}

.v-divider {
  background-color: #0f4cae;
}

#todoCard:hover {
  transform: scale(1.08);
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);
  background-color: #f4f4f4;
}

#todoCard:hover h3 {
  transform: translateX(5px);
}

#todoCard:hover p {
  transform: translateX(10px);
}

#heart:hover {
  transform: scale(1.5);
  transition: transform 0.3s ease-in-out;
}
</style>
