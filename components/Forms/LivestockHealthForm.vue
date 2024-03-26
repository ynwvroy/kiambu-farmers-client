<script setup lang="ts">
const {
  createLivestockHealth,
  isEditingLivestockHealth,
  updateLivestockHealth,
  livestockHealthFormState,
} = useLivestockHealth();

const useTypes = [
  {
    title: "Farmer",
    value: "farmer",
  },
  {
    title: "User",
    value: "user",
  },
];

const saveLivestock = async () => {
  if (isEditingLivestockHealth.value) {
    await updateLivestockHealth(livestockHealthFormState.value.id);
  } else {
    await createLivestockHealth();
  }
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Date recorded</v-label>
        <v-text-field
          type="date"
          variant="outlined"
          v-model="livestockHealthFormState.date_recorded"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Description</v-label>
        <v-text-field
          v-model="livestockHealthFormState.description"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Livestock</v-label>
        <v-text-field
          v-model="livestockHealthFormState.livestock_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Treatment</v-label>
        <v-text-field
          v-model="livestockHealthFormState.treatment"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Vaccination</v-label>
        <v-text-field
          variant="outlined"
          v-model="livestockHealthFormState.vaccination"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Medication</v-label>
        <v-text-field
          v-model="livestockHealthFormState.medication"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Comments</v-label>
        <v-text-field
          variant="outlined"
          v-model="livestockHealthFormState.comments"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveLivestock()">
        {{ isEditingLivestockHealth ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
