import { Component, Vue } from "vue-property-decorator";
import moment from "moment";
// Entities
import { Todo } from "@/entities/types/Todo";
import { Status } from "@/entities/types/Status";
// Components
import FilterBar from "@/ui/components/Todo/FilterBar.vue";
import AddTodo from "@/ui/components/Dialogs/AddTodo.vue";
// Services
import {
  getTodos,
  getStatuses,
  todoDone,
  todoFavorite,
} from "@/services/index";

@Component({
  components: {
    FilterBar,
    AddTodo,
  },
})
export default class Home extends Vue {
  todos: Todo[] = [];
  statuses: Status[] = [];
  todo = {
    id: 0,
    title: "",
    description: "",
    category: "",
    status: "",
    completed: false,
    is_favorite: false,
  };

  page = 1;

  // ========== CRUD ========== //

  async getTodos() {
    this.todos = await getTodos();
    this.todos.forEach((todo: Todo) => {
      todo.created_at = moment(todo.created_at).format("DD/MM/YYYY");
    });
  }

  async getStatuses() {
    this.statuses = await getStatuses();
    this.statuses.forEach((status: Status) => {
      status.created_at = moment(status.created_at).format("DD/MM/YYYY");
    });
  }

  async putDone(id: number) {
    await todoDone(id);
    this.getTodos();
  }

  async putFavorite(id: number) {
    await todoFavorite(id);
    this.getTodos();
  }

  mounted(): void {
    this.getTodos();
    this.getStatuses();
  }

  // ========== GETTERS ========== //

  get totalPages(): number {
    const itemsPerPage = 6;
    return Math.ceil(this.todos.length / itemsPerPage);
  }

  get paginatedList() {
    const itemsPerPage = 6;
    const startIndex: number = (this.page - 1) * itemsPerPage;
    const endIndex: number = startIndex + itemsPerPage;
    return this.todos.slice(startIndex, endIndex);
  }

  // ========== OTHER METHODS ========== //

  isFavorite(todo: Todo): string {
    if (todo.is_favorite) {
      return "mdi-heart";
    } else {
      return "mdi-heart-outline";
    }
  }

  isDone(todo: Todo): string {
    if (todo.completed) {
      return "mdi-check-decagram";
    } else {
      return "mdi-check-decagram-outline";
    }
  }

  isDoneColor(todo: Todo): string {
    if (todo.completed) {
      return "pink lighten-4";
    } else {
      return "";
    }
  }
}
