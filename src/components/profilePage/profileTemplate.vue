<template>
  <div class="profileContainer_pp">
    <div v-if="type === 'edit' && error" class="errorContain">
      <i class="bi bi-exclamation"></i> {{ error }}
    </div>
    <span class="hiSpan">hi</span>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ["type", "error"],
  setup() {},
};
</script>

<style scoped>
.profileContainer_pp {
  position: relative;
  margin: auto;
  width: fit-content;
  padding: 1rem;
}
</style>
