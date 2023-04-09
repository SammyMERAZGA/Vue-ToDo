<template>
  <div>
    <v-container class="pa-5">
      <h1 class="text-center">Liste des statuts</h1>
      <v-row align="center" justify="center">
        <img
          class="mt-5"
          src="@/assets/status.png"
          alt="Status image from storyset"
          width="300"
        />
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="4">
          <h1 class="overline black--text text-center">Ajouter un statut</h1>
          <AddStatus />
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-card width="1200" class="rounded-xl mt-8 table-card" elevation="5">
          <v-data-table
            :headers="headersStatusesTable"
            :items="statuses"
            :item-class="colorRow"
            :footer-props="{
              'prev-icon': 'mdi-arrow-left-bold-circle',
              'next-icon': 'mdi-arrow-right-bold-circle',
              'items-per-page-text': 'Nb d\'éléments par page',
              'items-per-page-all-text': 'Tout',
              'items-per-page-options': [10, 20, 30],
            }"
          >
            <template v-slot:no-data>
              <h1>Aucun résultats</h1>
            </template>
            <template v-slot:[`footer.page-text`]="props">
              <span v-if="props.itemsLength > 1"
                >{{ props.pageStart }}/{{ props.pageStop }} de
                {{ props.itemsLength }}</span
              >
            </template>
            <template v-slot:[`item.icon`]="{ item }">
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </template>
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn
                :disabled="isActionButtonDisabled(item.name)"
                icon
                @click="editStatus(item)"
              >
                <v-icon small color="indigo darken-1"> mdi-pencil </v-icon>
              </v-btn>
              <v-btn :disabled="isActionButtonDisabled(item.name)" icon>
                <v-icon
                  small
                  color="pink lighten-1"
                  @click="deleteStatus(item.id)"
                >
                  mdi-delete
                </v-icon>
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-row>
      <v-row class="mt-15" justify="center" align="center">
        <v-tooltip left color="#fd2a65">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3 borderBtn"
              color="#fd2a65"
              v-bind="attrs"
              v-on="on"
              fab
              small
              dark
              @click="refresh()"
            >
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </template>
          <span class="font-weight-black">Rafraîchir la liste</span>
        </v-tooltip>
        <v-tooltip right color="#fd2a65">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="mx-3 borderBtn"
              color="#fd2a65"
              v-bind="attrs"
              v-on="on"
              fab
              small
              dark
              @click="goToTop()"
            >
              <v-icon dark> mdi-arrow-up-left-bold </v-icon>
            </v-btn>
          </template>
          <span class="font-weight-black"> Retourner en haut </span>
        </v-tooltip>
      </v-row>
      <Snackbar
        message="La liste des statuts a été mise à jour !"
        color="#fd2a65"
        bottom="true"
        right="true"
        ref="snackbarRefresh"
      />
      <!-- DIALOG UPDATE -->
      <v-dialog
        class="mb-15"
        v-model="updateStatusDialog"
        persistent
        max-width="600px"
      >
        <v-card class="rounded-xl">
          <v-toolbar color="#023e8a" class="mb-5" dark>
            <v-row align="center" justify="center">
              <v-toolbar-title>
                <span>
                  <v-icon>mdi-pencil-circle-outline</v-icon>
                  Modifier un statut</span
                >
              </v-toolbar-title>
            </v-row>
          </v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="status.name"
                    label="Nom du statut*"
                    placeholder="Entrer le nouveau nom du statut"
                    prepend-icon="mdi-tag"
                    :rules="nameRules"
                    :counter="30"
                    color="#fd2a65"
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
            <v-btn class="rounded-xl" color="black" text @click="clear()">
              Tout effacer
            </v-btn>
            <v-btn
              class="rounded-xl"
              color="red"
              text
              @click="updateStatusDialog = false"
            >
              Annuler
            </v-btn>
            <v-btn
              class="rounded-xl"
              color="indigo"
              text
              @click="updateStatus()"
            >
              Modifier
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <!-- SNACKBAR -->
      <!-- Update status -->
      <Snackbar
        message="Votre statut a bien été modifié."
        color="blue"
        ref="snackbarUpdateStatus"
      />
      <!-- Delete status -->
      <Snackbar
        message="Votre statut a bien été supprimé."
        color="pink lighten-1"
        ref="snackbarDeleteStatus"
      />
    </v-container>
  </div>
</template>

<script lang="ts" src="./index.ts"></script>
<style scoped src="./style.css"></style>
