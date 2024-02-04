<script setup lang="ts">
import { ref } from "vue";


const { login, loginFormState } = useAuthentication();
</script>

<template>
  <v-form @submit.prevent="login()">
    <v-row class="d-flex mb-3">
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Email</v-label>
        <v-text-field
          v-model="loginFormState.email"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Password</v-label>
        <v-text-field
          v-model="loginFormState.password"
          variant="outlined"
          type="password"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" class="pt-0">
        <div class="d-flex flex-wrap align-center ml-n2">
          <v-checkbox v-model="checkbox" color="primary" hide-details>
            <template v-slot:label
              ><p class="text-body-1">Remember this device</p></template
            >
          </v-checkbox>
          <div class="ml-sm-auto">
            <NuxtLink
              to="/forgot-password"
              class="text-primary text-decoration-none text-body-1 opacity-1 font-weight-medium"
              >Forgot Password ?</NuxtLink
            >
          </div>
        </div>
      </v-col>
      <v-col cols="12" class="pt-0">
        <v-btn
          color="primary"
          type="submit"
          size="large"
          block
          flat
          >Sign in</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
