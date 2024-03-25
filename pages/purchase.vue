<script setup lang="ts">
definePageMeta({
  layout: "guest",
});

useHead({
  title: "Purchase product",
});

const {
  isEditingProducts,
  getSingleProduct,
  resetProductsFormState,
  productsFormState,
  deleteSingleProduct,
  getAllProducts,
} = useProducts();

const route = useRoute();

console.log('route', route)

const url = `/products/${route.query.product}`;

const singleProduct = ref<any>()

const response = await useApi<IGetAllProducts>(url, {
  method: "GET",
});

singleProduct.value = response?.data;
</script>

<template>
  <v-row style="padding: 0;">
    <v-col cols="6" md="6" xs="6" style="width: 100%; height: 100vw; background-color: bisque;">
    <h1>About the product</h1>

    <v-img style="width: 250px; height: 250px;" :src="singleProduct.image_url" />

      <p>
        Category: {{ singleProduct.category.name }}
      </p>


      <p>
        Name: {{ singleProduct.name }}
      </p>


      <p>
        Description: {{ singleProduct.description }}
      </p>
    </v-col>

    <v-col cols="6" md="6" xs="6">
      <h1>Buy this product</h1>
    </v-col>
  </v-row>
</template>

<style scoped>
</style>
