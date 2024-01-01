<script setup lang="ts">
const { contactQueriesFormState, isEditingQuery } = useContactQueries();
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="
          isEditingQuery === true ? 'Edit contact query' : 'New contact query'
        "
      >
        <div class="pa-6">
          <FormsQueriesForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
