<template>
  <v-app-bar app class="primary" dark>
    <v-toolbar-title>
      Vuetify dashboard
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn
      v-for="link in links"
      :key="`${link.label}-header-link`"
      text
      rounded
      :to="link.url"
    >
      {{ link.label }}
    </v-btn>
    <v-btn text rounded @click="toggleTheme">Toggle theme</v-btn>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>
