<script setup lang="ts">
const { eventsCommentsFormState, isEditingEventsComments } =
  useEventsComments();
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="
          isEditingEventsComments === true
            ? 'Reviewing event\'s comment'
            : 'New event\'s comment'
        "
      >
        <div class="pa-6">
          <FormsEventCommentForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
