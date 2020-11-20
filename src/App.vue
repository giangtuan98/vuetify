<template>
  <v-app>
    <Header :links="links"></Header>
    <v-main>
      <router-view />
    </v-main>
    <Footer :links="links"></Footer>
  </v-app>
</template>

<script>
import Footer from "./components/shared/Footer";
import Header from "./components/shared/Header";

export default {
  components: {
    Footer,
    Header,
  },
  data: () => ({
    links: [
      {
        label: "Home",
        url: "/",
      },
      {
        label: "About",
        url: "/about",
      },
      {
        label: "Dashboard",
        url: "/dashboard",
      },
      {
        label: "Login",
        url: "/login",
      },
      {
        label: "Employee",
        url: "employees",
      },
      {
        label: "Kanban",
        url: "kanban",
      },
    ],
  }),
};
</script>

<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
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
</style>
