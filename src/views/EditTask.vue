<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card v-click-outside="closeTask">
        <v-card-title>
          <input
            class="w-100 edit-title hover-bg-dark"
            type="text"
            v-model="task.name"
            rounded
          />
        </v-card-title>
        <v-card-text class="text-left ">
          <div class="edit-content-wrapper">
            <h2 class="text-left card-title mb-2">Description</h2>
            <div
              class="hover-bg-dark task-description px-2 py-1"
              @click="openEditor"
              v-if="!showEditor"
            >
              <span v-html="task.description"> </span>
            </div>
            <div v-else>
              <editor
                apiKey="de2ntkaxg98r2oo8fprlb00l4zc2jzlh8hwnc7bz12jjgq4h"
                :init="init"
                v-model="newTask.description"
              >
              </editor>
              <div class="mt-3">
                <v-btn class="primary mr-4" @click="updateTask">Save</v-btn>
                <v-btn text @click="cancelUpdate">Cancel</v-btn>
              </div>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
// import { mapGetters } from "vuex";
import Editor from "@tinymce/tinymce-vue";

export default {
  components: {
    editor: Editor,
  },
  data() {
    return {
      dialog: true,
      showEditor: false,
      newTask: {},
      init: {
        height: 200,
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview anchor",
          "searchreplace visualblocks code fullscreen",
          "insertdatetime media table paste code",
        ],
        toolbar:
          "undo redo | formatselect | bold italic backcolor | \
           alignleft aligncenter alignright alignjustify | \
           bullist numlist outdent indent | removeformat | help",
      },
      task: {
        name: "",
        description: "",
      },
    };
  },
  methods: {
    closeTask() {
      this.$router.push({
        name: "kanban",
      });
    },
    openEditor() {
      this.newTask = { ...this.task };
      this.showEditor = true;
    },
    updateTask() {
      this.task.description = this.newTask.description;
      this.showEditor = false;
      // this.$store.dispatch("updateTask", {
      //   task: this.task,
      //   newTask: this.newTask,
      // });
    },
    cancelUpdate() {
      this.newTask = {};
      this.showEditor = false;
    },
  },
  mounted() {
    this.task = this.$store.getters.getTaskById(this.$route.params.id);
    console.log(this.$route.params.id);
  },
};
</script>
<style lang="scss">
.hover-bg-dark {
  transition: background-color 0.2s ease-in-out 0s;
  border-radius: 4px;

  &:hover {
    background: rgb(235, 236, 240);
    outline-color: transparent;
  }
  &:focus,
  &-active {
    background: #fff;
    outline-color: #4c9aff;
  }
}
.edit-title {
  font-size: 1.5rem;
  font-weight: 500;
  padding: 5px 10px;
  border-color: transparent;
  transition: outline-color 0.2s ease-in-out 0s;
}
.edit-content-wrapper {
  padding: 0 10px;
}
.task-description {
  min-height: 200px;
}

.card-title {
  font-size: 0.9375rem;
  font-style: inherit;
  font-weight: 600;
  letter-spacing: -0.003em;
  line-height: 24px;
  color: rgb(23, 43, 77);
  overflow-wrap: break-word;
  min-width: 0px;
  display: block;
}
</style>
