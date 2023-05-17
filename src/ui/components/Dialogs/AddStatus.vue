<template>
  <div>
    <Overlay />
    <v-dialog
      class="mb-15 no-scrollable"
      v-model="addStatusDialog"
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
                  label="Nom*"
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
              <v-col cols="12">
                <v-select
                  v-model="status.icon"
                  :items="icons"
                  label="Icône*"
                  prepend-icon="mdi-material-design"
                  item-text="name"
                  item-value="value"
                  color="#fd2a65"
                  required
                  clearable
                  filled
                >
                  <template #selection="{ item }">
                    <v-chip
                      v-if="item.name"
                      class="ma-2"
                      color="#fd2a65"
                      text-color="white"
                    >
                      <v-avatar left>
                        <v-icon>{{ item.value }}</v-icon>
                      </v-avatar>
                      {{ item.name }}
                    </v-chip>
                  </template>
                </v-select>
              </v-col>
              <v-col align="center" cols="12">
                <v-color-picker
                  v-model="status.color"
                  dot-size="23"
                  mode="hexa"
                  swatches-max-height="160"
                ></v-color-picker>
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
            color="#fd2a65"
            text
            @click="addStatusDialog = false"
          >
            Annuler
          </v-btn>
          <v-btn class="rounded-xl" color="#023e8a" text @click="addStatus()">
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
// Views
import Statuses from "@/ui/views/Statuses/Statuses.vue";
// Components
import Overlay from "../Overlay.vue";
import Snackbar from "../Snackbar.vue";
// Entities
import { Status } from "@/entities/types/Status";
// Services
import { createStatus } from "@/services/index";

@Component({
  components: {
    Snackbar,
    Overlay,
  },
})
export default class AddStatus extends Vue {
  status: Status = {
    id: 0,
    name: "",
    icon: "",
    color: "",
    created_at: "",
  };

  addStatusDialog = false;
  overlay = false;

  nameRules = [
    (v: string) => !!v || "Le nom du statut est obligatoire",
    (v: string) =>
      v.length <= 50 || "Le nom du statut doit faire moins de 30 caractères",
  ];

  icons = [
    { name: "À faire", value: "mdi-calendar-clock" },
    { name: "En cours", value: "mdi-progress-helper" },
    { name: "Terminée", value: "mdi-check-decagram" },
  ];

  async addStatus(): Promise<void> {
    if (this.status.name === "") {
      this.showSnackbarFieldsMissing();
    } else {
      this.overlay = true;
      await createStatus(this.status);
      this.overlay = false;
      this.addStatusDialog = false;
      (this.$parent as Statuses).getStatuses();
      this.showSnackbarAddStatus();
      this.clear();
    }
  }

  clear(): void {
    const btnClear = document.getElementById("btnClear");
    btnClear?.classList.add("clicked");
    setTimeout(() => {
      btnClear?.classList.remove("clicked");
    }, 500);

    this.status.name = "";
    this.status.icon = "";
    this.status.color = "";
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
