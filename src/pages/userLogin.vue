<template>
  <div class="wrapper">
    <form class="registerForm" @submit="formSubmit">
      <div class="controlContainer">
        <label for="email">Email:</label>
        <input id="email" type="email" required v-model="email" />
      </div>
      <div class="controlContainer">
        <label for="password">Password:</label>
        <input id="password" type="password" required v-model="password" />
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
  name: "userLogin",
  setup() {
    let email = ref(null);
    let password = ref(null);

    const store = useStore();

    const router = useRouter();

    store.dispatch("getUserData");

    if (store.getters.getUser) {
      router.push({ path: "/notes" });
    }
    const formSubmit = async (e) => {
      e.preventDefault();

      let login = await store.dispatch({
        type: "userLogin",
        payload: { email: email.value, password: password.value },
      });

      if (login === true) console.log("login success");
      else console.log(login);
    };

    return { email, password, formSubmit };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  width: 100%;
}

.registerForm {
  width: 30rem;
  max-width: 95%;
}

.controlContainer {
  width: 100%;
  padding: 1rem;
}

.controlContainer:not(:last-child) {
  margin-bottom: 1rem;
}

.controlContainer > label {
  margin-bottom: 1rem;
  display: block;
}

.controlContainer > input {
  padding: 0.5rem;
  width: 100%;
}
</style>
