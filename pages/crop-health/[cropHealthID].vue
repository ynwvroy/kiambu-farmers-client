<script setup lang="ts">
const { isEditingCropHealth } = useCropHealth();

useHead({
  title: "Single Crop Health",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      {{ isEditingCropHealth }}
      <BaseCard
        :title="isEditingCropHealth === true ? 'Reviewing crop health' : 'New crop health'"
      >
        <div class="pa-6">
          <FormsCropHealthForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
