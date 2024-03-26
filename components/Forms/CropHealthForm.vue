<script setup lang="ts">
const {
  createCropHealth,
  isEditingCropHealth,
  updateCropHealth,
  cropHealthFormState,
} = useCropHealth();

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

const saveCrop = async () => {
  if (isEditingCropHealth.value) {
    await updateCropHealth(cropHealthFormState.value.id);
  } else {
    await createCropHealth();
  }
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Input type</v-label>
        <v-text-field
          v-model="cropHealthFormState.input_type"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Application method</v-label>
        <v-text-field
          v-model="cropHealthFormState.application_method"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Quantity applied</v-label>
        <v-text-field
          v-model="cropHealthFormState.quantity_applied"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Date</v-label>
        <v-text-field
          type="date"
          v-model="cropHealthFormState.date_recorded"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Cost</v-label>
        <v-text-field
          variant="outlined"
          v-model="cropHealthFormState.cost"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Crop ID</v-label>
        <v-text-field
          v-model="cropHealthFormState.crop_id"
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
          v-model="cropHealthFormState.comments"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveCrop()">
        {{ isEditingCropHealth ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
