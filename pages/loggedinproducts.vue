<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

const products = ref<IProductsFormState>();

const response = await useApi<IGetAllProducts>("/products", {
  method: "GET",
});

products.value = response?.data;
</script>

<template>
  <v-row>
    <v-col
      v-for="product in products"
      :key="product.id"
      cols="12"
      md="6"
      lg="4"
    >
      <BaseProductCards :product="product"> </BaseProductCards>
    </v-col>
  </v-row>
</template>
