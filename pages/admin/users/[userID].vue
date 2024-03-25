<script setup lang="ts">
const { userFormState, isEditingUser } = useUsers();
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard :title="isEditingUser === true ? 'Edit user' : 'New user'">
        <div class="pa-6">
          <FormsUserForm />
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
