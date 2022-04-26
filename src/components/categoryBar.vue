<template>
  <div class="categoryBar">
    <div v-if="categories">
      <div
        class="categoryContainer"
        v-for="category in categories"
        :key="category"
        @click="onClick(category)"
      >
        {{ category }}
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "@vue/runtime-core";
export default {
  name: "categoryBar",
  props: ["notes"],
  setup(props, context) {
    let categories = ref(null);

    categories = computed(() => {
      let tmpArray = ["All"];

      props.notes.map((note) => {
        if (!tmpArray.includes(note.category)) tmpArray.push(note.category);
      });

      return tmpArray;
    });

    const onClick = (category) => {
      context.emit("filter", category);
    };

    return { categories, onClick };
  },
};
</script>

<style scoped>
.categoryBar {
  position: sticky;
  top: 0;
  background-color: #beefed;
  min-height: 100vh;
  width: 20rem;
  padding: 1rem;
}

.categoryContainer {
  padding: 1rem;
  cursor: pointer;
}

.categoryContainer:not(:last-child) {
  border-bottom: 1px solid var(--theme-color);
}
</style>
