<template>
  <div v-if="show" class="loadingPage">
    <div class="loadingWrap">
      <div>Loading</div>
      <div class="loadingBar"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["show"],
  setup() {},
};
</script>

<style scoped>
.loadingPage {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.8);
}

.loadingWrap {
  position: absolute;
  text-align: center;
  top: 40%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: fit-content;
}

.loadingBar {
  position: relative;
  overflow: hidden;
  width: 10rem;
  height: 0.5rem;
  margin-top: 1rem;
}

.loadingBar::after {
  content: "";
  position: absolute;
  top: 0;
  height: 1rem;
  width: 4rem;
  background-color: #bcbcbc;
  animation: load 1s infinite;
}

@keyframes load {
  from {
    left: 0;
  }
  to {
    left: 100%;
  }
}
</style>
