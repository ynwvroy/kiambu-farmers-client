<script setup lang="ts">
useHead({
  title: "Create New Promo Code",
  meta: [
    { name: "description", content: "Create and manage new promotional codes. Attract users with special discounts and offers." },

  ],
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard title="New event">
        <div class="pa-6">
          <FormsEventAboutEvent />

          <FormsEventContact />

          <FormsEventDate />

          <FormsEventLocation />

          <FormsEventPricing />

          <FormsEventTickets />

          <FormsEventPromoCodes />

          <FormsEventAdditionalInfo />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
