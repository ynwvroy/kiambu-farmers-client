<script setup lang="ts">
useHead({
  title: "Profile",
  meta: [
    { name: "description", content: "View and manage your user profile. Customize your settings and personal information." },

  ],
});
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard key="Profile Page">
        <div class="pa-7 pt-1">
          <p class="text-body-1">This is the profile page</p>
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
