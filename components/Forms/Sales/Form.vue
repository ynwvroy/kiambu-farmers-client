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
]
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Seller</v-label>
        <v-text-field
          v-model="salesFormState.farmer_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
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
        <v-text-field
          v-model="salesFormState.product_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
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
