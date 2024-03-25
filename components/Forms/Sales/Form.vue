<script setup lang="ts">
const userType = useCookie("user_type");

const { isEditingSales, salesFormState, updateSingleSale, createSale } =
  useSales();

const saveProduct = async () => {
  if (isEditingSales.value) {
    await updateSingleSale(salesFormState.value.id);
  } else {
    await createSale();
  }
};

const paymentStatus = [
  {
    title: "Paid",
    value: "paid",
  },
  {
    title: "Pending",
    value: "pending",
  },
];

const paymentMethods = [
  {
    title: 'Cash deposit',
    value: 'deposit'
  },
  {
    title: 'Bank transfer',
    value: 'bank_transfer'
  }
  ,
  {
    title: 'Mobile money',
    value: 'mobile_money'
  }
]

const allFarmers = ref<any>();

const farmersResponse = await useApi<IGetAllUsers>("/user/all/farmers", {
  method: "GET",
});

allFarmers.value = farmersResponse?.data;

const formattedFarmers = ref<any>([]);
for (let i = 0; i < allFarmers.value.length; i++) {
  const farmer = allFarmers.value[i];
  formattedFarmers.value.push({
    title: farmer.full_name,
    value: farmer.id,
  });
}

const allProducts = ref<any>();

const productsResponse = await useApi<IGetAllProducts>("/products", {
  method: "GET",
});
allProducts.value = productsResponse?.data;

const formattedProducts = ref<any>([]);
for (let i = 0; i < allProducts.value.length; i++) {
  const farmer = allProducts.value[i];
  formattedProducts.value.push({
    title: farmer.name,
    value: farmer.id,
  });
}
</script>

<template>
  <div>
    {{ salesFormState }} salesFormState

    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Seller</v-label>
        <v-select
        v-model="salesFormState.farmer_id"
          outlined
          hide-details
          color="primary"
          :items="formattedFarmers"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Transaction ID</v-label>
        <v-text-field
          v-model="salesFormState.payment_transaction_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Payment Method</v-label>
        <v-select
          v-model="salesFormState.payment_method"
          outlined
          hide-details
          color="primary"
          :items="paymentMethods"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Product</v-label>
        <!-- <v-text-field
          v-model="salesFormState.product_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field> -->
        <v-select
        v-model="salesFormState.product_id"
          outlined
          hide-details
          color="primary"
          :items="formattedProducts"
        >
        </v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Total Amount</v-label>
        <v-text-field
          variant="outlined"
          v-model="salesFormState.total_amount"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Units Sold</v-label>
        <v-text-field
          v-model="salesFormState.units_sold"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Payment Status</v-label>
        <v-select
          v-model="salesFormState.payment_status"
          outlined
          hide-details
          color="primary"
          :items="paymentStatus"
        >
        </v-select>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Payment Date</v-label>
        <v-text-field
          variant="outlined"
          v-model="salesFormState.payment_received_date"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveProduct()">
        {{ isEditingSales ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
