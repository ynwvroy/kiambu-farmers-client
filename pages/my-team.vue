<script setup lang="ts">

useHead({
  title: "My Team",
  meta: [
    { name: "description", content: "Collaborate and manage your team members. Stay connected and work together seamlessly." },

  ],
});

</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard title="Manage your teams here">
        <div class="pa-7 pt-1">
          <BaseProductCards />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
