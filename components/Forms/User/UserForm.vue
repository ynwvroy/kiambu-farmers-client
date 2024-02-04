<script setup lang="ts">
import { slugify } from "~~/utils/Slugify";

const { isEditingUser, userFormState, updateSingleUser, createUser } =
  useUsers();

const saveUser = async () => {
  if (isEditingUser.value) {
    await updateSingleUser(userFormState.value.id);
  } else {
    await createUser();
  }
};

// Watch for changes in the name and update the slug
watch(
  () => userFormState.value.full_name,
  (newName) => {
    userFormState.value.username = slugify(newName);
  }
);
</script>

<template>
  <h3 class="text-h3 pt-12 pb-3">Enter user details</h3>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Full name</v-label>
      <v-text-field
        v-model="userFormState.full_name"
        variant="outlined"
        placeholder="Name"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Username</v-label>
      <v-text-field
        v-model="userFormState.username"
        :readonly="true"
        variant="outlined"
        placeholder="Username"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Email</v-label>
      <v-text-field
        v-model="userFormState.email"
        variant="outlined"
        placeholder="Email"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Phone number</v-label>
      <v-text-field
        v-model="userFormState.phone_number"
        variant="outlined"
        placeholder="Phone number"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Password</v-label>
      <v-text-field
        v-model="userFormState.password"
        variant="outlined"
        placeholder="Password"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">User type</v-label>
      <v-text-field
        v-model="userFormState.user_type"
        variant="outlined"
        placeholder="User type"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Organization</v-label>
      <v-text-field
        v-model="userFormState.organization_id"
        variant="outlined"
        placeholder="Organization ID"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Is verified</v-label>
      <v-text-field
        v-model="userFormState.is_verified"
        variant="outlined"
        placeholder="Verification status"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>

  <v-row class="py-12 px-6" justify="end">
    <v-btn color="secondary" @click="saveUser()">
      {{ isEditingUser ? "Update" : "Create" }}
    </v-btn>
  </v-row>
</template>
