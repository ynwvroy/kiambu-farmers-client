<script setup lang="ts">
useHead({
  title: "Single Organization",
});

const {
  isEditingOrganization,
  organizationFormState,
  updateSingleOrganization,
  createOrganization,
} = useOrganization();

const saveOrganization = async () => {
  if (isEditingOrganization.value) {
    await updateSingleOrganization(organizationFormState.value.id);
  } else {
    await createOrganization();
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard title="Let's create your new organization">
        <div class="pa-6">
          <div class="pb-4">
            <BaseCollapsibleCard title="About your organization">
              <div class="pa-6">
                <FormsOrganizationAbout />
              </div>
            </BaseCollapsibleCard>
          </div>

          <div class="pb-4">
            <BaseCollapsibleCard title="Contact information">
              <div class="pa-6">
                <FormsOrganizationContact />
              </div>
            </BaseCollapsibleCard>
          </div>

          <div class="pb-4">
            <BaseCollapsibleCard title="Social media links">
              <div class="pa-6">
                <FormsOrganizationSocials />
              </div>
            </BaseCollapsibleCard>
          </div>

          <v-row class="py-12 px-6" justify="end">
            <v-btn color="secondary" @click="saveOrganization()">
              {{ isEditingOrganization ? "Update" : "Create" }}
            </v-btn>
          </v-row>
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
