import { router } from "@/router";

const userActions = {
  getUserData(context) {
    let data = JSON.parse(sessionStorage.getItem("userData"));
    context.commit("saveUser", data);
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
      let response = await fetch("http://localhost:5000/users/login", options);

      let data = await response.json();

      if (!response.ok) {
        return "invalid email or password";
      } else {
        sessionStorage.setItem("userData", JSON.stringify(data));
        dispatch("getUserData");
        router.push({ path: "/notes" });
        return true;
      }
    } catch (error) {
      return error.message;
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
        "http://localhost:5000/users/profile",
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
        return data.message;
      }
    } catch (err) {
      return err;
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
        "http://localhost:5000/users/profile",
        options
      );

      let data = await response.json();

      if (response.ok) {
        sessionStorage.removeItem("userData");
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
