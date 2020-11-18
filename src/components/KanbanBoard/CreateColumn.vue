<template>
  <v-col>
    <div class="create-column-wrapper">
      <input
        type="text"
        class="create-task border-none w-100"
        placeholder="Create new task"
        @keyup.enter="onCreate($event)"
      />
    </div>
  </v-col>
</template>

<script>
export default {
  methods: {
    onCreate(event) {
      const value = event.target.value;
      if (value) {
        this.$emit("onCreate", value);
        event.target.value = "";
      }
    },
  },
};
</script>

<style lang="scss">
.border-none {
  border: none;
  outline: none;
}
.w-100 {
  width: 100%;
}
.create-column-wrapper {
  background-color: #f5f5f5;
}
.create-task {
  padding: 5px;
}
</style>
