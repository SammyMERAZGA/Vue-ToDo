import { Component, Vue } from "vue-property-decorator";
// Components
import FilterBar from "@/ui/components/Todo/FilterBar.vue";
import Card from "@/ui/components/Todo/Card.vue";
// Entities
import { Todo } from "@/entities/types/Todo";

@Component({
  components: {
    FilterBar,
    Card,
  },
})
export default class Home extends Vue {
  page = 1;

  todo: Todo = {
    id: 0,
    title: "",
    description: "",
    completed: false,
    created_at: "",
    category_id: 0,
    status_id: 0,
    user_id: 0,
    is_favorite: false,
  };
}
