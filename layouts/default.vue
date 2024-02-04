<script setup lang="ts">
import { RouterView } from "vue-router";

const title = ref("Kiambu Farmers");

useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : "Kiambu Farmers";
  },
});
</script>

<template>
  <v-app>
    <NavigationMain />
    <v-main>
      <div style="margin: 0 16px">
        <RouterView />
      </div>
    </v-main>
  </v-app>
</template>
