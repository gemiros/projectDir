import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Index from "./components/monster/Index.vue";
import Preview from "./components/monster/Preview.vue";
import Create from "./components/monster/CreateTmp.vue";
// import Duplicate from "./components/monster/Duplicate.vue";
// import Edit from "./components/monster/Edit.vue";
import vuetify from "./plugins/vuetify";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    { path: "/", name: "monsterIndex", component: Index },
    {
      path: "/monster/preview/:id",
      name: "monsterPreview",
      component: Preview,
    },
    { path: "/monster/create", name: "monsterCreate", component: Create },
    {
      path: "/monster/duplicate/:id",
      name: "monsterDupulicate",
      component: Create,
    },
    {
      path: "/monster/edit/:id",
      name: "monsterEdit",
      component: Create,
    },
  ],
});

createApp(App).use(router).use(vuetify).mount("#app");
