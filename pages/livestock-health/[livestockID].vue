<script setup lang="ts">
const { isEditingLivestockHealth } = useLivestockHealth();

useHead({
  title: "Single Livestock Health",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingLivestockHealth === true ? 'Reviewing livestock health' : 'New livestock health'"
      >
        <div class="pa-6">
          <FormsLivestockHealthForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
