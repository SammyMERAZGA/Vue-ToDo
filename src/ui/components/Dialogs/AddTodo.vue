<template>
  <div>
    <Overlay />
    <v-dialog
      class="mb-15"
      v-model="addTodoDialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-row align="center" justify="center">
          <v-btn
            class="rounded-xl mt-5 borderBtn"
            color="#fd2a65"
            dark
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-tag-plus</v-icon>
          </v-btn>
        </v-row>
      </template>
      <v-card class="rounded-xl no-scrollable">
        <v-toolbar class="mb-5" color="#023e8a" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-plus-circle-outline</v-icon>
                Ajouter une tâche</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-row align="center" justify="center">
          <v-img
            src="@/assets/svg/todo.svg"
            height="200"
            max-width="200"
          ></v-img>
        </v-row>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="todo.title"
                  label="Nom de la tâche*"
                  placeholder="Laver la voiture"
                  prepend-icon="mdi-tag"
                  :rules="nameRules"
                  :counter="50"
                  color="#fd2a65"
                  required
                  clearable
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="todo.category"
                  label="Nom de la catégorie*"
                  placeholder="Lavage"
                  prepend-icon="mdi-shape"
                  color="#fd2a65"
                  required
                  clearable
                  filled
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-select
                  v-model="todo.status"
                  label="Nom du statut*"
                  prepend-icon="mdi-list-status"
                  :items="statuses"
                  item-text="name"
                  color="#fd2a65"
                  required
                  clearable
                  filled
                ></v-select>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="todo.description"
                  label="Description"
                  prepend-icon="mdi-text-box"
                  placeholder="Blabla..."
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
          <v-btn id="btnClear" dark icon text @click="clear()">
            <v-icon color="#023e8a">mdi-broom</v-icon>
          </v-btn>
          <v-btn
            class="rounded-xl"
            color="red"
            text
            @click="addTodoDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn class="rounded-xl" color="indigo" text @click="addTodo()">
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- SNACKBAR -->
    <!-- Add Todo -->
    <Snackbar
      message="Votre tâche a bien été ajoutée !"
      color="green"
      ref="snackbarAddTodo"
    />
    <!-- Field missing -->
    <Snackbar
      message="Veuillez remplir tous les champs obligatoires !"
      color="red"
      ref="snackbarFieldsMissing"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
import axios from "axios";
// Views
import Home from "@/ui/views/Home/Home.vue";
// Components
import Snackbar from "../Snackbar.vue";
import Overlay from "../Overlay.vue";
// Services
import { getStatuses } from "@/services/index";
// Types
import { Status } from "@/entities/types/Status";

@Component({
  components: {
    Snackbar,
    Overlay,
  },
})
export default class AddTodo extends Vue {
  todo = {
    title: "",
    description: "",
    completed: false,
    status: "",
    category: "",
    is_favorite: false,
  };

  statuses: Status[] = [];

  addTodoDialog = false;
  overlay = false;

  nameRules = [
    (v: string) => !!v || "Le nom de la tâche est obligatoire",
    (v: string) =>
      v.length <= 50 || "Le nom de la tâche doit faire moins de 50 caractères",
  ];

  addTodo(): void {
    if (
      this.todo.title === "" ||
      this.todo.category === "" ||
      this.todo.status === ""
    ) {
      this.showSnackbarFieldsMissing();
    }
    if (
      this.todo.title === "" &&
      this.todo.category === "" &&
      this.todo.status === ""
    ) {
      this.showSnackbarFieldsMissing();
    } else {
      this.overlay = true;
      axios
        .post(process.env.VUE_APP_API_URL + `/todo`, {
          title: this.todo.title,
          description: this.todo.description,
          completed: this.todo.completed,
          status: this.todo.status,
          category: this.todo.category,
          is_favorite: this.todo.is_favorite,
          createdAt: new Date(),
        })
        .then(() => {
          this.addTodoDialog = false;
          this.overlay = false;
          (this.$parent as Home).getTodos();
          this.showSnackbarAddTodo();
          this.todo = {
            title: "",
            description: "",
            completed: false,
            status: "",
            category: "",
            is_favorite: false,
          };
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  // ========== CRUD ========== //

  async getStatuses() {
    this.statuses = await getStatuses();
    this.statuses.forEach((status) => {
      status.created_at = moment(status.created_at).format("DD/MM/YYYY");
    });
  }

  mounted(): void {
    this.getStatuses();
  }

  // ========== OTHERS METHODS ========== //

  clear(): void {
    this.todo = {
      title: "",
      description: "",
      completed: false,
      status: "",
      category: "",
      is_favorite: false,
    };
  }

  showSnackbarFieldsMissing(): void {
    const snackbar = this.$refs.snackbarFieldsMissing as Snackbar;
    snackbar.show();
  }

  showSnackbarAddTodo(): void {
    const snackbar = this.$refs.snackbarAddTodo as Snackbar;
    snackbar.show();
  }
}
</script>
