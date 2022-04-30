import { createStore } from "vuex";
import userActions from "./user";
import notesActions from "./notes";
// import { router } from "@/router";

const store = createStore({
  state: {
    user: null,
    notes: null,
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getNotes(state) {
      return state.notes;
    },
  },
  mutations: {
    saveUser(state, user) {
      state.user = user;
    },
    updateNotes(state, notes) {
      state.notes = notes;
    },
  },
  actions: {
    ...userActions,
    ...notesActions,
  },
});

export default store;
