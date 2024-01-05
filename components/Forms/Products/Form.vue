<script setup lang="ts">
const {
  isEditingProducts,
  productsFormState,
  updateSingleProduct,
  createProduct,
} = useProducts();

const saveProduct = async () => {
  if (isEditingProducts.value) {
    await updateSingleProduct(productsFormState.value.id);
  } else {
    await createProduct();
  }
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Name</v-label>
        <v-text-field
          v-model="productsFormState.name"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Quantity in stock</v-label>
        <v-text-field
          v-model="productsFormState.stock_quantity"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Description</v-label>
        <v-textarea
          v-model="productsFormState.description"
          variant="outlined"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Product Category</v-label>
        <v-text-field
          v-model="productsFormState.category_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Price</v-label>
        <v-text-field
          variant="outlined"
          v-model="productsFormState.price"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Image URL</v-label>
        <v-text-field
          v-model="productsFormState.image_url"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Seller</v-label>
        <v-text-field
          variant="outlined"
          v-model="productsFormState.seller_id"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Units sold</v-label>
        <v-text-field
          variant="outlined"
          v-model="productsFormState.units_sold"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveProduct()">
        {{ isEditingProducts ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
