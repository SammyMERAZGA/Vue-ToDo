<template>
  <div>
    <Overlay />
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
        <v-toolbar class="mb-5" color="#023e8a" dark>
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
                  v-model="category.name"
                  label="Nom de la catégorie*"
                  placeholder="Jeux vidéos"
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
                <v-textarea
                  v-model="category.description"
                  label="Description"
                  prepend-icon="mdi-text-box"
                  placeholder="Dans cette catégorie, il y aura des notes concernant les jeux vidéos."
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
    <Snackbar
      message="Votre catégorie a bien été ajoutée !"
      color="green"
      ref="snackbarAddCategory"
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
import axios from "axios";
// Views
import Categories from "@/ui/views/Categories/Categories.vue";
// Components
import Snackbar from "../Snackbar.vue";
import Overlay from "../Overlay.vue";

@Component({
  components: {
    Snackbar,
    Overlay,
  },
})
export default class AddCategory extends Vue {
  category = {
    name: "",
    description: "",
  };

  addCategoryDialog = false;
  overlay = false;

  nameRules = [
    (v: string) => !!v || "Le nom de la catégorie est obligatoire",
    (v: string) =>
      v.length <= 50 ||
      "Le nom de la catégorie doit faire moins de 50 caractères",
  ];

  addCategory(): void {
    if (this.category.name === "") {
      this.showSnackbarFieldsMissing();
      return;
    } else {
      this.overlay = true;
      axios
        .post(process.env.VUE_APP_API_URL + `/category`, {
          name: this.category.name,
          description: this.category.description,
          createdAt: new Date(),
        })
        .then(() => {
          this.addCategoryDialog = false;
          this.overlay = false;
          (this.$parent as Categories).loadCategories();
          this.showSnackbarAddCategory();
          this.category.name = "";
          this.category.description = "";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  clear(): void {
    this.category.name = "";
    this.category.description = "";
  }

  /* SNACKBAR */
  showSnackbarFieldsMissing(): void {
    const snackbar = this.$refs.snackbarFieldsMissing as Snackbar;
    snackbar.show();
  }

  showSnackbarAddCategory(): void {
    const snackbar = this.$refs.snackbarAddCategory as Snackbar;
    snackbar.show();
  }
}
</script>
