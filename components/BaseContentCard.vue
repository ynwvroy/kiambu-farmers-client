<script setup lang="ts">
const props = defineProps({
  title: String,
});
</script>

<template>
  <v-card elevation="6" rounded="xl">
    <v-card-item >
      <v-card-title> {{ title }} </v-card-title>
      <v-card-text>
        <slot />
      </v-card-text>
    </v-card-item>
  </v-card>
</template>
