<template>
  <div class="categoryBar">
    <div class="createWrap">
      <router-link class="create" to="/notes/create">
        <i class="bi bi-plus-circle-dotted"></i>
        note</router-link
      >
    </div>
    <div v-if="categories" class="categoriesWrap">
      <div
        class="categoryContainer"
        v-for="category in categories"
        :key="category"
        @click="onClick($event, category)"
        ref="categoryRef"
      >
        {{ category }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "@vue/runtime-core";
import { router } from "../../router";
export default {
  name: "categoryBar",
  props: ["notes"],
  setup(props, context) {
    let categories = ref(null);
    let selected = ref(null);
    let categoryRef = ref(null);

    categories = computed(() => {
      let tmpArray = ["All"];

      props.notes.map((note) => {
        if (
          !tmpArray.includes(note.category) &&
          note.category !== "" &&
          note.category !== null
        )
          tmpArray.push(note.category);
      });

      return tmpArray;
    });

    // categories.value = [
    //   "daily",
    //   "all",
    //   "this is it",
    //   "imma so smart",
    //   "go go go",
    //   "i am here",
    // ];

    const onClick = (e, category) => {
      for (let i = 0; i < categoryRef.value.length; i++) {
        categoryRef.value[i].classList.remove("selected");
      }

      e.target.classList.toggle("selected");

      selected.value = category;

      context.emit("filter", category);

      router.push({ path: "/notes" });
    };

    onMounted(() => {
      categoryRef.value[0].classList.add("selected");
    });

    return { categoryRef, categories, onClick, selected };
  },
};
</script>

<style scoped>
* {
  --cat-head-height: 5rem;
}

.categoryBar {
  /*position: sticky;
  align-self: flex-start;
  top: 0;*/
  background-color: #f6f6f6;
  height: calc(100vh - var(--header-height));
  overflow: hidden;
  /* width: 18rem; */
  /* flex-shrink: 0; */
}

.categoriesWrap {
  max-height: calc(100% - var(--cat-head-height));
  overflow: auto;
}

.categoryContainer {
  font-weight: 600;
  padding: 1rem 2rem 1rem 1rem;
  cursor: pointer;
  color: #5b5b5b;
}

.categoryContainer:hover {
  background-color: #eeeeee;
  color: black;
}

.categoryContainer.selected {
  position: relative;
  background-color: white;
  color: black;
}

.categoryContainer.selected::before {
  content: "";
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0 auto 0;
  right: 1rem;
  width: 0.5rem;
  height: 0.5rem;
  background-color: black;
  border-radius: 50%;
}

.categoryContainer:not(:last-child) {
  /*border-bottom: 1px solid #bcbcbc;*/
}

.createWrap {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  height: var(--cat-head-height);
}

.create {
  display: flex;
  align-items: center;
  border: none;
  text-decoration: none;
  color: white;
  background-color: #999999;
  padding: 1rem;
  border-radius: 1rem;
  width: max-content;
}

.create > i {
  margin-right: 0.5rem;
}

@media screen and (max-width: 700px) {
  .categoryBar {
    grid-area: a;
    display: grid;
    grid-template-columns: auto 1fr;
    height: var(--categoty-bar-height);
    overflow: hidden;
    width: 100%;
    /* flex-shrink: 0; */
  }

  .createWrap {
    margin-right: 1rem;
  }

  .categoriesWrap {
    max-height: unset;
    height: 100%;
    overflow-x: auto;
    display: flex;
  }

  .categoryContainer {
    display: flex;
    align-items: center;
    height: 100%;
    width: fit-content;
    min-width: 8em;
    padding: 1rem 3rem 1rem 1rem;
  }
}
</style>
