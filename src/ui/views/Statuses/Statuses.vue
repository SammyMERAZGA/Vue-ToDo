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
          <h1 class="overline indigo--text text-center">Ajouter un statut</h1>
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
            <template v-slot:[`item.actions`]="{ item }">
              <v-btn icon @click="editStatus(item)">
                <v-icon small color="indigo darken-1"> mdi-pencil </v-icon>
              </v-btn>
              <v-btn icon>
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
