import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Sidebar extends Vue {
  selectedItem = 0;

  items = [
    { icon: "mdi-home", text: "Accueil", link: "/" },
    { icon: "mdi-list-status", text: "Liste des status", link: "/statuts" },
    { icon: "mdi-cog", text: "Paramètres du compte", link: "/parametres" },
  ];
}
