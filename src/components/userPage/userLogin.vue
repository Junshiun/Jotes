<template>
  <userContainer title="Login" buttonName="login" @formSubmit="loginUser">
    <!--<form class="userForm_up" @submit="formSubmit">-->
    <div class="inputField_up">
      <div class="controlContainer_up">
        <label for="loginEmail">Email:</label>
        <input id="loginEmail" type="email" required v-model="email" />
      </div>
      <div class="controlContainer_up">
        <label for="loginPassword">Password:</label>
        <input id="loginPassword" type="password" required v-model="password" />
      </div>
    </div>
    <!-- <button class="userMainButton_up" type="submit">login</button> -->
    <!-- </form> -->
  </userContainer>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import userContainer from "./userContainer.vue";

export default {
  name: "userLogin",
  components: {
    userContainer,
  },
  setup(props, context) {
    let email = ref(null);
    let password = ref(null);

    const store = useStore();

    const router = useRouter();

    store.dispatch("getUserData");

    if (store.getters.getUser) {
      router.push({ path: "/notes" });
    }
    const loginUser = async () => {
      let response = await store.dispatch({
        type: "userLogin",
        payload: { email: email.value, password: password.value },
      });

      if (response === true) console.log("login success");
      else {
        context.emit("errorUpdate", response);
      }
    };

    return { email, password, loginUser };
  },
};
</script>

<style scoped></style>
