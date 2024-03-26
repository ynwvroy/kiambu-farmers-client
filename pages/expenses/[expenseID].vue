<script setup lang="ts">
const { isEditingExpense } = useExpenses();

useHead({
  title: "Single Expense",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingExpense === true ? 'Reviewing expense' : 'New expense'"
      >
        <div class="pa-6">
          <FormsExpenseForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
