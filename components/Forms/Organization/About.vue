<script setup lang="ts">
import { slugify } from "~~/utils/Slugify";

const { organizationFormState } = useOrganization();

// Watch for changes in the name and update the slug
watch(
  () => organizationFormState.value.name,
  (newName) => {
    organizationFormState.value.slug = slugify(newName);
  }
);
</script>

<template>
  <v-row>
    <v-col>
      <v-row>
        <v-col cols="12">
          <div class="pb-4">
            <v-label class="font-weight-bold mb-1">Name</v-label>
            <v-text-field
              v-model="organizationFormState.name"
              variant="outlined"
              placeholder="Name of the organization"
              hide-details
              color="primary"
            ></v-text-field>
          </div>

          <div>
            <v-label class="font-weight-bold mb-1">Slug</v-label>
            <v-text-field
              v-model="organizationFormState.slug"
              variant="outlined"
              readonly
              hide-details
              color="primary"
            ></v-text-field>
          </div>
        </v-col>
        <v-col cols="12">
          <v-label class="font-weight-bold mb-1">Owner</v-label>
          <v-text-field
            v-model="organizationFormState.admin_id"
            variant="outlined"
            hide-details
            color="primary"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-col>

    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1"
        >Upload your event banner image</v-label
      >
      <v-textarea
        v-model="organizationFormState.profile_url"
        placeholder="Give a summary of your organization"
        rows="5"
        variant="outlined"
        hide-details
        color="primary"
      ></v-textarea>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Description</v-label>
      <v-textarea
        v-model="organizationFormState.description"
        placeholder="Give a summary of your organization"
        rows="5"
        variant="outlined"
        hide-details
        color="primary"
      >
      </v-textarea>
    </v-col>
  </v-row>

  <p class="text-center py-8">
    The organization will have this default link:
    <a
      style="text-decoration: underline"
      target="_blank"
      :href="`https://eveenti.com/organizations/${organizationFormState.slug}`"
      >https://eveenti.com/organizations/{{ organizationFormState.slug }}</a
    >
  </p>
</template>
