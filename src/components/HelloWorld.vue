<template>
  <v-app>
    <!-- login module -->
    <v-app-bar app class="primary" dark>
      <v-toolbar-title>
        Vuetify dashboard
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text rounded>
        Home
      </v-btn>
      <v-btn text rounded>Login</v-btn>
    </v-app-bar>
    <v-main>
      <v-card width="400" class="mx-auto mt-5">
        <v-card-title primary-title>
          Login
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              name="Username"
              label="Username"
              id="username"
              prepend-icon="mdi-account-circle"
            ></v-text-field>
            <v-text-field
              name="Password"
              label="Password"
              id="password"
              :type="showPassword ? 'text' : 'password'"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
            <!-- @click:append la 1 directive, click la name, append la arg-->
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="success">Register</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary float-right">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>

    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link"
          color="white"
          text
          rounded
          class="my-2"
        >
          {{ link }}
        </v-btn>
        <v-col class="primary lighten-2 py-4 text-center white--text" cols="12">
          {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "HelloWorld",

  data: () => ({
    showPassword: false,
    links: ["Home", "Login"],
  }),
};
</script>
