<script setup lang="ts">
const { isEditingIncome } = useIncomes();

useHead({
  title: "Single Order",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingIncome === true ? 'Reviewing income' : 'New income'"
      >
        <div class="pa-6">
          <FormsIncomeForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
