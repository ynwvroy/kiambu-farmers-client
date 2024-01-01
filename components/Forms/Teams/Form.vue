<script setup lang="ts">
import { slugify } from "~~/utils/Slugify";

const { isEditingTeams, teamsFormState, updateSingleTeam, createTeam } =
  useTeams();

const saveTeam = async () => {
  if (isEditingTeams.value) {
    await updateSingleTeam(teamsFormState.value.id);
  } else {
    await createTeam();
  }
};

// Watch for changes in the name and update the slug
watch(
  () => teamsFormState.value.name,
  (newName) => {
    teamsFormState.value.slug = slugify(newName);
  }
);
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Name</v-label>
        <v-text-field
          v-model="teamsFormState.name"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Description</v-label>
        <v-textarea
          v-model="teamsFormState.description"
          variant="outlined"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Organization</v-label>
        <v-text-field
          variant="outlined"
          v-model="teamsFormState.organization_id"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Event</v-label>
        <v-text-field
          v-model="teamsFormState.event_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveTeam()">
        {{ isEditingTeams ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
