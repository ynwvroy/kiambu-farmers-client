<script setup lang="ts">
const { isEditingLivestock } = useLivestock();

useHead({
  title: "Single Order",
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingLivestock === true ? 'Reviewing livestock' : 'New livestock'"
      >
        <div class="pa-6">
          <FormsLivestockForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
