<script setup lang="ts">
const {
  contactQueriesFormState,
  isEditingQuery,
  updateSingleContactQueries,
  createContactQueries,
} = useContactQueries();

const saveQuery = async () => {
  if (isEditingQuery.value) {
    await updateSingleContactQueries(contactQueriesFormState.value.id);
  } else {
    await createContactQueries();
  }
};
</script>

<template>
  <h3 class="text-h3 pt-12 pb-3">About the person</h3>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Full name</v-label>
      <v-text-field
        v-model="contactQueriesFormState.name"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Email</v-label>
      <v-text-field
        v-model="contactQueriesFormState.email"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>

  <h3 class="text-h3 pt-12 pb-3">Query / Comment</h3>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Topic</v-label>
      <v-text-field
        v-model="contactQueriesFormState.topic"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-label class="font-weight-bold mb-1">Comment</v-label>
      <v-textarea
        v-model="contactQueriesFormState.description"
        variant="outlined"
        hide-details
        color="primary"
      ></v-textarea>
    </v-col>
  </v-row>

  <h3 class="text-h3 pt-12 pb-3">Reviewer's Assessment</h3>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Finish review</v-label>
      <v-checkbox
        v-model="contactQueriesFormState.is_resolved"
        label="Mark as reviewed"
        variant="outlined"
        hide-details
        color="primary"
      ></v-checkbox>
    </v-col>
  </v-row>

  <v-row class="py-12 px-6" justify="end">
    <v-btn color="secondary" @click="saveQuery()">
      {{ isEditingQuery ? "Update" : "Create" }}
    </v-btn>
  </v-row>
</template>
