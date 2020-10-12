import Vue from "vue";
import Router from "vue-router";
import Dashboard from "../components/Dashboard";
import Create from "../components/Create";
import About from "../components/About";
import Saved from "../components/Saved";
Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Dashboard,
    },
    {
      path: "/create",
      component: Create,
    },
    {
      path: "/about",
      component: About,
    },
    {
      path: "/saved",
      component: Saved,
    }
  ],
});

export default router;
