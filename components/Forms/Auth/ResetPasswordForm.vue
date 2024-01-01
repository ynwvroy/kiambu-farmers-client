<script setup lang="ts">
import { ref } from "vue";


const { login, loginFormState } = useAuthentication();
</script>

<template>
  <v-row class="d-flex mb-3">
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Password</v-label>
      <v-text-field
        v-model="loginFormState.email"
        placeholder="Your new password"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Confirm password</v-label>
      <v-text-field
        v-model="loginFormState.email"
        placeholder="Confirm your new password"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" class="pt-0">
      <v-btn color="primary" size="large" block flat
        >Submit</v-btn
      >
    </v-col>
  </v-row>
</template>
