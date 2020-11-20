<template>
  <v-container>
    <v-row>
      <BoardColumn
        v-for="(column, columnIndex) in board.columns"
        :key="columnIndex"
        :columnIndex="columnIndex"
        :column="column"
        :selectedColumnIndex="selectedColumnIndex"
      ></BoardColumn>
      <CreateColumn @onCreate="createNewColumn"></CreateColumn>
    </v-row>
    <router-view></router-view>
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
      this.$store.dispatch("createColumn", {
        name,
      });
    },
  },
  computed: {
    selectedColumnIndex() {
      return this.$store.state.selectedColumnIndex;
    },
  },
  mounted() {
    this.board = this.$store.state.board;
  },
};
</script>

<style></style>
