<script setup lang="ts">
const { tasksFormState, isEditingTasks } = useTasks();

useHead({
  title: "Single Task",
  meta: [
    {
      name: "description",
      content:
        "View and engage with comments on various organizations. Share your thoughts and experiences.",
    },
  ],
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingTasks === true ? 'Reviewing task' : 'New task'"
      >
        <div class="pa-6">
          <FormsTasksForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
