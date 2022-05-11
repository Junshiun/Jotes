g
<template>
  <div class="noteWrapper">
    <div class="topWrapper">
      <span class="date">{{ date }}</span>
      <!--<noteOptions :noteId="note._id" />-->
    </div>
    <div class="bottomWrapper" @click="noteNavigate">
      <h1 class="title">{{ note.title }}</h1>
      <span
        v-if="note.category !== '' && note.category !== null"
        class="category"
        @click="filter(note.category)"
        >{{ note.category }}</span
      >
      <p class="content">{{ note.content }}</p>
    </div>
  </div>
</template>

<script>
import noteOptions from "./noteOptions.vue";
import { router } from "../../router";

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

    const date = new Date(props.note.updatedAt).toLocaleDateString("en", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

    const noteNavigate = () => {
      router.push({ path: `/notes/${props.note._id}` });
    };

    return { filter, date, noteNavigate };
  },
};
</script>

<style scoped>
.noteWrapper {
  position: relative;
  padding: 1rem;
  margin-bottom: 1rem;
  width: 100%;
}

.noteWrapper::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 1rem;
  width: 90%;
  height: 1px;
  background-color: #bcbcbc;
}

.topWrapper {
  display: flex;
  margin-bottom: 0.5rem;
}

.date {
  flex-grow: 1;
  font-size: 0.7rem;
}

.bottomWrapper {
  padding: 0.5rem;
}

.bottomWrapper:hover {
  background-color: #f6f6f6;
  cursor: pointer;
}

.title {
  font-size: 1rem;
  margin-bottom: 1rem;
}

.category {
  font-size: 0.7rem;
  padding: 0.3rem 0.7rem 0.3rem 0.7rem;
  background-color: var(--theme-color);
  color: white;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
  cursor: pointer;
}

.content {
  padding-right: 1rem;
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
