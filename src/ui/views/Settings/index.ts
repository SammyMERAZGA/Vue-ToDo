import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Settings extends Vue {
  darkTheme = false;
  languages = [
    { name: "Anglais", code: "en" },
    { name: "Français", code: "fr" },
  ];
}
