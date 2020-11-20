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
      cards: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }],
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

<style>
#container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.card {
  width: 100px;
  height: 100px;
  background-color: green;
  /* display: inline-block; */
}
</style>
