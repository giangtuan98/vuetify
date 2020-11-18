<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="employees"
      class="elevation-1"
      @click:row="selectRow"
    >
    </v-data-table>
    <div class="text-center ma-2">
      <v-snackbar v-model="snackbar">
        You have selected {{ currentItem }}

        <template v-slot:action="{ attrs }">
          <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>
  </div>
</template>

<script>
// import axios from "../plugins/axios";

export default {
  data() {
    return {
      snackbar: false,
      currentItem: false,
      headers: [
        { text: "Id", value: "id" },
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Title", value: "title" },
        { text: "Salary", value: "salary" },
      ],
      employees: [],
    };
  },
  mounted() {
    this.$axios
      .get("/employees")
      .then((result) => (this.employees = result.data));
  },
  methods: {
    selectRow(event) {
      this.snackbar = true;
      this.currentItem = event.name + event.age + " years old";
    },
  },
};
</script>

<style></style>
