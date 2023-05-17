import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/ui/views/Home/Home.vue";
import Statuses from "@/ui/views/Statuses/Statuses.vue";
import Settings from "@/ui/views/Settings/Settings.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/statuts",
    name: "statuses",
    component: Statuses,
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
