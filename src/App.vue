<template>
  <AppsHeader title="Jotes" />
  <router-view></router-view>
</template>

<script>
import AppsHeader from "./components/headers/AppsHeader.vue";

export default {
  name: "App",
  components: {
    AppsHeader,
  },
};
</script>

<style>
:root {
  --theme-color: black;
}

* {
  box-sizing: border-box;
  font-size: 0.9rem;
}

body {
  margin: 0;
  max-width: 100%;
}
</style>
