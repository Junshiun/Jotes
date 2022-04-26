<template>
  <div id="header">{{ title }}</div>
</template>

<script>
export default {
  name: "AppsHeader",
  props: {
    title: String,
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Josefin+Sans&display=swap");

#header {
  width: 100%;
  padding: 1rem;
  background-color: var(--theme-color);
  margin: 0;
  color: white;
  font-family: "Josefin Sans", sans-serif;
}
</style>
