<template>
  <div class="profileWrap" ref="test">
    <i class="bi bi-person-circle" @click.stop="clickHandler"></i>
    <div v-show="profileShow" class="profileContainer">
      <div v-if="store.state.user">
        <div class="profileDetail" @click="profile">
          {{ store.state.user.name }}
        </div>
        <div class="profileDetail">
          <router-link class="link" to="/notes">my notes</router-link>
        </div>
        <div class="profileDetail" @click="logout">logout</div>
      </div>
      <div v-else>
        <div class="profileDetail" @click="login">login</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import { router } from "@/router";

export default {
  name: "profileComponent",
  setup() {
    let profileShow = ref(false);

    let test = ref(null);

    let store = useStore();

    onMounted(() => {
      document.addEventListener("mousedown", closeProfile);
    });

    const clickHandler = () => {
      profileShow.value = !profileShow.value;
    };

    const closeProfile = (e) => {
      if (!test.value.contains(e.target)) profileShow.value = false;
    };

    const login = () => {
      router.push({ path: "/user" });
    };

    const logout = () => {
      store.dispatch("userLogout");
    };

    const profile = () => {
      router.push({ path: "/user/profile" });
    };

    return { profileShow, clickHandler, test, store, login, logout, profile };
  },
};
</script>

<style scoped>
.profileWrap {
  position: relative;
  z-index: 1;
}

.bi {
  cursor: pointer;
  font-size: 1.5rem;
}

.profileContainer {
  position: absolute;
  top: 110%;
  right: 0;
  background: white;
  box-shadow: 1px 1px 5px #999999;
  padding: 1rem;
  font-weight: 600;
}

.profileDetail {
  cursor: pointer;
  width: max-content;
}

.profileDetail:not(:last-child) {
  margin-bottom: 1rem;
}

.profileDetail > .link {
  color: black;
  text-decoration: none;
}
</style>
