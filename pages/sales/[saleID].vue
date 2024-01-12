<script setup lang="ts">
const { salesFormState, isEditingSales } = useSales();

useHead({
  title: "Single Sale",
  meta: [
    {
      name: "description",
      content:
        "View and engage with comments on various organizations. Share your thoughts and experiences.",
    },
  ],
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingSales === true ? 'Reviewing sale' : 'New sale'"
      >
        <div class="pa-6">
          <FormsSalesForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
