<script setup lang="ts">
useHead({
  title: "Create New Organization",
  meta: [
    {
      name: "description",
      content:
        "Create and set up a new organization. Share your organization's details and mission.",
    },
  ],
});

const {
  isEditingOrganization,
  createOrganization,
} = useOrganization();

const saveOrganization = async () => {
    await createOrganization();
    // update user function here
    // autologin to refresh
    // refresh items
    // notifcation to show change
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <div class="pa-6">
        <h3 class="pb-8">Let's create your new organization</h3>

        <div class="pb-4">
          <BaseCollapsibleCard title="About your organization">
            <div class="px-8 pb-7">
              <FormsOrganizationAbout />
            </div>
          </BaseCollapsibleCard>
        </div>

        <div class="pb-4">
          <BaseCollapsibleCard title="Contact information">
            <div class="px-8 pb-7">
              <FormsOrganizationContact />
            </div>
          </BaseCollapsibleCard>
        </div>

        <div class="pb-4">
          <BaseCollapsibleCard title="Social media links">
            <div class="px-8 pb-7">
              <FormsOrganizationSocials />
            </div>
          </BaseCollapsibleCard>
        </div>

        <v-row class="py-12 px-6" justify="end">
          <v-btn color="secondary" @click="saveOrganization()">
            Submit
          </v-btn>
        </v-row>
      </div>
    </v-col>
  </v-row>
</template>
