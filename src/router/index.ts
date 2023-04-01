import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../ui/views/Home/Home.vue";
import Categories from "../ui/views/Categories/Categories.vue";
import Statuses from "@/ui/views/Statuses/Statuses.vue";
import DeletedTasks from "../ui/views/DeletedTasks/DeletedTasks.vue";
import Settings from "../ui/views/Settings/Settings.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/categories",
    name: "categories",
    component: Categories,
  },
  {
    path: "/statuts",
    name: "statuses",
    component: Statuses,
  },
  {
    path: "/notes-supprimees",
    name: "deleted-notes",
    component: DeletedTasks,
  },
  {
    path: "/parametres",
    name: "settings",
    component: Settings,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
