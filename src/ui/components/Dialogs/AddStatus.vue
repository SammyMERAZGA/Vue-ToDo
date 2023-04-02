<template>
  <div>
    <Overlay />
    <v-dialog
      class="mb-15"
      v-model="addStatusDialog"
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
            <v-icon>mdi-table-plus</v-icon>
          </v-btn>
        </v-row>
      </template>
      <v-card class="rounded-xl no-scrollable">
        <v-toolbar class="mb-5" color="#023e8a" dark>
          <v-row align="center" justify="center">
            <v-toolbar-title>
              <span>
                <v-icon>mdi-table-plus</v-icon>
                Ajouter un statut</span
              >
            </v-toolbar-title>
          </v-row>
        </v-toolbar>
        <v-row align="center" justify="center">
          <v-img src="@/assets/status.png" height="200" max-width="200"></v-img>
        </v-row>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="status.name"
                  label="Nom du statut*"
                  placeholder="À faire"
                  prepend-icon="mdi-tag"
                  :rules="nameRules"
                  :counter="30"
                  color="#fd2a65"
                  required
                  clearable
                  filled
                ></v-text-field>
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
            @click="addStatusDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn class="rounded-xl" color="indigo" text @click="addStatus()">
            Ajouter
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- SNACKBAR -->
    <!-- Add status -->
    <Snackbar
      message="Votre statut a bien été ajoutée !"
      color="green"
      ref="snackbarAddStatus"
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
import Statuses from "@/ui/views/Statuses/Statuses.vue";
// Components
import Overlay from "../Overlay.vue";
import Snackbar from "../Snackbar.vue";

@Component({
  components: {
    Snackbar,
    Overlay,
  },
})
export default class AddStatus extends Vue {
  status = {
    name: "",
  };

  addStatusDialog = false;
  overlay = false;

  nameRules = [
    (v: string) => !!v || "Le nom du statut est obligatoire",
    (v: string) =>
      v.length <= 50 || "Le nom du statut doit faire moins de 30 caractères",
  ];

  addStatus(): void {
    if (this.status.name === "") {
      this.showSnackbarFieldsMissing();
      return;
    } else {
      this.overlay = true;
      axios
        .post(process.env.VUE_APP_API_URL + `/status`, {
          name: this.status.name,
          createdAt: new Date(),
        })
        .then(() => {
          this.addStatusDialog = false;
          this.overlay = false;
          (this.$parent as Statuses).getStatuses();
          this.showSnackbarAddStatus();
          this.status.name = "";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  clear(): void {
    this.status.name = "";
  }

  /* SNACKBAR */
  showSnackbarFieldsMissing(): void {
    const snackbar = this.$refs.snackbarFieldsMissing as Snackbar;
    snackbar.show();
  }

  showSnackbarAddStatus(): void {
    const snackbar = this.$refs.snackbarAddStatus as Snackbar;
    snackbar.show();
  }
}
</script>