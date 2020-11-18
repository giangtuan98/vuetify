<template>
  <input
    type="text"
    class="create-task border-none w-100"
    placeholder="Create new task"
    @keyup.enter="onCreate($event)"
  />
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
.create-task {
  padding: 5px;
}
</style>
