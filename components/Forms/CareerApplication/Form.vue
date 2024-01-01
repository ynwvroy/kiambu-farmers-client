<script setup lang="ts">
const {
  careerApplicationFormState,
  isEditingCareerApplication,
  updateSingleCareerApplication,
} = useCareerApplications();

const saveApplication = async () => {
  if (isEditingCareerApplication.value) {
    await updateSingleCareerApplication(careerApplicationFormState.value.id);
  }
};
</script>

<template>
  <h3 class="text-h3 pt-12 pb-3">Applicant Contact Details</h3>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Full name</v-label>
      <v-text-field
        v-model="careerApplicationFormState.full_name"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Email</v-label>
      <v-text-field
        v-model="careerApplicationFormState.email"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Phone number</v-label>
      <v-text-field
        v-model="careerApplicationFormState.phone_number"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>

  <h3 class="text-h3 pt-12 pb-3">Application requirements</h3>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Role applied</v-label>
      <v-text-field
        v-model="careerApplicationFormState.role_application"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">LinkedIn</v-label>
      <v-text-field
        v-model="careerApplicationFormState.linkedin_url"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Resume</v-label>
      <v-text-field
        v-model="careerApplicationFormState.resume_url"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>

  <h3 class="text-h3 pt-12 pb-3">Reviewer's Assessment</h3>
  <v-row>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Response</v-label>
      <v-text-field
        v-model="careerApplicationFormState.response_status"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
    <v-col cols="12" md="6" xs="12">
      <v-label class="font-weight-bold mb-1">Finish review</v-label>
      <v-text-field
        v-model="careerApplicationFormState.status"
        variant="outlined"
        hide-details
        color="primary"
      ></v-text-field>
    </v-col>
  </v-row>

  <v-row class="py-12 px-6" justify="end">
    <v-btn color="secondary" @click="saveApplication()">
      {{ isEditingCareerApplication ? "Update" : "Create" }}
    </v-btn>
  </v-row>
</template>
