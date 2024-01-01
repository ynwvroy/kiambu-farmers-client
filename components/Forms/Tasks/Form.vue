<script setup lang="ts">
import { slugify } from "~~/utils/Slugify";

const { isEditingTasks, tasksFormState, updateSingleTask, createTask } =
  useTasks();

const saveTask = async () => {
  if (isEditingTasks.value) {
    await updateSingleTask(tasksFormState.value.id);
  } else {
    await createTask();
  }
};

// Watch for changes in the name and update the slug
watch(
  () => tasksFormState.value.name,
  (newName) => {
    tasksFormState.value.slug = slugify(newName);
  }
);
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Name</v-label>
        <v-text-field
          v-model="tasksFormState.name"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Priority</v-label>
        <v-text-field
          v-model="tasksFormState.priority"
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
          v-model="tasksFormState.description"
          variant="outlined"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Label</v-label>
        <v-text-field
          variant="outlined"
          v-model="tasksFormState.label"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Status</v-label>
        <v-text-field
          v-model="tasksFormState.status"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Team</v-label>
        <v-text-field
          variant="outlined"
          v-model="tasksFormState.team_id"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Assignee</v-label>
        <v-text-field
          v-model="tasksFormState.assignee_id"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Creator</v-label>
        <v-text-field
          variant="outlined"
          v-model="tasksFormState.created_by"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <!-- <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Creator</v-label>
        <v-text-field
          v-model="tasksFormState.created_by"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col> -->
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Comments</v-label>
        <v-textarea
          v-model="tasksFormState.comments"
          variant="outlined"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveTask()">
        {{ isEditingTasks ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
