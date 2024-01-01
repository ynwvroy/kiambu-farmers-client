<script setup lang="ts">
const { eventCategoryFormState, isEditingEventCategory } = useEventCategories();
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="
          isEditingEventCategory === true ? 'Edit event category' : 'New event category'
        "
      >
        <div class="pa-6">
          <FormsEventCategoryForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
