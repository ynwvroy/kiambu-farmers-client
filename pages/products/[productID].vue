<script setup lang="ts">
const { productsFormState, isEditingProducts } = useProducts();

useHead({
  title: "Single Product",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingProducts === true ? 'Reviewing product' : 'New product'"
      >
        <div class="pa-6">
          <FormsProductsForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
