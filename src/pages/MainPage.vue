<template>
  <div class="mainPage" v-if="showingNotes">
    <category-bar :notes="notes" @filter="filteredNotes" />
    <div class="notes">
      <div v-for="note in showingNotes" :key="note">
        <noteContainer :note="note" @filter="filteredNotes" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import noteContainer from "../components/noteContainer.vue";
import categoryBar from "../components/categoryBar.vue";

export default {
  name: "MainPage",
  components: {
    noteContainer,
    categoryBar,
  },
  setup() {
    let notes = ref(null);
    let showingNotes = ref(null);

    let fetchNotes = async () => {
      notes.value = await fetch("http://localhost:5000/notes").then((res) =>
        res.json()
      );

      showingNotes.value = await notes.value;
    };

    fetchNotes();

    let filteredNotes = (category) => {
      if (category === "All") showingNotes.value = notes.value;
      else
        showingNotes.value = notes.value.filter(
          (note) => note.category === category
        );
    };

    return { notes, showingNotes, filteredNotes };
  },
};
</script>

<style>
.mainPage {
  display: flex;
}

.notes {
  margin-top: 1rem;
  display: grid;
  grid-template-columns: minmax(1fr, max-content);
  grid-auto-rows: max-content;
  padding-left: 5rem;
}
</style>
