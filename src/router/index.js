import homePage from "../pages/homePage";
import notesPage from "../pages/notesPage";
import userRegister from "../pages/userRegister";
import userLogin from "../pages/userLogin";
import createNotePage from "../components/notePage/createPage.vue";
import notePage from "../pages/notePage.vue";
import notePageContainer from "../components/notePage/notePageContainer.vue";
import editPage from "../components/notePage/editPage.vue";
import { createRouter, createWebHistory } from "vue-router";

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "homePage",
      component: homePage,
    },
    {
      path: "/register",
      name: "userRegister",
      component: userRegister,
    },
    {
      path: "/login",
      name: "userLogin",
      component: userLogin,
    },
    {
      path: "/notes",
      name: "notesPage",
      component: notesPage,
      children: [
        {
          path: "create",
          component: createNotePage,
        },
        {
          path: ":id",
          name: "notePage",
          component: notePage,
          children: [
            {
              path: "",
              component: notePageContainer,
            },
            {
              path: ":edit",
              component: editPage,
            },
          ],
        },
      ],
    },
    // {
    //   path: "/notes/create",
    //   name: "createNote",
    //   component: createNotePage,
    // },
    // {
    //   path: "/notes/:id",
    //   name: "notePage",
    //   component: notePage,
    //   children: [
    //     { path: "", component: notePageContainer },
    //     {
    //       path: ":edit",
    //       component: editPageContainer,
    //     },
    //   ],
    // },
    {
      path: "/:others",
      redirect: "/",
      component: homePage,
    },
  ],
});
