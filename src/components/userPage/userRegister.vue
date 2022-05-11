<template>
  <userContainer
    title="Sign Up"
    buttonName="register"
    @formSubmit="registerUser"
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
</template>

<script>
import { ref } from "@vue/reactivity";
import userContainer from "./userContainer.vue";

export default {
  name: "userRegister",
  components: {
    userContainer,
  },
  setup(props, context) {
    let name = ref(null);
    let email = ref(null);
    let password = ref(null);
    let confirmPwd = ref(null);

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

      let options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          email: email.value,
          password: password.value,
        }),
      };

      try {
        let response = await fetch(
          process.env.VUE_APP_BACKEND + "/users",
          options
        );

        //sessionStorage.setItem("userData", JSON.stringify(postData));

        if (!response.ok) {
          context.emit(
            "errorUpdate",
            "an account with the same email already exists, please try again"
          );
        } else {
          context.emit(
            "infoUpdate",
            "account created successfully, please try to login"
          );
          name.value = "";
          email.value = "";
          password.value = "";
          confirmPwd.value = "";
        }
      } catch (error) {
        context.emit("errorUpdate", error);
      }
    };

    return { name, email, password, confirmPwd, registerUser };
  },
};
</script>

<style scoped></style>
