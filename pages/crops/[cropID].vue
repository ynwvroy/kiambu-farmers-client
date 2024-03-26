<script setup lang="ts">
const { isEditingCrops } = useCrops();

useHead({
  title: "Single crop",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingCrops === true ? 'Reviewing crop' : 'New crop'"
      >
        <div class="pa-6">
          <FormsCropsForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
