<template>
  <div class="partWrapper_np" v-if="theNote">
    <div class="noteOptions_np">
      <h1></h1>
      <router-link
        class="editButton_np"
        :to="{ path: '/notes/' + note._id + '/edit' }"
        ><i class="bi bi-pencil-square"></i>edit</router-link
      >
      <button class="deleteButton" @click="deleteNote">
        <i class="bi bi-trash-fill"></i>delete
      </button>
    </div>
    <div class="noteWrapper_np">
      <div class="noteContainer_np">
        <h1>{{ theNote.title }}</h1>
        <div
          class="category_np"
          v-if="theNote.category !== '' && theNote.category !== null"
        >
          category: {{ theNote.category }}
        </div>
        <div class="content_np">{{ theNote.content }}</div>
      </div>
    </div>
  </div>
  <loadingPage :show="loadShow"></loadingPage>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { router } from "../../router";
import loadingPage from "../loadingPage.vue";

export default {
  name: "notePageContainer",
  props: ["note"],
  components: {
    loadingPage,
  },
  setup(props) {
    const theNote = ref(props.note);
    let loadShow = ref(false);

    const store = useStore();

    const deleteNote = async () => {
      loadShow.value = true;

      let response = await store.dispatch({
        type: "deleteNote",
        payload: { id: theNote.value._id },
      });

      if (response === true) router.push({ path: "/notes" });

      loadShow.value = false;
    };

    return { theNote, deleteNote, loadShow };
  },
};
</script>

<!--
<style scoped>
* {
  --top-bar-height: 3rem;
}

.partWrapper {
  width: 100%;
  padding-right: 1rem;
}

.noteOptions {
  display: block;
  text-align: right;
  height: var(--top-bar-height);
}

.editButton {
  text-decoration: none;
  color: black;
  padding: 1rem;
  background-color: #eeeeee;
  cursor: pointer;
}

.editButton > i,
.deleteButton > i {
  margin-right: 0.5rem;
}

.deleteButton {
  padding: 1rem;
  border: none;
  cursor: pointer;
  background-color: transparent;
}

.deleteButton > i {
  color: #990000;
}

.noteWrapper {
  max-height: calc(100% - var(--top-bar-height));
  overflow-y: auto;
  padding-top: 1rem;
  display: flex;
  justify-content: center;
}

.noteContainer {
  display: block;
  padding-left: 1rem;
  width: 100%;
}

.noteContainer > h1 {
  width: 100%;
  background-color: #f6f6f6;
  padding: 1rem 0 1rem 1rem;
  font-size: 1.5rem;
}

.noteContainer > .category {
  margin-bottom: 1rem;
}

.noteContainer > .content {
  border-top: 2px solid #f6f6f6;
  padding-top: 0.5rem;
}
</style>
-->
