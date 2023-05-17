<template>
  <v-navigation-drawer
    app
    color="#00296b"
    mini-variant
    mini-variant-width="110"
  >
    <v-avatar class="d-block text-center mx-auto mt-5 mb-10" size="60">
      <v-img
        src="https://i.pinimg.com/736x/c7/15/e3/c715e34c2a5aee22020e1d738c48ebee.jpg"
      />
    </v-avatar>

    <v-card flat color="#023e8a" class="rounded-xl mx-4 py-10">
      <v-list flat dark>
        <v-list-item-group v-model="selectedItem">
          <v-tooltip v-for="(item, i) in items" :key="i" right color="#fd2a65">
            <template v-slot:activator="{ on, attrs }">
              <v-list-item
                active-class="border"
                v-slot="{ active }"
                :ripple="false"
                :to="item.link"
                v-bind="attrs"
                v-on="on"
              >
                <v-list-item-content>
                  <v-icon :color="active ? 'white' : 'grey lighten-1'">{{
                    item.icon
                  }}</v-icon>
                </v-list-item-content>
              </v-list-item>
            </template>
            <span>{{ item.text }}</span>
          </v-tooltip>
        </v-list-item-group>
      </v-list>
    </v-card>
  </v-navigation-drawer>
</template>

<script lang="ts" src="./index.ts"></script>
<style src="./style.css"></style>
