<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="4" offset-md="4">
        <v-card>
          <v-card-title>Signup</v-card-title>
          <v-card-text>
            <v-form
              ref="signupForm"
              @submit.prevent="submitForm"
              v-model="formValidity"
            >
              <v-text-field
                v-model="user.email"
                label="Email"
                type="email"
                prepend-icon="mdi-account-circle"
                :rules="emailRules"
              ></v-text-field>
              <v-autocomplete
                label="Which browser do you use?"
                :items="browsers"
                prepend-icon="mdi-web"
              >
              </v-autocomplete>
              <v-file-input
                accept="image/png, image/jped, image/bmp"
                placeholder="Attach profile picture"
                label="Profile pucture"
              ></v-file-input>
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                :return-value.sync="user.birthday"
                transition="scale-transition"
                offset-y
                min-width="290px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    label="Birthday"
                    v-model="user.birthday"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker v-model="user.birthday" no-title scrollable>
                  <v-spacer></v-spacer>
                  <v-btn text color="primary" @click="menu = false">
                    Cancel
                  </v-btn>
                  <v-btn
                    text
                    color="primary"
                    @click="$refs.menu.save(user.birthday)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>

              <v-switch
                label="Accept term of use"
                v-model="acceptTermOfUse"
                :rules="agreeToTermsRules"
              ></v-switch>

              <v-btn
                color="primary"
                type="submit"
                class="mr-4"
                :disabled="!formValidity"
                >Submit</v-btn
              >
              <v-btn @click="resetValidation" class="success mr-4"
                >Reset validation</v-btn
              >
              <v-btn @click="resetForm" class="error">
                Reset
              </v-btn>
            </v-form>
          </v-card-text>
          <v-divider></v-divider>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      agreeToTermsRules: [
        (value) =>
          !!value ||
          "You must agree to the terms and condions to sign up for an account",
      ],
      emailRules: [
        (value) => !!value || "Email is required",
        (value) => value.indexOf("@") !== 0 || "Email should have a username.",
        (value) => value.indexOf("@") || "Email shoud include an @ symbol.",
        (value) =>
          value.indexOf(".") - value.indexOf("@") > 1 ||
          "Email should contain a valid domain",
        (value) =>
          value.indexOf(".") <= value.length - 3 ||
          "Email should contain a valid domain",
      ],
      showPassword: false,
      menu: false,
      browsers: ["Chrome", "Firefox", "Microsoft Edge", "Opera mini"],
      acceptTermOfUse: false,
      user: {
        email: "",
        password: "",
        birthday: "",
      },
      formValidity: false,
    };
  },
  methods: {
    resetForm() {
      this.$refs.signupForm.reset();
    },
    resetValidation() {
      this.$refs.signupForm.resetValidation();
    },
    submitForm() {
      this.$refs.signupForm.validate();
    },
  },
};
</script>

<style></style>
