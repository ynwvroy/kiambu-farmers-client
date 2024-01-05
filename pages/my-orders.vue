<script setup lang="ts">
useHead({
  title: "My orders",
  meta: [
    {
      name: "description",
      content:
        "View and manage the orders you have organized. Stay organized and keep track of your orders.",
    },
  ],
});
</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard title="Here are the all orders you hosted!">
        <div class="pa-7 pt-1">
          <BaseProductCards />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
