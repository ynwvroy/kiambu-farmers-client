<script setup lang="ts">
const { ProductCategoryFormState, isEditingProductCategory } = useProductCategories();
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="
          isEditingProductCategory === true ? 'Edit product category' : 'New product category'
        "
      >
        <div class="pa-6">
          <FormsProductCategoryForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
