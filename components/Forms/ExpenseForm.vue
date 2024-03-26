<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Amount</v-label>
        <v-text-field
          v-model="expenseFormState.amount"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Description</v-label>
        <v-text-field
          v-model="expenseFormState.description"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="12" xs="12">
        <v-label class="font-weight-bold mb-1">Comments</v-label>
        <v-textarea
          variant="outlined"
          v-model="expenseFormState.comments"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveExpense()">
        {{ isEditingExpense ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>

<script setup lang="ts">
const { createExpense, isEditingExpense, updateSingleExpense, expenseFormState } = useExpenses()

const saveExpense = async () => {
  if (isEditingExpense.value) {
    await updateSingleExpense(expenseFormState.value.id)
  } else {
    await createExpense()
  }
}
</script>
