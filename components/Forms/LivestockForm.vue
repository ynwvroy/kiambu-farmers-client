<script setup lang="ts">
const {
  createLivestock,
  isEditingLivestock,
  updateSingleLivestock,
  livestockFormState,
} = useLivestock();

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
  if (isEditingLivestock.value) {
    await updateSingleLivestock(livestockFormState.value.id);
  } else {
    await createLivestock();
  }
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Name</v-label>
        <v-text-field
          v-model="livestockFormState.name"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Type</v-label>
        <v-text-field
          v-model="livestockFormState.type"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Breed</v-label>
        <v-text-field
          v-model="livestockFormState.breed"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Sex</v-label>
        <v-text-field
          v-model="livestockFormState.sex"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Color</v-label>
        <v-text-field
          variant="outlined"
          v-model="livestockFormState.color"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Status</v-label>
        <v-text-field
          v-model="livestockFormState.status"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Date of birth</v-label>
        <v-text-field
        type="date"
          variant="outlined"
          v-model="livestockFormState.date_of_birth"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveLivestock()">
        {{ isEditingLivestock ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
