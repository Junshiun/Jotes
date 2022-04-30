<template>
  <div class="partWrapper_np" v-if="theNote || type === 2">
    <div class="noteOptions_np">
      <h1>{{ page }}</h1>
      <button class="deleteButton_np" @click="buttonOne">
        <i v-if="type === 1" class="bi bi-trash-fill"></i>
        <i v-else class="bi bi-x-circle"></i>{{ btnOne }}
      </button>
    </div>
    <div class="noteWrapper_np">
      <form
        class="noteContainer_np"
        v-if="theNote || type === 2"
        @submit.prevent="buttonConfirm"
      >
        <h1><input class="inputTitle_np" v-model="title" type="text" /></h1>
        <div class="category_np">
          category:
          <input class="inputCategory_np" v-model="category" type="text" />
        </div>
        <div class="content_np">
          <textarea class="inputContent_np" v-model="content"></textarea>
        </div>
        <button type="submit">confirm</button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";

export default {
  name: "actionContainer",
  props: ["note", "btnOne", "type", "page"],
  setup(props, context) {
    const theNote = ref(props.note);

    let title = ref(null);
    let category = ref(null);
    let content = ref(null);

    if (props.note) {
      title.value = theNote.value.title;
      category.value = theNote.value.category;
      content.value = theNote.value.content;
    }

    const buttonConfirm = async () => {
      context.emit("buttonConfirm", {
        title: title.value,
        category: category.value,
        content: content.value,
      });
    };

    const buttonOne = async () => {
      context.emit("buttonOne");
    };

    return { theNote, title, category, content, buttonConfirm, buttonOne };
  },
};
</script>

<style scoped>
.inputTitle_np {
  font-size: 1.5rem;
}

.inputContent_np {
  width: 100%;
  height: 15rem;
}

button[type="submit"] {
  margin-top: 1rem;
  border: none;
  padding: 0.5rem;
  float: right;
  cursor: pointer;
}

button[type="submit"]:hover {
  background-color: #bcbcbc;
}
</style>
