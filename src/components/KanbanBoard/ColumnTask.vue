<template>
  <div>
    <div
      draggable
      @dragstart="pickupTask($event)"
      @drop.stop="moveTaskOrColumn($event, columnIndex, taskIndex)"
      @click="goToTask(task.id)"
      @dragend="dragEnd($event)"
    >
      <v-card class="task mb-1 text-left">
        <span class="task-title">
          {{ task.name }}
        </span>
        <span class="task-description" v-html="task.description"> </span>
      </v-card>
    </div>

    <!-- <div class="task-disable"></div> -->
  </div>
</template>

<script>
// import { Drag, DropList } from "vue-easy-dnd";
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
  data() {
    return {
      hide: false,
    };
  },
  methods: {
    goToTask(id) {
      this.$router.push({
        name: "edit-task",
        params: {
          id,
        },
      });
    },
    pickupTask(event) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("type", "task");
      event.dataTransfer.setData("from-column-index", this.columnIndex);
      event.dataTransfer.setData("from-task-index", this.taskIndex);

      this.$store.state.selectedColumnIndex = this.columnIndex;
      this.hide = true;

      let element = event.target;
      window.requestAnimationFrame(function() {
        element.classList.add("hide");
      });
    },
    dragEnd(event) {
      let element = event.target;

      element.classList.remove("hide");
      this.$store.state.selectedColumnIndex = -1;
    },
    moveTaskOrColumn(event, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData("type");

      if (type == "column") {
        this.moveColumn(event, toColumnIndex);
      } else {
        this.moveTask(event, this.columnIndex, toTaskIndex);
      }
      this.$store.state.selectedColumnIndex = -1;
      this.hide = false;
    },

    moveColumn(event, toColumnIndex) {
      const fromColumnIndex = event.dataTransfer.getData("from-column-index");

      this.$store.dispatch("moveColumn", {
        fromColumnIndex,
        toColumnIndex,
      });
    },

    moveTask(event, toColumnIndex, toTaskIndex) {
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
  word-break: break-all;

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

  &-disable {
    height: 100;
    background-color: red;
  }
}
.hide {
  transform: translateX(-9999px);
}
</style>
