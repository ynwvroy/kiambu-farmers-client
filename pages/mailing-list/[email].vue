<script setup lang="ts">
const { isEditingMailList } = useMailList();
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard
        :title="isEditingMailList === true ? 'Edit mail list' : 'New email'"
      >
        <div class="pa-6">
          <FormsMailingListForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
