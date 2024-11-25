<template>
  <div id="header">
    <div class="titleContainer">
      <router-link class="title" to="/">{{ title }}</router-link>
    </div>
    <profileComponent />
  </div>
</template>

<script>
import { useStore } from "vuex";
import profileComponent from "./profileComponent.vue";
export default {
  name: "appsHeader",
  components: {
    profileComponent,
  },
  props: {
    title: String,
  },
  setup() {
    let store = useStore();

    store.dispatch("getUserData");
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap");

#header {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--header-height);
  padding: 1rem;
  background-color: white;
  margin: 0;
  border-bottom: 2px solid #f3f6f4;
}

.titleContainer {
  flex-grow: 1;
}

.title {
  color: black;
  font-family: "Josefin Sans", sans-serif;
  font-size: 1.5rem;
  font-weight: 800;
  text-decoration: none;
}
</style>
