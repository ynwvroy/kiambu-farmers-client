<script setup lang="ts">
import { slugify } from "~~/utils/Slugify";

const { eventFormState } = useEvents();

// Watch for changes in the name and update the slug
watch(
  () => eventFormState.value.name,
  (newName) => {
    eventFormState.value.slug = slugify(newName);
  }
);
</script>

<template>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Name</v-label>
      <v-text-field
        v-model="eventFormState.name"
        variant="outlined"
        placeholder="Name of your event"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">About</v-label>
      <v-text-field
        v-model="eventFormState.about"
        variant="outlined"
        placeholder="What is the main theme of your event?"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Description</v-label>
      <v-textarea
        v-model="eventFormState.description"
        placeholder="Give a summary of your event. Where it will be, mention guest speakers..."
        rows="5"
        variant="outlined"
        hide-details
        color="primary"
      >
      </v-textarea>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1"
        >Upload your event banner image</v-label
      >
      <v-text-field
        v-model="eventFormState.banner_url"
        variant="outlined"
        placeholder="This will be the main image people see"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1"
        >Select a category for your event</v-label
      >
      <v-text-field
        v-model="eventFormState.event_category_id"
        variant="outlined"
        placeholder="An product category helps your event appear more in searches"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>

  <p class="text-center pt-5">
    The event will have this default link:
    <a
      style="text-decoration: underline"
      target="_blank"
      :href="`https://reservo.co.ke/events/${eventFormState.slug}`"
      >https://reservo.co.ke/events/{{ eventFormState.slug }}</a
    >
  </p>
</template>
