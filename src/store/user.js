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

    return new Promise((resolve, reject) => {
      (async () => {
        try {
          let response = await fetch(
            "http://localhost:5000/users/login",
            options
          );

          let data = await response.json();

          if (!response.ok) {
            reject("invalid email or password");
          } else {
            sessionStorage.setItem("userData", JSON.stringify(data));
            dispatch("getUserData");
            router.push({ path: "/notes" });
            resolve(true);
          }
        } catch (error) {
          reject(error.message);
        }
      })();
    });
  },
  async userLogout({ dispatch }) {
    sessionStorage.removeItem("userData");
    dispatch("getUserData");
    router.push({ path: "/" });
  },
};

export default userActions;
