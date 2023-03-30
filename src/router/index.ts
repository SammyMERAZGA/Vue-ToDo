import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import TodoView from "../views/Todo/TodoView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "todo",
    component: TodoView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
