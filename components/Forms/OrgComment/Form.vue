<script setup lang="ts">
const {
  isEditingOrganizationsComments,
  organizationCommentsFormState,
  updateSingleOrganizationComment,
  createOrganizationComment,
} = useOrganizationsComments();

const saveComment = async () => {
  if (isEditingOrganizationsComments.value) {
    await updateSingleOrganizationComment(
      organizationCommentsFormState.value.id
    );
  } else {
    await createOrganizationComment();
  }
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Name</v-label>
        <v-text-field
          v-model="organizationCommentsFormState.name"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Email</v-label>
        <v-text-field
          v-model="organizationCommentsFormState.email"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label class="font-weight-bold mb-1">Comment</v-label>
        <v-textarea
          v-model="organizationCommentsFormState.comment"
          variant="outlined"
          hide-details
          color="primary"
        ></v-textarea>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Was anonymous</v-label>
        <v-text-field
          variant="outlined"
          v-model="organizationCommentsFormState.is_anonymous"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Rating</v-label>
        <v-text-field
          v-model="organizationCommentsFormState.rating"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Organization reviewed</v-label>
        <v-text-field
          variant="outlined"
          v-model="organizationCommentsFormState.organization_id"
          hide-details
          color="primary"
        ></v-text-field>
        <p>{{ organizationCommentsFormState?.organization?.name }}</p>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveComment()">
        {{ isEditingOrganizationsComments ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
