<template>
  <div>
    <v-card class="task mb-1 text-left">
      <span class="task-title">
        {{ task.name }}
      </span>
      <span class="task-description" v-html="task.description"> </span>
    </v-card>
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
</style>
