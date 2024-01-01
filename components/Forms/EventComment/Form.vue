<script setup lang="ts">
const {
  isEditingEventsComments,
  eventsCommentsFormState,
  updateSingleEventsComment,
  createEventsComment,
} = useEventsComments();

const saveComment = async () => {
  if (isEditingEventsComments.value) {
    await updateSingleEventsComment(eventsCommentsFormState.value.id);
  } else {
    await createEventsComment();
  }
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Name</v-label>
        <v-text-field
          v-model="eventsCommentsFormState.name"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Email</v-label>
        <v-text-field
          v-model="eventsCommentsFormState.email"
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
          v-model="eventsCommentsFormState.comment"
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
          v-model="eventsCommentsFormState.is_anonymous"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Rating</v-label>
        <v-text-field
          v-model="eventsCommentsFormState.rating"
          variant="outlined"
          hide-details
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Event reviewed</v-label>
        <v-text-field
          variant="outlined"
          v-model="eventsCommentsFormState.event_id"
          hide-details
          color="primary"
        ></v-text-field>
        <p>{{ eventsCommentsFormState?.event?.name }}</p>
      </v-col>
    </v-row>

    <v-row class="py-12 px-6" justify="end">
      <v-btn color="secondary" @click="saveComment()">
        {{ isEditingEventsComments ? "Update" : "Create" }}
      </v-btn>
    </v-row>
  </div>
</template>
