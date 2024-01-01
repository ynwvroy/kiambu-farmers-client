<script setup lang="ts">
const {
  mailListFormState,
  isEditingMailList,
  updateSingleMailList,
  createMailList,
} = useMailList();

const saveEmail = async () => {
  if (isEditingMailList.value) {
    await updateSingleMailList(mailListFormState.value.id);
  } else {
    await createMailList();
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Type of email to receive</v-label>
      <v-text-field
        v-model="mailListFormState.type"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Email</v-label>
      <v-text-field
        v-model="mailListFormState.email"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>

  <v-row class="py-12 px-6" justify="end">
    <v-btn color="secondary" @click="saveEmail()">
      {{ isEditingMailList ? "Update" : "Create" }}
    </v-btn>
  </v-row>
</template>
