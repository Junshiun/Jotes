<template>
  <div class="mainPage" v-if="store.getters.getNotes">
    <category-bar :notes="store.getters.getNotes" @filter="filteredNotes" />
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
</template>

<script>
import { computed, ref } from "vue";
import noteContainer from "../components/notesPage/noteContainer.vue";
import categoryBar from "../components/notesPage/categoryBar.vue";
import { useStore } from "vuex";
import { router } from "../router";

export default {
  name: "notesPage",
  components: {
    noteContainer,
    categoryBar,
  },
  setup() {
    let notes;
    let showingNotes = ref(null);
    let category = ref(null);

    const store = useStore();

    store.dispatch("getUserData");

    if (!store.state.user) {
      router.push({ path: "/" });
      return;
    }

    store.dispatch("fetchNotes");

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

    return { showingNotes, filteredNotes, store };
  },
};
</script>

<style scoped>
.mainPage {
  display: flex;
  max-height: calc(100vh - var(--header-height));
  overflow-y: hidden;
  overflow-x: auto;
}

.notes {
  display: flex;
  flex-direction: column;
  width: 30rem;
  padding-right: 0.5rem;
  max-height: 100vh;
  overflow-y: auto;
  /*grid-template-columns: 30rem;
  grid-auto-rows: max-content;*/
  border-right: 2px solid #f3f6f4;
  flex-shrink: 0;
}

.partWrapper {
  flex-grow: 1;
}
</style>
