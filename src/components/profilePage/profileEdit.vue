<template>
  <profileTemplate v-if="user" type="edit" :error="error">
    <form @submit.prevent="editUser">
      <div class="relativeImgContainer">
        <div class="imgContainer">
          <img class="profileImage" src="/avatar1.png" />
          <i class="bi bi-image-alt"
            ><a href="https://www.freepik.com/vectors/teenager" target="_blank"
              >Teenager vector created by studiogstock - www.freepik.com</a
            ></i
          >
        </div>
      </div>
      <input class="nameSpan" v-model="name" required />
      <span>Email: {{ user.email }}</span>
      <div>
        <label for="password_pp">Password: </label>
        <input type="password" id="password_pp" v-model="password" required />
      </div>
      <span class="changeButton" @click="updateChangePwd">
        <i class="bi bi-shield-lock-fill"></i> Change Password
      </span>
      <div v-if="changePwd">
        <div class="controlPwd">
          <label class="labelNewPwd" for="newPassword">New Password: </label>
          <input
            type="password"
            id="newPassword"
            v-model="newPassword"
            required
            class="inputControl"
          />
        </div>
        <div class="controlPwd">
          <label class="labelNewPwd" for="confirmNewPassword"
            >Confirm New Password:
          </label>
          <input
            type="password"
            id="confirmNewPassword"
            v-model="confirmNewPassword"
            required
            class="inputControl"
          />
        </div>
      </div>
      <div class="buttonWrap">
        <button class="deleteButton" @click="deleteUser">
          <i class="bi bi-trash-fill"></i>Delete Account
        </button>
        <button class="doneButton" type="submit">
          <i class="bi bi-pencil-square"></i> Done Edit
        </button>
      </div>
    </form>
  </profileTemplate>
</template>

<script>
import { ref } from "@vue/reactivity";
import profileTemplate from "./profileTemplate.vue";
import { useStore } from "vuex";
import { onBeforeRouteLeave } from "vue-router";
import { router } from "../../router";
export default {
  name: "profileEdit",
  props: ["user", "notes"],
  components: {
    profileTemplate,
  },
  setup(props, context) {
    let name = ref(props.user.name);
    let password = ref(null);
    let newPassword = ref(null);
    let confirmNewPassword = ref(null);
    let error = ref(null);
    let success = false;

    let changePwd = ref(false);

    const store = useStore();

    const updateChangePwd = () => {
      changePwd.value = !changePwd.value;
    };

    const editUser = async () => {
      let response = await store.dispatch({
        type: "userEdit",
        payload: {
          password: password.value,
          name: name.value,
          changePwd: changePwd.value,
          newPassword: newPassword.value,
        },
      });

      if (response !== true) errorUpdate(response);
      else {
        success = true;
        router.push({ path: "/user/profile" });
      }
    };

    const deleteUser = async () => {
      let response = await store.dispatch({
        type: "userDelete",
        payload: {
          password: password.value,
        },
      });

      if (response !== true) errorUpdate(response);
      else {
        success = true;
        router.push({ path: "/" });
      }
    };

    const errorUpdate = (err) => {
      error.value = err;
      context.emit("scrollTop");
    };

    onBeforeRouteLeave((to, from, next) => {
      if (success !== true) {
        const yes = confirm("all changes will not be saved. Are you sure?");

        if (yes) next();
        else next(false);
      } else next();
    });

    return {
      name,
      password,
      newPassword,
      confirmNewPassword,
      updateChangePwd,
      changePwd,
      editUser,
      deleteUser,
      error,
    };
  },
};
</script>

<style scoped>
button {
  display: block;
}

.controlPwd {
  margin-bottom: 2rem;
}

.labelNewPwd {
  display: block;
}

.changeButton {
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid #bcbcbc;
  background-color: transparent;
  margin: 1rem 0 1rem 0;
  cursor: pointer;
}

.inputControl {
  margin-top: 0.5rem;
  width: 100%;
}

.buttonWrap {
  display: flex;
}

.doneButton {
  padding: 0.5rem 1rem 0.5rem 1rem;
  border: 1px solid #bcbcbc;
  border-radius: 10px;
  background-color: transparent;
  cursor: pointer;
}

.deleteButton {
  padding: 0.5rem 1rem 0.5rem 1rem;
  margin: auto;
  margin-right: 1rem;
}
</style>
