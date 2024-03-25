<script setup lang="ts">
const { ordersFormState, isEditingOrders } = useOrders();

useHead({
  title: "Single Order",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingOrders === true ? 'Reviewing order' : 'New order'"
      >
        <div class="pa-6">
          <FormsOrdersForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
