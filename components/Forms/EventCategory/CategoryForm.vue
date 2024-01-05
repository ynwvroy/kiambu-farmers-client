<script setup lang="ts">
import { slugify } from "~~/utils/Slugify";

const {
  eventCategoryFormState,
  isEditingEventCategory,
  updateSingleEventCategory,
  createEventCategory,
} = useEventCategories();

const saveCategory = async () => {
  if (isEditingEventCategory.value) {
    await updateSingleEventCategory(eventCategoryFormState.value.id);
  } else {
    await createEventCategory();
  }
};

// Watch for changes in the name and update the slug
watch(
  () => eventCategoryFormState.value.name,
  (newName) => {
    eventCategoryFormState.value.slug = slugify(newName);
  }
);
</script>

<template>
  <div>
    <h3 class="text-h3 py-4">About the category</h3>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <div class="pb-4">
          <v-label class="font-weight-bold mb-1">Name</v-label>
          <v-text-field
            v-model="eventCategoryFormState.name"
            variant="outlined"
            placeholder="Name of the category"
            hide-details
            color="primary"
          ></v-text-field>
        </div>

        <div>
          <v-label class="font-weight-bold mb-1">Slug</v-label>
          <v-text-field
            v-model="eventCategoryFormState.slug"
            variant="outlined"
            readonly
            hide-details
            color="primary"
          ></v-text-field>
        </div>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Banner</v-label>
        <v-textarea
          v-model="eventCategoryFormState.banner_url"
          placeholder="Give a banner image for this category."
          rows="5"
          variant="outlined"
          hide-details
          color="primary"
        >
        </v-textarea>
      </v-col>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Description</v-label>
        <v-textarea
          v-model="eventCategoryFormState.description"
          placeholder="Give a summary of your what qualifies for this category"
          rows="5"
          variant="outlined"
          hide-details
          color="primary"
        >
        </v-textarea>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveCategory()">
        {{ isEditingEventCategory ? "Update" : "Create" }}
      </v-btn>
    </v-row>

    <p class="text-center">
      The category will have this default link:
      <a
        style="text-decoration: underline;"
        target="_blank"
        :href="`https://kiambu-farmers.com/event-categories/${eventCategoryFormState.slug}`"
        >https://kiambu-farmers.com/event-categories/{{
          eventCategoryFormState.slug
        }}</a
      >
    </p>
  </div>
</template>
