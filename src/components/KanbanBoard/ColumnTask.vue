<template>
  <v-card
    class="task mb-1 text-left"
    draggable
    @dragstart="pickupTask($event)"
    @drop.stop="moveColumn($event, columnIndex, taskIndex)"
  >
    <span class="task-title">
      {{ task.name }}
    </span>
    <span class="task-description">
      {{ task.description }}
    </span>
  </v-card>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true,
    },
    columnIndex: {
      type: Number,
      required: true,
    },
    taskIndex: {
      type: Number,
      required: true,
    },
  },
  methods: {
    pickupTask(event) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("type", "column");
      event.dataTransfer.setData("from-column-index", this.columnIndex);
      event.dataTransfer.setData("from-task-index", this.taskIndex);
    },
    moveColumn(event, toColumnIndex, toTaskIndex) {
      console.log(toTaskIndex);
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");
      const fromTaskIndex = event.dataTransfer.getData("from-task-index");

      this.$store.dispatch("moveTask", {
        fromColumnIndex,
        fromTaskIndex,
        toColumnIndex,
        toTaskIndex,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.task {
  padding: 5px;
  font-size: 0.75rem;
  cursor: move;

  &:hover {
    background-color: #ebecf0;
  }
  &-title {
    display: block;
    box-sizing: content-box;
    line-height: 1.42857143;
    max-height: 4.28571429em;
    overflow: hidden;
    color: #172b4d;
    font-weight: 400;
    font-style: normal;
    margin-bottom: 10px;
  }

  &-description {
  }
}
</style>
