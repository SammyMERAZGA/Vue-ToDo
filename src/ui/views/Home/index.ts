import Vue from "vue";
import Component from "vue-class-component";

@Component
export default class Home extends Vue {
  page = 1;

  notes = [
    {
      id: 1,
      title: "Note 1",
      category: "Category 1",
      description: "This is a note",
    },
    {
      id: 2,
      title: "Note 2",
      category: "Category 2",
      description: "This is a note",
    },
    {
      id: 3,
      title: "Note 3",
      category: "Category 3",
      description: "This is a note",
    },
    {
      id: 4,
      title: "Note 4",
      category: "Category 4",
      description: "This is a note",
    },
    {
      id: 5,
      title: "Note 5",
      category: "Category 5",
      description: "This is a note",
    },
  ];
}
