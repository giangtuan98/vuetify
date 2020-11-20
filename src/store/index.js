import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "../default-board";
import { uuid } from "../utils";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

const store = new Vuex.Store({
  plugins: [
    (store) => {
      store.subscribeAction({
        after: (action, state) => {
          localStorage.setItem("board", JSON.stringify(state.board));
        },
      });
    },
  ],
  state: {
    board,
    selectedColumnIndex: -1,
  },
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        id: uuid(),
        name,
      });
    },
    CREATE_COLUMN(state, { name }) {
      state.board.columns.push({
        name,
        tasks: [],
      });
    },
    MOVE_COLUMN(state, { fromColumnIndex, toColumnIndex }) {
      const columns = state.board.columns;

      const columnToMove = columns.splice(fromColumnIndex, 1)[0];

      columns.splice(toColumnIndex, 0, columnToMove);
    },
    MOVE_TASK(
      state,
      { fromColumnIndex, toColumnIndex, fromTaskIndex, toTaskIndex }
    ) {
      const columns = state.board.columns;
      const taskToMove = columns[fromColumnIndex].tasks.splice(
        fromTaskIndex,
        1
      )[0];

      columns[toColumnIndex].tasks.splice(toTaskIndex, 0, taskToMove);
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
  },
  actions: {
    createTask({ commit }, { tasks, name }) {
      commit("CREATE_TASK", { tasks, name });
    },
    createColumn({ commit }, { name }) {
      commit("CREATE_COLUMN", { name });
    },
    moveColumn({ commit }, { fromColumnIndex, toColumnIndex }) {
      commit("MOVE_COLUMN", { fromColumnIndex, toColumnIndex });
    },
    moveTask(
      { commit },
      { fromColumnIndex, toColumnIndex, fromTaskIndex, toTaskIndex }
    ) {
      commit("MOVE_TASK", {
        fromColumnIndex,
        toColumnIndex,
        fromTaskIndex,
        toTaskIndex,
      });
    },
    updateTask({ commit }, { task, key, value }) {
      commit("UPDATE_TASK", {
        task,
        key,
        value,
      });
    },
  },
  getters: {
    getTaskById: (state) => (taskId) => {
      for (let column of state.board.columns) {
        let tasks = column.tasks.filter((task) => task.id == taskId);

        if (tasks[0]) {
          return tasks[0];
        }
      }

      return {};
    },
  },
  modules: {},
});

export default store;
