<template>
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
</template>

<script>
export default {
  name: "LoginPage",

  data: () => ({
    showPassword: false,
  }),
};
</script>
