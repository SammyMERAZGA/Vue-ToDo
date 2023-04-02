import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import moment from "moment";
// Components
import AddCategory from "@/ui/components/Dialogs/AddCategory.vue";
import Snackbar from "@/ui/components/Snackbar.vue";
// Entities
import { Category } from "@/entities/Category";

@Component({
  components: {
    AddCategory,
    Snackbar,
  },
})
export default class Categories extends Vue {
  categories: Category[] = [];
  category = {
    id: 0,
    name: "",
    description: "",
  };

  /* DIALOG */
  updateCategoryDialog = false;

  headersCategoriesTable = [
    {
      text: "Nom",
      align: "start",
      value: "name",
    },
    { text: "Description", value: "description" },
    { text: "Date de création", value: "createdAt" },
    { text: "Actions", value: "actions", sortable: false },
  ];

  nameRules = [
    (v: string) => !!v || "Le nom de la catégorie est obligatoire",
    (v: string) =>
      v.length <= 50 ||
      "Le nom de la catégorie doit faire moins de 50 caractères",
  ];

  /* CRUD */
  async getCategories() {
    this.categories = (
      await axios.get(process.env.VUE_APP_API_URL + `/category`)
    ).data as Category[];
    this.categories.forEach((category) => {
      category.createdAt = moment(category.createdAt).format("DD/MM/YYYY");
    });
  }

  editCategory(item: Category): void {
    this.category.id = item.id;
    this.category.name = item.name;
    this.category.description = item.description;
    this.updateCategoryDialog = true;
  }

  updateCategory(): void {
    axios
      .post(process.env.VUE_APP_API_URL + `/category/${this.category.id}`, {
        name: this.category.name,
        description: this.category.description,
      })
      .then(() => {
        this.getCategories();
        this.updateCategoryDialog = false;
        this.showSnackbarUpdateCategory();
        this.category.id = 0;
      });
  }

  deleteCategory(id: number): void {
    axios.delete(process.env.VUE_APP_API_URL + `/category/${id}`).then(() => {
      this.getCategories();
      this.showSnackbarDeleteCategory();
    });
  }

  mounted(): void {
    this.getCategories();
  }

  /* SNACKBAR */
  showSnackbarUpdateCategory(): void {
    const snackbar = this.$refs.snackbarUpdateCategory as Snackbar;
    snackbar.show();
  }

  showSnackbarDeleteCategory(): void {
    const snackbar = this.$refs.snackbarDeleteCategory as Snackbar;
    snackbar.show();
  }

  /* OTHERS METHODS */
  clear(): void {
    this.category.name = "";
    this.category.description = "";
  }
}
