<template>
  <div class="optionMain">
    <i class="bi bi-three-dots"></i>
  </div>
</template>

<script>
export default {
  name: "noteOptions",
  setup() {},
};
</script>

<style scoped>
.optionMain {
  display: flex;
  position: relative;
  align-items: center;
  cursor: pointer;
}

.bi-three-dots {
  color: var(--theme-color);
}
</style>
