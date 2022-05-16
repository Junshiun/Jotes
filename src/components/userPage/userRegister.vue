<template>
  <userContainer
    title="Sign Up"
    buttonName="register"
    @formSubmit="registerUser"
    id="userRegisterForm"
    :class="{ action: selected === 'register' }"
  >
    <!-- <form class="userForm_up" @submit="formSubmit"> -->
    <div class="inputField_up">
      <div class="controlContainer_up">
        <label for="registerName">Name:</label>
        <input id="registerName" type="text" required v-model="name" />
      </div>
      <div class="controlContainer_up">
        <label for="registerEmail">Email:</label>
        <input id="registerEmail" type="email" required v-model="email" />
      </div>
      <div class="controlContainer_up">
        <label for="registerPassword">Password:</label>
        <input
          id="registerPassword"
          type="password"
          required
          v-model="password"
        />
      </div>
      <div class="controlContainer_up">
        <label for="registerConfirm">Confirm Password:</label>
        <input
          id="registerConfirm"
          type="password"
          required
          v-model="confirmPwd"
        />
      </div>
    </div>
    <!-- <button class="userMainButton_up" type="submit">register</button> -->
    <!-- </form> -->
  </userContainer>
  <loadingPage :show="loadShow"></loadingPage>
</template>

<script>
import { ref } from "@vue/reactivity";
import userContainer from "./userContainer.vue";
import loadingPage from "../loadingPage.vue";
import { useStore } from "vuex";

export default {
  name: "userRegister",
  props: ["selected"],
  components: {
    userContainer,
    loadingPage,
  },
  setup(props, context) {
    let name = ref(null);
    let email = ref(null);
    let password = ref(null);
    let confirmPwd = ref(null);
    let loadShow = ref(false);

    const store = useStore();

    const registerUser = async () => {
      if (password.value.length < 8) {
        context.emit(
          "errorUpdate",
          "password length cannot less than 8 letters"
        );
        return;
      } else if (password.value !== confirmPwd.value) {
        context.emit(
          "errorUpdate",
          "password and comfirm password is not the same"
        );
        return;
      }

      loadShow.value = true;

      let response = await store.dispatch({
        type: "userRegister",
        payload: {
          name: name.value,
          email: email.value,
          password: password.value,
        },
      });

      if (response === false) {
        context.emit(
          "errorUpdate",
          "an account with the same email already exists, please try again"
        );
      } else if (response === true) {
        context.emit(
          "infoUpdate",
          "account created successfully, please try to login"
        );
        name.value = "";
        email.value = "";
        password.value = "";
        confirmPwd.value = "";
        console.log("here");

        document
          .getElementById("userRegisterButton")
          .classList.remove("selected");
        document.getElementById("userLoginButton").classList.add("selected");

        document.getElementById("userRegisterForm").classList.remove("action");
        document.getElementById("userLoginForm").classList.add("action");
      } else {
        context.emit("errorUpdate", response);
      }

      loadShow.value = false;
    };

    return { name, email, password, confirmPwd, registerUser, loadShow };
  },
};
</script>

<style scoped></style>
