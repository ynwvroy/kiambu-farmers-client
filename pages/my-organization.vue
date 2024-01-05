<script setup lang="ts">
useHead({
  title: "My Organization",
  meta: [
    {
      name: "description",
      content:
        "Manage and customize your organization's details. Stay in control of your organization's presence.",
    },
  ],
});

const { getSingleOrganization, organizationFormState } = useOrganization();

const userFullName = useCookie<string | undefined>("full_name");
const userOrganizationId = useCookie<string | number | undefined>(
  "organization_id"
);

if (userOrganizationId.value && userOrganizationId.value !== null) {
  const response = getSingleOrganization(userOrganizationId.value);
  console.log('response on my-organization', response)
}
</script>

<template>
  <div v-if="!userHasOrganization">
    <h2 class="text-h4 py-5 text-center">
      Hey {{ userFullName }}! It looks like you haven't created an organization
      yet.
      <br />
      Don't worry, we're here to help!
    </h2>

    <v-row align="center" justify="center" class="d-flex text-center pa-4">
      <v-col cols="12">
        <v-btn color="primary" to="/organizations/new-organization">
          Create Your Organization
        </v-btn>
      </v-col>
    </v-row>

    <p class="text-center py-4 text-h4">Why create an organization?</p>

    <v-row class="pt-12">
      <v-col cols="12" md="4" xs="12">
        <BaseCard rounded="xl" title="Events" class="bg-error" elevation="12">
          <p class="pa-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
            corrupti neque praesentium.
          </p>
        </BaseCard>
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <BaseCard rounded="xl" title="Discovery" elevation="12">
          <p class="pa-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
            corrupti neque praesentium.
          </p>
        </BaseCard>
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <BaseCard rounded="xl" title="Teams" elevation="12">
          <p class="pa-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
            corrupti neque praesentium.
          </p>
        </BaseCard>
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <BaseCard rounded="xl" title="Products" elevation="12">
          <p class="pa-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
            corrupti neque praesentium.
          </p>
        </BaseCard>
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <BaseCard rounded="xl" title="Inventory" elevation="12">
          <p class="pa-4">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sed
            corrupti neque praesentium.
          </p>
        </BaseCard>
      </v-col>
    </v-row>
  </div>

  <div v-else>
    <p>Here is stuff about your organization</p>

    {{ organizationFormState }}
  </div>
</template>
