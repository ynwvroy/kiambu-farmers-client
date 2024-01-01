<script setup lang="ts">
const { organizationFormState } = useOrganization();
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Contact email</v-label>
      <v-text-field
        v-model="organizationFormState.contact_email"
        variant="outlined"
        placeholder="Email for inquiries"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Contact phone number</v-label>
      <v-text-field
        v-model="organizationFormState.contact_phone_number"
        variant="outlined"
        placeholder="Phone number for inquiries"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Office location</v-label>
      <v-text-field
        v-model="organizationFormState.location"
        variant="outlined"
        placeholder="Where are you located?"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
