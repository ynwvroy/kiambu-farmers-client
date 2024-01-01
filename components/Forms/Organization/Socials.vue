<script setup lang="ts">
const { organizationFormState } = useOrganization();
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Linkedin</v-label>
      <v-text-field
        v-model="organizationFormState.linkedin_url"
        variant="outlined"
        placeholder="LinkedIn URL"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Instagram</v-label>
      <v-text-field
        v-model="organizationFormState.instagram_url"
        variant="outlined"
        placeholder="Instagram URL"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Facebook</v-label>
      <v-text-field
        v-model="organizationFormState.facebook_url"
        variant="outlined"
        placeholder="Facebook URL"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Twitter</v-label>
      <v-text-field
        v-model="organizationFormState.twitter_url"
        variant="outlined"
        placeholder="Twitter URL"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
</template>
