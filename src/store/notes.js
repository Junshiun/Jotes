import { router } from "@/router";

const notesActions = {
  async fetchNotes({ commit, state }) {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    const notes = await fetch(
      process.env.VUE_APP_BACKEND + "/notes",
      options
    ).then((res) => res.json());

    commit("updateNotes", notes);
  },

  async editNote({ state }, { payload: { title, category, content, id } }) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
      body: JSON.stringify({
        title: title,
        category: category,
        content: content,
      }),
    };

    try {
      const response = await fetch(
        process.env.VUE_APP_BACKEND + `/notes/${id}`,
        options
      );

      if (!response.ok) return "note not found";
      else {
        //router.push({ path: "/notes" });
        return true;
      }
    } catch (err) {
      return "error when request for note editing";
    }

    // return new Promise((resolve, reject) => {
    //   (async () => {
    //     try {
    //       const response = await fetch(
    //         `http://localhost:5000/notes/${id}`,
    //         options
    //       );

    //       if (!response.ok) reject("note not found");
    //       else {
    //         //router.push({ path: "/notes" });
    //         resolve(true);
    //       }
    //     } catch (err) {
    //       reject("error when request for note editing");
    //     }
    //   })();
    // });
  },

  async createNote(
    { state, dispatch },
    { payload: { title, category, content } }
  ) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${state.user.token}`,
      },
      body: JSON.stringify({
        title: title,
        category: category,
        content: content,
      }),
    };

    try {
      const response = await fetch(
        process.env.VUE_APP_BACKEND + "/notes/create",
        options
      );

      if (!response.ok) return "error when creating new note";
      else {
        dispatch("fetchNotes");
        router.push({ path: "/notes" });
        return true;
      }
    } catch (err) {
      return err;
    }

    // return new Promise((resolve, reject) => {
    //   (async () => {
    //     try {
    //       const response = await fetch(
    //         "http://localhost:5000/notes/create",
    //         options
    //       );

    //       if (!response.ok) reject("error when creating new note");
    //       else {
    //         resolve(true);
    //         dispatch("fetchNotes");
    //         router.push({ path: "/notes" });
    //       }
    //     } catch (err) {
    //       reject(err);
    //     }
    //   })();
    // });
  },

  async deleteNote({ dispatch, state }, { payload: { id } }) {
    let yes = confirm("Are you sure?");

    if (yes) {
      const options = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${state.user.token}`,
        },
      };

      try {
        const response = await fetch(
          process.env.VUE_APP_BACKEND + `/notes/${id}`,
          options
        );

        if (!response.ok) return "error when delete note";
        else {
          return true;
        }
      } catch (err) {
        return err;
      }
    } else return false;
    // return new Promise((resolve, reject) => {
    //   (async () => {
    //     if (yes) {
    //       const options = {
    //         method: "DELETE",
    //         headers: {
    //           Authorization: `Bearer ${state.user.token}`,
    //         },
    //       };

    //       try {
    //         const response = await fetch(
    //           `http://localhost:5000/notes/${id}`,
    //           options
    //         );

    //         if (!response.ok) reject("error when delete note");
    //         else {
    //           resolve(true);
    //           dispatch("fetchNotes");
    //           router.push({ path: "/notes" });
    //         }
    //       } catch (err) {
    //         reject(err);
    //       }
    //     } else resolve(true);
    //   })();
    // });
  },
};

export default notesActions;
