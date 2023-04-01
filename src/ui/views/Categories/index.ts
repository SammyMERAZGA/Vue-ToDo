import { Component, Vue } from "vue-property-decorator";
import axios from "axios";
import moment from "moment";
import AddCategory from "@/ui/components/Dialogs/AddCategory.vue";
import { Category } from "@/entities/category";

@Component({
  components: {
    AddCategory,
  },
})
export default class Categories extends Vue {
  // DIALOG
  updateCategoryDialog = false;

  // SNACKBAR
  snackbarUpdateCategory = false;
  snackbarDeleteCategory = false;

  categories: Category[] = [];
  categoryId = 0;
  name = "";
  description = "";

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

  // METHODS
  editCategory(item: Category): void {
    this.categoryId = item.id;
    this.name = item.name;
    this.description = item.description;
    this.updateCategoryDialog = true;
  }

  updateCategory(): void {
    axios
      .put(process.env.VUE_APP_MOCKAPI_URL + `/category/${this.categoryId}`, {
        name: this.name,
        description: this.description,
      })
      .then(() => {
        this.getCategories();
        this.updateCategoryDialog = false;
        this.snackbarUpdateCategory = true;
        this.categoryId = 0;
      });
  }

  deleteCategory(id: number): void {
    axios
      .delete(process.env.VUE_APP_MOCKAPI_URL + `/category/${id}`)
      .then(() => {
        this.getCategories();
        this.snackbarDeleteCategory = true;
      });
  }

  async getCategories() {
    this.categories = (
      await axios.get(process.env.VUE_APP_MOCKAPI_URL + `/category`)
    ).data as Category[];
    this.categories.forEach((category) => {
      category.createdAt = moment(category.createdAt).format("DD/MM/YYYY");
    });
  }

  mounted(): void {
    this.getCategories();
  }
}
