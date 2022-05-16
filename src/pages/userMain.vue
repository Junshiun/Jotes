<template>
  <div class="mobileSelection_um">
    <div class="selectionWrap_um" @click="selectUpdate($event)">
      <span
        :class="{ select_um: true, selected: mobileSelect === 'login' }"
        value="login"
        id="userLoginButton"
        >Login</span
      >
      <span
        :class="{ select_um: true, selected: mobileSelect === 'register' }"
        value="register"
        id="userRegisterButton"
        >Register</span
      >
    </div>
  </div>
  <div class="userMainWrap" ref="forScroll">
    <div class="userMain">
      <div v-if="error" class="errorContain">
        <i class="bi bi-exclamation"></i> {{ error }}
      </div>
      <div v-else-if="info" class="infoContain">
        <i class="bi bi-info-circle-fill"></i> {{ info }}
      </div>
      <div class="userMainContain">
        <userLogin
          @errorUpdate="errorUpdate"
          :selected="mobileSelect"
        ></userLogin>
        <userRegister
          @errorUpdate="errorUpdate"
          @infoUpdate="infoUpdate"
          :selected="mobileSelect"
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
    let mobileSelect = ref("login");

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

    const selectUpdate = (e) => {
      const children = e.currentTarget.children;
      const target = e.target.getAttribute("value");

      if (target === mobileSelect.value) return;
      else mobileSelect.value = target;

      for (let i = 0; i < children.length; i++)
        children[i].classList.toggle("selected");
      // if (mobileSelect.value !== selected) mobileSelect.value = selected;
    };

    const scrollToTop = () => {
      forScroll.value.scrollTo({ top: 0, behavior: "smooth" });
    };

    return {
      error,
      info,
      errorUpdate,
      infoUpdate,
      forScroll,
      selectUpdate,
      mobileSelect,
    };
  },
};
</script>

<style>
* {
  --selection-height: 5rem;
}

.mobileSelection_um {
  display: none;
  justify-content: center;
  padding-top: 1rem;
  padding-bottom: 2rem;
  height: var(--selection-height);
}

.selectionWrap_um {
  border-radius: 1rem;
  height: 2rem;
  width: 20rem;
  display: grid;
  text-align: center;
  grid-gap: 0.1rem;
  grid-template-columns: 1fr 1fr;
  background-color: #eeeeee;
  overflow: hidden;
}

.select_um {
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 100%;
  height: 100%;
  background-color: #f3f6f4;
  cursor: pointer;
}

.select_um.selected {
  background-color: black;
  color: white;
}

.userMainWrap {
  padding-top: 1.5rem;
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

@media screen and (max-width: 700px) {
  .mobileSelection_um {
    display: flex;
  }

  .userMainWrap {
    padding-top: 0;
    max-height: calc(100vh - var(--header-height) - var(--selection-height));
    height: 100%;
  }

  .userMainContain {
    width: 100%;
    display: block;
    background-color: #f3f6f4;
  }
}
</style>
