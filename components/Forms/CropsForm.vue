<script setup lang="ts">
const { createCrop, isEditingCrops, updateSingleCrop, cropsFormState } =
  useCrops();

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
  if (isEditingCrops.value) {
    await updateSingleCrop(cropsFormState.value.id);
  } else {
    await createCrop();
  }
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Name</v-label>
        <v-text-field
          v-model="cropsFormState.name"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Variety</v-label>
        <v-text-field
          v-model="cropsFormState.variety"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Date planted</v-label>
        <v-text-field
        type="date"
          v-model="cropsFormState.planted_date"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Date harvested</v-label>
        <v-text-field
        type="date"
          v-model="cropsFormState.harvest_date"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Profit range</v-label>
        <v-text-field
          variant="outlined"
          v-model="cropsFormState.amount_profit"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Yield</v-label>
        <v-text-field
          v-model="cropsFormState.actual_yield"
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
          v-model="cropsFormState.comments"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveCrop()">
        {{ isEditingCrops ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
