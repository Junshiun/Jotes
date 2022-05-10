<template>
  <div class="userMainWrap" ref="forScroll">
    <div class="userMain">
      <div v-if="error" class="errorContain">
        <i class="bi bi-exclamation"></i> {{ error }}
      </div>
      <div v-else-if="info" class="infoContain">
        <i class="bi bi-info-circle-fill"></i> {{ info }}
      </div>
      <div class="userMainContain">
        <userLogin @errorUpdate="errorUpdate"></userLogin>
        <userRegister
          @errorUpdate="errorUpdate"
          @infoUpdate="infoUpdate"
        ></userRegister>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import userLogin from "../components/userPage/userLogin.vue";
import userRegister from "../components/userPage/userRegister.vue";

export default {
  components: {
    userLogin,
    userRegister,
  },
  setup() {
    const forScroll = ref(null);
    let error = ref(null);
    let info = ref(null);

    const errorUpdate = (err) => {
      error.value = err;
      setTimeout(() => {
        scrollToTop();
      }, 500);
    };

    const infoUpdate = (message) => {
      info.value = message;
      setTimeout(() => {
        scrollToTop();
      }, 500);
    };

    const scrollToTop = () => {
      forScroll.value.scrollTo({ top: 0, behavior: "smooth" });
    };

    return { error, info, errorUpdate, infoUpdate, forScroll };
  },
};
</script>

<style>
.userMainWrap {
  padding-top: 2rem;
  max-height: calc(100vh - var(--header-height));
  overflow-y: auto;
  display: flex;
  justify-content: center;
  width: 100%;
}

.userMain {
  max-width: 95%;
  width: 50rem;
}

.errorContain,
.infoContain {
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f3f6f4;
  margin-bottom: 1rem;
}

.errorContain {
  border: 1px solid #990000;
}

.errorContain > i {
  font-size: 1rem;
  color: red;
}

.infoContain {
  border: 1px solid #3d85c6;
}

.infoContain > i {
  font-size: 1rem;
  color: #3d85c6;
}

/* 
.userMainContain {
  max-width: 95%;
  width: 50rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  overflow: hidden;
  grid-gap: 1px;
  background-color: #f3f6f4;
} */

.userMainContain {
  width: 100%;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  background-color: #f3f6f4;
  height: fit-content;
}
</style>
