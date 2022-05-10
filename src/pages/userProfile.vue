<template>
  <div class="userProfile" ref="forScroll">
    <router-view :user="user" :notes="notes" @scrollTop="scroll"></router-view>
    <!-- <profileMain></profileMain> -->
  </div>
</template>

<script>
import { useStore } from "vuex";
import { router } from "../router";
import profileMain from "../components/profilePage/profileMain.vue";
import { computed, ref } from "@vue/runtime-core";

export default {
  name: "userProfile",
  components: {
    profileMain,
  },
  setup() {
    const store = useStore();

    let forScroll = ref(null);

    store.dispatch("getUserData");
    store.dispatch({ type: "fetchNotes" });

    if (!store.state.user) {
      router.push({ path: "/user" });
      return;
    }

    const user = computed(() => {
      return store.state.user;
    });

    const notes = computed(() => {
      return store.state.notes;
    });

    const scroll = () => {
      setTimeout(() => {
        forScroll.value.scrollTo({ top: 0, behavior: "smooth" });
      }, 500);
    };

    return { store, user, notes, forScroll, scroll };
  },
};
</script>

<style scoped>
.userProfile {
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
  padding-top: 2rem;
}
</style>
