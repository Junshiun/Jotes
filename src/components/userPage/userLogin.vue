<template>
  <userContainer
    title="Login"
    buttonName="login"
    @formSubmit="loginUser"
    id="userLoginForm"
    :class="{ action: selected === 'login' }"
  >
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
  <loadingPage :show="loadShow"></loadingPage>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import userContainer from "./userContainer.vue";
import loadingPage from "../loadingPage.vue";

export default {
  name: "userLogin",
  props: ["selected"],
  components: {
    userContainer,
    loadingPage,
  },
  setup(props, context) {
    let email = ref(null);
    let password = ref(null);
    let loadShow = ref(false);

    const store = useStore();

    const router = useRouter();

    store.dispatch("getUserData");

    if (store.getters.getUser) {
      router.push({ path: "/notes" });
    }
    const loginUser = async () => {
      try {
        loadShow.value = true;

        let response = await store.dispatch({
          type: "userLogin",
          payload: { email: email.value, password: password.value },
        });

        if (response === true) console.log("login success");
        else {
          context.emit("errorUpdate", response.errorDesc);
        }
      } catch(err) {
        context.emit("errorUpdate", err.message);
      }finally {
        loadShow.value = false;
      }
    };

    return { email, password, loginUser, loadShow };
  },
};
</script>

<style scoped></style>
