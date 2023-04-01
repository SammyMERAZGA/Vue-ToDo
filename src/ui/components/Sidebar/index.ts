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
    { icon: "mdi-trash-can", text: "Notes supprimées", link: "/notes-supprimees" },
    { icon: "mdi-cog", text: "Paramètres", link: "/parametres" },
  ];
}
