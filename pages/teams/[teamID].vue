<script setup lang="ts">
const { teamsFormState, isEditingTeams } = useTeams();

useHead({
  title: "Single Team",
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
        :title="isEditingTeams === true ? 'Reviewing team' : 'New team'"
      >
        <div class="pa-6">
          <FormsTeamsForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
