<script setup lang="ts">
const userType = useCookie("user_type");

const userId = useCookie<string | undefined>("user_id");

const userFullName = useCookie<string | undefined>("full_name");

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


const productCategories = ref<any>();

const allFarmers = ref<any>();

const farmersResponse = await useApi<IGetAllUsers>("/user/all/farmers", {
  method: "GET",
});

allFarmers.value = farmersResponse?.data;

const productCategoriesResponse = await useApi<IGetAllProductCategories>(
  "/product-categories",
  {
    method: "GET",
  }
);

productCategories.value = productCategoriesResponse?.data;

const formattedProductCategories = ref<any>([]);
for (let i = 0; i < productCategories.value.length; i++) {
  const category = productCategories.value[i];
  formattedProductCategories.value.push({
    title: category.name,
    value: category.id,
  });
}

const formattedFarmers = ref<any>([]);
for (let i = 0; i < allFarmers.value.length; i++) {
  const farmer = allFarmers.value[i];
  formattedFarmers.value.push({
    title: farmer.full_name,
    value: farmer.id,
  });
}

if (userType.value === 'farmer') {
  // Clear the array and add the single farmer object
  formattedFarmers.value = [{
    title: userFullName.value,
    value: userId.value,
  }];
} else {
  // If userType is not 'farmer', populate the array with all farmers
  formattedFarmers.value = allFarmers.value.map((farmer: any) => ({
    title: farmer.full_name,
    value: farmer.id,
  }));
}

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
        <v-autocomplete
          v-model="productsFormState.category_id"
          outlined
          hide-details
          color="primary"
          :items="formattedProductCategories"
        >
        </v-autocomplete>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Price</v-label>
        <v-text-field
        type="number"
          variant="outlined"
          v-model="productsFormState.price"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Seller</v-label>
        <v-select
          v-model="productsFormState.seller_id"
          outlined
          hide-details
          color="primary"
          :items="formattedFarmers"
        >
        </v-select>
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
