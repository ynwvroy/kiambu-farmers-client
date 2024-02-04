<script setup lang="ts">
import { slugify } from "~~/utils/Slugify";

const {
  ProductCategoryFormState,
  isEditingProductCategory,
  updateSingleProductCategory,
  createProductCategory,
} = useProductCategories();

const saveCategory = async () => {
  if (isEditingProductCategory.value) {
    await updateSingleProductCategory(ProductCategoryFormState.value.id);
  } else {
    await createProductCategory();
  }
};

// Watch for changes in the name and update the slug
watch(
  () => ProductCategoryFormState.value.name,
  (newName) => {
    ProductCategoryFormState.value.slug = slugify(newName);
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
            v-model="ProductCategoryFormState.name"
            variant="outlined"
            placeholder="Name of the category"
            hide-details
            color="primary"
          ></v-text-field>
        </div>

        <div>
          <v-label class="font-weight-bold mb-1">Slug</v-label>
          <v-text-field
            v-model="ProductCategoryFormState.slug"
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
          v-model="ProductCategoryFormState.banner_url"
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
          v-model="ProductCategoryFormState.description"
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
        {{ isEditingProductCategory ? "Update" : "Create" }}
      </v-btn>
    </v-row>

    <p class="text-center">
      The category will have this default link:
      <a
        style="text-decoration: underline;"
        target="_blank"
        :href="`https://kiambu-farmers.com/product-categories/${ProductCategoryFormState.slug}`"
        >https://kiambu-farmers.com/product-categories/{{
          ProductCategoryFormState.slug
        }}</a
      >
    </p>
  </div>
</template>
