<template>
  <appsHeader title="Jotes" />
  <router-view></router-view>
</template>

<script>
import appsHeader from "./components/headers/appsHeader.vue";

export default {
  name: "App",
  components: {
    appsHeader,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");

:root {
  --header-height: 4rem;
  --theme-color: black;
}

* {
  font-family: "Roboto Mono", monospace;
  box-sizing: border-box;
  font-size: 0.85rem;
}

body {
  margin: 0;
  max-width: 100%;
}
</style>
