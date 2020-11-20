<template>
  <v-col
    class="board-column"
    @drop="changeColumnIndex($event, columnIndex, column.tasks.length)"
    @dragover.prevent
    @dragenter.prevent
    draggable
    @dragstart.self="pickupColumn($event)"
  >
    <p class="board-column-title">
      {{ column.name }}
    </p>
    <div class="list-task-wrapper">
      <!-- <transition-group name="task"> -->
      <ColumnTask
        class="task-fly"
        v-for="(task, taskIndex) in column.tasks"
        :key="taskIndex"
        :task="task"
        :taskIndex="taskIndex"
        :columnIndex="columnIndex"
        @updateSelectedColumnIndex="updateSelectedColumnIndex"
        draggable
      ></ColumnTask>
      <!-- </transition-group> -->

      <CreateTask @onCreate="createNewTask"></CreateTask>
      <transition name="fade">
        <div
          class="dropable"
          :class="{
            'dropable-choice': canDropable,
            'dropable-hover': dragHover,
          }"
          v-show="canDropable"
          @dragover="dragHover = true"
          @dragleave="dragHover = false"
          @drop="dragHover = false"
        ></div>
      </transition>
    </div>
  </v-col>
</template>

<script>
import ColumnTask from "./ColumnTask";
import CreateTask from "./CreateTask";
// import gsap from "gsap";

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
    selectedColumnIndex: {
      type: Number,
    },
  },
  data() {
    return {
      dragHover: false,
    };
  },
  methods: {
    updateSelectedColumnIndex(value) {
      this.selectedColumnIndex = value;
    },
    createNewTask(name) {
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
    changeColumnIndex(event, toColumnIndex, toTaskIndex) {
      const type = event.dataTransfer.getData("type");

      if (type == "column") {
        this.moveColumn(event, toColumnIndex);
      } else {
        this.moveTask(event, toColumnIndex, toTaskIndex);
      }
      this.$store.state.selectedColumnIndex = -1;
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
  computed: {
    canDropable() {
      return (
        this.selectedColumnIndex != -1 &&
        this.columnIndex != this.selectedColumnIndex
      );
    },
  },
  mounted() {
    // gsap.from(".task-fly", {
    //   duration: 2,
    //   opacity: 0,
    //   scale: 0,
    //   y: 800,
    //   ease: "power1",
    //   stagger: 0.1,
    // });
  },
};
</script>

<style lang="scss" scoped>
.board-column {
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 0;
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

  .list-task-wrapper {
    position: relative;
    height: calc(100% - 40px);
    padding: 4px 3px;
  }

  .dropable {
    height: 100%;
    width: 100%;
    border-radius: 4px;
    position: absolute;
    top: 0;
    z-index: 99;

    &-choice {
      border: 2px dashed #4a7eb5;
      background-color: #ebf2f9;
    }
    &-hover {
      border: 2px dashed #55a35a;
      background-color: #f3f9f4;
    }
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease-in-out;
  }

  .fade-enter,
  .fade-leave {
    opacity: 0;
  }
}

// .task-move {
//   transition: transform 1s ease;
// }
</style>
