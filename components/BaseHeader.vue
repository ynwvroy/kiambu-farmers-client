<script setup lang="ts">
withDefaults(
  defineProps<{
    title?: string;
    pageCrumbTitle?: string;
    pageName?: string;
    hasActionButton?: boolean;
    buttonName?: string;
    buttonRouteTo?: string;
  }>(),
  {
    title: "",
    pageCrumbTitle: "",
    pageName: "",
    hasActionButton: false,
    buttonName: "",
    buttonRouteTo: "",
  }
);
</script>

<template>
  <div class="pb-6" style="padding-top: 30px">
    <div
      class="d-flex justify-space-between align-center px-3 py-1 bg-borderColor"
    >
      <h1 class="text-h3 py-4">
        <span class="text-primary" style="color: blue"
          ><NuxtLink
            style="text-decoration: none !important; color: blue"
            to="/"
            >Dashboard /
          </NuxtLink> </span
        >{{ title }}
      </h1>
      <v-btn v-if="hasActionButton" color="info" :to="buttonRouteTo">
        <div class="d-flex align-center gap-2">
          <PlusSquareOutlined :size="24" />
          {{ buttonName }}
        </div>
      </v-btn>
    </div>
  </div>
</template>

<style scoped></style>
