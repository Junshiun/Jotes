<template>
  <div class="noteWrapper">
    <div class="topWrapper">
      <h1 class="title">{{ note.title }}</h1>
      <noteOptions></noteOptions>
    </div>
    <span class="category" @click="filter(note.category)">{{
      note.category
    }}</span>
    <p class="content">{{ note.content }}</p>
  </div>
</template>

<script>
import noteOptions from "./noteOptions.vue";

export default {
  name: "noteContainer",
  props: ["note"],
  components: {
    noteOptions,
  },
  setup(props, context) {
    const filter = (category) => {
      context.emit("filter", category);
    };

    return { filter };
  },
};
</script>

<style scoped>
.noteWrapper {
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: #beefed;
  width: 100%;
  border-radius: 1rem;
}

.topWrapper {
  display: flex;
}

.title {
  font-size: 1rem;
  margin-bottom: 1rem;
  flex-grow: 1;
}

.category {
  font-size: 0.7rem;
  padding: 0.5rem 0.7rem 0.5rem 0.7rem;
  background-color: var(--theme-color);
  color: white;
  margin-bottom: 1rem;
  border-radius: 1rem;
  cursor: pointer;
}
</style>
