<template>
  <v-container>
    <v-row>
      <BoardColumn
        v-for="(column, columnIndex) in board.columns"
        :key="columnIndex"
        :columnIndex="columnIndex"
        :column="column"
      ></BoardColumn>
      <CreateColumn @onCreate="createNewColumn"></CreateColumn>
    </v-row>
  </v-container>
</template>

<script>
import BoardColumn from "@/components/KanbanBoard/BoardColumn.vue";
import CreateColumn from "@/components/KanbanBoard/CreateColumn.vue";
export default {
  data() {
    return {
      board: [],
    };
  },
  components: {
    BoardColumn,
    CreateColumn,
  },
  methods: {
    createNewColumn(name) {
      console.log("a");
      this.$store.dispatch("createColumn", {
        name,
      });
    },
  },
  mounted() {
    this.board = this.$store.state.board;
  },
};
</script>

<style></style>
