<script setup lang="ts">
const { organizationCommentsFormState, isEditingOrganizationsComments } =
  useOrganizationsComments();

  useHead({
  title: "Single Comment",
  meta: [
    { name: "description", content: "View and engage with comments on various organizations. Share your thoughts and experiences." },

  ],
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="
          isEditingOrganizationsComments === true
            ? 'Reviewing organization\'s comment'
            : 'New organization\'s comment'
        "
      >
        <div class="pa-6">
          <FormsOrgCommentForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
