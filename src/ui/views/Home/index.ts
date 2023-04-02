import { Component, Vue } from "vue-property-decorator";
import FilterBar from "@/ui/components/FilterBar.vue";

@Component({
  components: {
    FilterBar,
  },
})
export default class Home extends Vue {
  page = 1;

  notes = [
    {
      id: 1,
      title: "Note 1",
      category: "Category 1",
      status: "À faire",
      color: "blue darken-2",
      description:
        "This is a note, this is a note, his is a note, his is a note, his is a note.",
    },
    {
      id: 2,
      title: "Note 2",
      category: "Category 2",
      status: "En cours",
      color: "orange darken-2",
      description:
        "This is a note, this is a note, his is a note, his is a note, his is a note.",
    },
    {
      id: 3,
      title: "Note 3",
      category: "Category 3",
      status: "Terminée",
      color: "green",
      description:
        "This is a note, this is a note, his is a note, his is a note, his is a note.",
    },
    {
      id: 4,
      title: "Note 4",
      category: "Category 4",
      status: "Terminée",
      color: "green",
      description:
        "This is a note, this is a note, his is a note, his is a note, his is a note.",
    },
    {
      id: 5,
      title: "Note 5",
      category: "Category 5",
      status: "Terminée",
      color: "green",
      description:
        "This is a note, this is a note, his is a note, his is a note, his is a note.",
    },
  ];
}
