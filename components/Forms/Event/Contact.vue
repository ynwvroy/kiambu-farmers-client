<script setup lang="ts">
const { eventFormState } = useEvents();
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Contact email</v-label>
      <v-text-field
        v-model="eventFormState.organizer_email"
        variant="outlined"
        placeholder="Email for inquiries"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Contact phone number</v-label>
      <v-text-field
        v-model="eventFormState.organizer_phone"
        variant="outlined"
        placeholder="Phone number for inquiries"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
