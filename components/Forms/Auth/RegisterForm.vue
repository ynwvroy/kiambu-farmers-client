<script setup lang="ts">
import { slugify } from "~~/utils/Slugify";

const { register, registerFormState } = useAuthentication();

// Slugify for username
watch(
  () => registerFormState.value.full_name,
  (newName) => {
    registerFormState.value.username = slugify(newName);
  }
);
</script>

<template>
  <v-form @submit.prevent="register()">
    <v-row class="d-flex mb-3">
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Full name</v-label>
        <v-text-field
          v-model="registerFormState.full_name"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Username</v-label>
        <v-text-field
          :readonly="true"
          v-model="registerFormState.username"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Email Address</v-label>
        <v-text-field
          v-model="registerFormState.email"
          variant="outlined"
          type="email"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Phone number</v-label>
        <v-text-field
          v-model="registerFormState.phone_number"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Password</v-label>
        <v-text-field
          v-model="registerFormState.password"
          variant="outlined"
          type="password"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Password</v-label>
        <v-select
          v-model="registerFormState.user_type"
          :items="['farmer', 'user']"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-btn type="submit" color="primary" size="large" block flat
          >Sign up</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>
