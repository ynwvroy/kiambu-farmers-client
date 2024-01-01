<script setup lang="ts">
useHead({
  title: "My Events",
  meta: [
    {
      name: "description",
      content:
        "View and manage the events you have organized. Stay organized and keep track of your events.",
    },
  ],
});
</script>
<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard title="Here are the all events you hosted!">
        <div class="pa-7 pt-1">
          <BaseProductCards />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
