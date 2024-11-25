<template>
  <div class="mainPage" v-if="store.getters.getNotes">
    <category-bar :notes="store.getters.getNotes" @filter="filteredNotes" />
    <div class="notesWrapper_main">
      <div class="notes">
        <noteContainer
          v-for="note in showingNotes"
          :key="note"
          :note="note"
          @filter="filteredNotes"
        />
      </div>
      <router-view :key="$route.fullPath" class="partWrapper"></router-view>
    </div>
  </div>
  <loadingPage :show="loadShow"></loadingPage>
</template>

<script>
import { computed, ref } from "vue";
import noteContainer from "../components/notesPage/noteContainer.vue";
import categoryBar from "../components/notesPage/categoryBar.vue";
import { useStore } from "vuex";
import { router } from "../router";
import loadingPage from "../components/loadingPage.vue";
export default {
  name: "notesPage",
  components: {
    noteContainer,
    categoryBar,
    loadingPage,
  },
  setup() {
    let notes;
    let showingNotes = ref(null);
    let category = ref(null);
    let loadShow = ref(false);

    const store = useStore();

    (async () => {
      await store.dispatch("getUserData");

      if (!store.state.user) {
        router.push({ path: "/user" });
        return;
      }
    })();

    (async () => {
      loadShow.value = true;
      await store.dispatch("fetchNotes");
      loadShow.value = false;
    })();

    showingNotes = computed(() => {
      if (
        category.value === "" ||
        category.value === null ||
        category.value === "All"
      ) {
        notes = store.state.notes;

        return [...notes].reverse();
      } else {
        notes = store.state.notes.filter((note) => {
          return note.category === category.value;
        });

        return [...notes].reverse();
      }
    });

    let filteredNotes = (pick) => {
      category.value = pick;
    };

    return { showingNotes, filteredNotes, store, loadShow };
  },
};
</script>

<style scoped>
.mainPage {
  display: grid;
  max-height: calc(100vh - var(--header-height));
  overflow-y: hidden;
  overflow-x: auto;
  grid-template-columns: 1fr 3.5fr;
}

.notesWrapper_main {
  position: relative;
  display: grid;
  grid-template-columns: 1.5fr 2fr;
}

.notes {
  display: flex;
  flex-direction: column;
  /* width: 25rem; */
  padding-right: 0.5rem;
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
  /*grid-template-columns: 30rem;
  grid-auto-rows: max-content;*/
  border-right: 2px solid #f3f6f4;
  /* flex-shrink: 0; */
}

.partWrapper {
  /* flex-grow: 1; */
}

@media screen and (max-width: 700px) {
  * {
    --category-bar-height: 5rem;
  }

  .mainPage {
    display: grid;
    grid-template-areas:
      "a a"
      "b b";
    grid-template-rows: var(--category-bar-height) 1fr;
    grid-template-columns: 1fr 1fr;
    height: 100%;
  }

  .notesWrapper_main {
    grid-area: b;
    display: unset;
    grid-template-columns: unset;
  }

  .notes {
    display: flex;
    flex-direction: column;
    /* width: 25rem; */
    padding-right: 0.5rem;
    max-height: calc(100vh - var(--header-height) - var(--category-bar-height));
    overflow-y: auto;
    /*grid-template-columns: 30rem;
    grid-auto-rows: max-content;*/
    border-right: 2px solid #f3f6f4;
  }
}
</style>
