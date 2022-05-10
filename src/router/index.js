import homePage from "../pages/homePage";
import notesPage from "../pages/notesPage";
import createNotePage from "../components/notePage/createPage.vue";
import notePage from "../pages/notePage.vue";
import notePageContainer from "../components/notePage/notePageContainer.vue";
import editPage from "../components/notePage/editPage.vue";
import userMain from "../pages/userMain.vue";
import userProfile from "../pages/userProfile.vue";
import profileMain from "../components/profilePage/profileMain.vue";
import profileEdit from "../components/profilePage/profileEdit.vue";
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
      path: "/user",
      name: "userMain",
      component: userMain,
    },
    {
      path: "/user/profile",
      name: "userProfile",
      component: userProfile,
      children: [
        {
          path: "",
          name: "profileMain",
          component: profileMain,
        },
        {
          path: "edit",
          name: "profileEdit",
          component: profileEdit,
        },
      ],
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
