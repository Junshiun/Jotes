<template>
  <router-view v-if="note" :note="note"></router-view>
  <div v-else class="loadWrap_np">
    <div class="load_np">loading</div>
    <div class="loadBar_np"></div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { router } from "../router";

export default {
  name: "notePage",
  setup() {
    const route = useRoute();
    const store = useStore();
    let note_id = route.params.id;

    const note = ref(null);

    (async () => {
      const options = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${store.state.user.token}`,
        },
      };

      const response = await fetch(
        process.env.VUE_APP_BACKEND + `/notes/${note_id}`,
        options
      );

      if (!response.ok) router.push({ path: "/notes" });
      else {
        note.value = await response.json();
      }
    })();

    return { note };
  },
};
</script>

<style>
* {
  --top-bar-height: 3rem;
}

.partWrapper_np {
  width: 100%;
  background-color: white;
}

.noteOptions_np {
  display: flex;
  align-items: center;
  height: var(--top-bar-height);
}

.noteOptions_np > h1 {
  font-size: 1.5rem;
  margin-left: 1rem;
  flex-grow: 1;
}

.editButton_np {
  text-decoration: none;
  color: black;
  padding: 1rem;
  background-color: #eeeeee;
  cursor: pointer;
}

.editButton_np > i,
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

.noteWrapper_np {
  max-height: calc(100vh - var(--top-bar-height) - var(--header-height));
  overflow-y: auto;
  padding: 1rem 1rem 0 0;
  display: flex;
  justify-content: center;
}

.noteContainer_np {
  display: block;
  padding-left: 1rem;
  width: 100%;
  height: fit-content;
}

.noteContainer_np > h1 {
  width: 100%;
  background-color: #f6f6f6;
  padding: 1rem 0 1rem 1rem;
  font-size: 1.5rem;
}

.noteContainer_np > .category_np {
  margin-bottom: 1rem;
}

.noteContainer_np > .content_np {
  border-top: 2px solid #f6f6f6;
  padding-top: 0.5rem;
}

.loadWrap_np {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.loadBar_np {
  position: relative;
  margin-top: 1rem;
  width: 10rem;
  height: 0.2rem;
  overflow: hidden;
}

.loadBar_np::after {
  position: absolute;
  content: "";
  height: 1rem;
  width: 2rem;
  top: 0;
  background-color: #bcbcbc;
  animation: load_np 2s infinite;
}

@keyframes load_np {
  from {
    left: 0;
  }

  to {
    left: 100%;
  }
}

@media screen and (max-width: 700px) {
  .partWrapper_np {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
  }

  .noteWrapper_np {
    padding-top: 0;
    max-height: calc(
      100vh - var(--top-bar-height) - var(--header-height) -
        var(--category-bar-height) - 1rem
    );
  }
}
</style>
