<template>
  <v-col
    class="board-column"
    @drop="changeColumnIndex($event, columnIndex)"
    @dragover.prevent
    @dragenter.prevent
    draggable
    @dragstart.self="pickupColumn($event)"
  >
    <p class="board-column-title">
      {{ column.name }}
    </p>
    <ColumnTask
      v-for="(task, taskIndex) in column.tasks"
      :key="taskIndex"
      :task="task"
      :taskIndex="taskIndex"
      :columnIndex="columnIndex"
      draggable
    ></ColumnTask>

    <CreateTask @onCreate="createNewTask"></CreateTask>
  </v-col>
</template>

<script>
import ColumnTask from "./ColumnTask";
import CreateTask from "./CreateTask";

export default {
  components: {
    ColumnTask,
    CreateTask,
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
    },
  },
  methods: {
    createNewTask(name) {
      console.log(name);
      this.$store.dispatch("createTask", {
        tasks: this.column.tasks,
        name,
      });
    },
    pickupColumn(event) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("type", "column");
      event.dataTransfer.setData("from-column-index", this.columnIndex);
    },
    changeColumnIndex(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");

      const type = event.dataTransfer.getData("type");

      if (type == "column") {
        this.$store.dispatch("moveColumn", {
          fromColumnIndex,
          toColumnIndex,
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.board-column {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 4px 3px;
  margin: 5px;
  cursor: move;

  &-title {
    color: #5e6c84;
    text-transform: uppercase;
    font-weight: 400;
    margin-top: 3px;
    flex: 0 100 auto;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 0.875rem;
  }
}
</style>
