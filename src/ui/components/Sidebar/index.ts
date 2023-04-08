import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Sidebar extends Vue {
  selectedItem = 0;

  items = [
    { icon: "mdi-home", text: "Accueil", link: "/" },
    {
      icon: "mdi-format-list-bulleted-type",
      text: "Catégorie de notes",
      link: "/categories",
    },
    { icon: "mdi-list-status", text: "Liste des status", link: "/statuts" },
    {
      icon: "mdi-check-circle-outline",
      text: "Notes terminées",
      link: "/notes-terminees",
    },
    { icon: "mdi-cog", text: "Paramètres du compte", link: "/parametres" },
  ];
}
