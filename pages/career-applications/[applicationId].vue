<script setup lang="ts">
const { careerApplicationFormState, isEditingCareerApplication } =
  useCareerApplications();
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="
          isEditingCareerApplication === true
            ? 'Edit career application'
            : 'New career application'
        "
      >
        <div class="pa-6">
          <FormsCareerApplicationForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
