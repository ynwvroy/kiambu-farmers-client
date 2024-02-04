<script setup lang="ts">
const { isEditingOrders, ordersFormState, updateSingleOrder, createOrder } =
  useOrders();

const saveOrder = async () => {
  if (isEditingOrders.value) {
    await updateSingleOrder(ordersFormState.value.id);
  } else {
    await createOrder();
  }
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Buyer</v-label>
        <v-text-field
          v-model="ordersFormState.buyer_id"
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
          v-model="ordersFormState.seller_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Product name</v-label>
        <v-text-field
          v-model="ordersFormState.product_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Quantity</v-label>
        <v-text-field
          v-model="ordersFormState.quantity"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Total Price</v-label>
        <v-text-field
          v-model="ordersFormState.total_price"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Status</v-label>
        <v-text-field
          v-model="ordersFormState.status"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Payment Method</v-label>
        <v-text-field
          v-model="ordersFormState.payment_method"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Transaction ID</v-label>
        <v-text-field
          v-model="ordersFormState.payment_transaction_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Delivery address</v-label>
        <v-text-field
          v-model="ordersFormState.delivery_address"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Tracking number</v-label>
        <v-text-field
          v-model="ordersFormState.tracking_number"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-label class="font-weight-bold mb-1">Comments</v-label>
        <v-textarea
          v-model="ordersFormState.comments"
          variant="outlined"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
    </v-row>


    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveOrder()">
        {{ isEditingOrders ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
