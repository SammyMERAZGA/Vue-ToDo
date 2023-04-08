import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
// Components
import AddCategory from "@/ui/components/Dialogs/AddCategory.vue";
import Snackbar from "@/ui/components/Snackbar.vue";
// Entities
import { Category } from "@/entities/types/Category";
// Services
import {
  getCategories,
  updateCategory,
  deleteCategory,
} from "@/services/index";

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

  // ========== CRUD ========== //

  async getCategories() {
    this.categories = await getCategories();
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

  async updateCategory(): Promise<void> {
    await updateCategory({
      id: this.category.id,
      name: this.category.name,
      description: this.category.description,
    });
    this.getCategories();
    this.updateCategoryDialog = false;
    this.showSnackbarUpdateCategory();
    this.category.id = 0;
  }

  async deleteCategory(id: number): Promise<void> {
    await deleteCategory(id);
    this.getCategories();
    this.showSnackbarDeleteCategory();
  }

  mounted(): void {
    this.getCategories();
  }

  // ========== OTHERS METHODS ========== //

  clear(): void {
    this.category.name = "";
    this.category.description = "";
  }

  colorRow(item: Category) {
    const position = this.categories.indexOf(item, 0);
    if (position % 2 == 0) {
      return "blue lighten-5";
    }
  }

  showSnackbarUpdateCategory(): void {
    const snackbar = this.$refs.snackbarUpdateCategory as Snackbar;
    snackbar.show();
  }

  showSnackbarDeleteCategory(): void {
    const snackbar = this.$refs.snackbarDeleteCategory as Snackbar;
    snackbar.show();
  }
}
