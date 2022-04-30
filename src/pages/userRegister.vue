<template>
  <div class="wrapper">
    <form class="registerForm" @submit="formSubmit">
      <div class="controlContainer">
        <label for="name">Name:</label>
        <input id="name" type="text" required v-model="name" />
      </div>
      <div class="controlContainer">
        <label for="email">Email:</label>
        <input id="email" type="email" required v-model="email" />
      </div>
      <div class="controlContainer">
        <label for="password">Password:</label>
        <input id="password" type="password" required v-model="password" />
      </div>
      <div class="controlContainer">
        <label for="confirm">Confirm Password:</label>
        <input id="confirm" type="password" required v-model="confirmPwd" />
      </div>
      <button type="submit">submit</button>
    </form>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
export default {
  name: "userRegister",
  setup() {
    let name = ref(null);
    let email = ref(null);
    let password = ref(null);
    let confirmPwd = ref(null);

    const formSubmit = async (e) => {
      e.preventDefault();

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
        let response = await fetch("http://localhost:5000/users", options);

        //sessionStorage.setItem("userData", JSON.stringify(postData));

        if (!response.ok)
          throw new Error(
            "an account with the same email already exist, please try to login"
          );
      } catch (error) {
        console.log(error);
      }
    };

    return { name, email, password, confirmPwd, formSubmit };
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
