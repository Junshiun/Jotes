<template>
  <div class="optionMain" ref="option">
    <i class="bi bi-three-dots" @click="clickHandler"></i>
    <div v-show="showOptions" class="options">
      <span @click="editNote">edit</span>
      <span @click="deleteNote">delete</span>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted, onUnmounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { router } from "../../router";
export default {
  name: "noteOptions",
  props: ["noteId"],
  setup(props) {
    let showOptions = ref(false);
    let option = ref(null);

    const store = useStore();

    onMounted(() => {
      document.addEventListener("mousedown", closeOptions);
    });

    onUnmounted(() => {
      document.removeEventListener("mousedown", closeOptions);
    });

    const clickHandler = () => {
      showOptions.value = !showOptions.value;
    };

    const closeOptions = (e) => {
      if (!option.value.contains(e.target)) showOptions.value = false;
    };

    const editNote = () => {
      router.push({ path: `/notes/${props.noteId}/edit` });
    };

    const deleteNote = async () => {
      store.dispatch({ type: "deleteNote", payload: { id: props.noteId } });
    };

    return { showOptions, clickHandler, option, deleteNote, editNote };
  },
};
</script>

<style scoped>
.optionMain {
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
  margin-left: 2rem;
}

.bi-three-dots {
  color: var(--theme-color);
}

.options {
  position: absolute;
  top: 100%;
  right: 0%;
  background-color: white;
}

.options > span {
  display: block;
  width: max-content;
}
</style>
