<template>
  <actionContainer
    page="Create"
    :type="2"
    btnOne="discard"
    @buttonConfirm="createNote"
    @buttonOne="discard"
  ></actionContainer>
  <loadingPage :show="loadShow"></loadingPage>
</template>

<script>
import { useStore } from "vuex";
import actionContainer from "./actionContainer.vue";
import { onBeforeRouteLeave } from "vue-router";
import { router } from "../../router";
import loadingPage from "../loadingPage.vue";
import { ref } from "@vue/reactivity";

export default {
  name: "createPage",
  components: {
    actionContainer,
    loadingPage,
  },
  setup() {
    let success = false;
    let loadShow = ref(false);

    const store = useStore();

    const createNote = async ({ title, category, content }) => {
      success = true;
      loadShow.value = true;

      await store.dispatch({
        type: "createNote",
        payload: {
          title: title,
          category: category,
          content: content,
        },
      });

      loadShow.value = false;
    };

    const discard = () => {
      router.push({ path: "/notes" });
    };
    onBeforeRouteLeave((to, from, next) => {
      if (success !== true) {
        const yes = confirm("all changes will not be saved. Are you sure?");

        if (yes) next();
        else next(false);
      } else next();
    });

    return { createNote, discard, loadShow };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.createForm {
  width: 30rem;
  max-width: 95%;
}

.controlContainer {
  width: 100%;
  padding: 1rem;
}

.controlContainer:not(:last-child) {
  margin-bottom: 1rem;
}

.controlContainer > label {
  margin-bottom: 1rem;
  display: block;
}

.controlContainer > input {
  padding: 0.5rem;
  width: 100%;
}

.controlContainer > textarea {
  padding: 0.5rem;
  width: 100%;
  height: 10rem;
  resize: none;
}
</style>
