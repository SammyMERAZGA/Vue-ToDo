import Vue from "vue";
import { Todo } from "@/types/todo";

export default class HomeView extends Vue {
  newTodoTitle = "";

  todos: Todo[] = [];

  doneTodo(id: number) {
    // eslint-disable-next-line
    let todo = this.todos.filter((todo: Todo) => todo.id === id)[0];
    todo.done = !todo.done;
    console.log(`🚀 id: ${id}`);
  }

  addTodo() {
    // eslint-disable-next-line
    let newTodo = {
      id: Date.now(),
      text: this.newTodoTitle,
      done: false,
    };
    this.todos.push(newTodo);
    this.newTodoTitle = "";
    console.log("🚀 Todo added");
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo: Todo) => todo.id !== id);
    console.log("🚀 Todo deleted");
  }
}
