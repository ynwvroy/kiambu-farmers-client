<script setup lang="ts">
import { RouterView } from "vue-router";
const title = ref("Eveenti");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk}` : "Eveenti";
  },
});
</script>

<template>
  <v-locale-provider>
    <v-app>
      <NavigationMain />
      <v-main>
        <v-container fluid class="page-wrapper">
          <div class="maxWidth">
            <RouterView />
          </div>
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>
