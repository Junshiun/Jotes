import Statics from "@/assets/statics";
import { router } from "@/router";

const userActions = {
  getUserData(context) {
    let data = JSON.parse(sessionStorage.getItem("userData"));
    context.commit("saveUser", data);
  },
  async userRegister({ dispatch }, { payload }) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        password: payload.password,
      }),
    };

    try {
      let response = await fetch(
        process.env.VUE_APP_BACKEND + Statics.USER_ROUTE,
        options
      );

      if (!response.ok) {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      return error;
    }
  },
  async userLogin({ dispatch }, { payload: { email, password } }) {
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    };

    try {
      console.log(process.env.VUE_APP_BACKEND);
      let response = await fetch(
        process.env.VUE_APP_BACKEND + Statics.USER_ROUTE + "/login",
        options
      );

      let data = await response.json();

      console.log(response.status);

      if (!response.ok) {
        throw Error(data.errorDesc)
      } else {
        sessionStorage.setItem("userData", JSON.stringify(data));
        dispatch("getUserData");
        router.push({ path: "/notes" });
        return true;
      }
    } catch (error) {
      throw Error(error.message);
    }

    // return new Promise((resolve, reject) => {
    //   (async () => {
    //     try {
    //       let response = await fetch(
    //         "http://localhost:5000/users/login",
    //         options
    //       );

    //       let data = await response.json();

    //       if (!response.ok) {
    //         reject("invalid email or password");
    //       } else {
    //         sessionStorage.setItem("userData", JSON.stringify(data));
    //         dispatch("getUserData");
    //         router.push({ path: "/notes" });
    //         resolve(true);
    //       }
    //     } catch (error) {
    //       reject(error.message);
    //     }
    //   })();
    // });
  },
  async userLogout({ dispatch }) {
    sessionStorage.removeItem("userData");
    dispatch("getUserData");
    router.push({ path: "/" });
  },
  async userEdit({ dispatch, state }, { payload }) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: payload.password,
        name: payload.name,
        changePwd: payload.changePwd,
        email: state.user.email,
        newPassword: payload.newPassword,
      }),
    };

    try {
      let response = await fetch(
        process.env.VUE_APP_BACKEND + Statics.USER_ROUTE + "/profile",
        options
      );

      let data = await response.json();

      if (response.ok) {

        sessionStorage.setItem("userData", JSON.stringify(data));
        dispatch({
          type: "getUserData",
        });

        return true;
      } else {
        throw Error(data.errorDesc);
      }
    } catch (err) {
      throw Error(err.message);
    }
  },
  async userDelete({ dispatch, state }, { payload }) {
    let yes = confirm("Are you sure you want to delete this account?");

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: state.user.email,
        password: payload.password,
      }),
    };

    if (!yes) return;

    try {
      let response = await fetch(
        process.env.VUE_APP_BACKEND + Statics.USER_ROUTE + "/profile",
        options
      );

      let data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem("userData");
        console.log("dispatch success");
        dispatch({
          type: "getUserData",
        });
        return true;
      } else return data.message;
    } catch (err) {
      return err;
    }
  },
};

export default userActions;
