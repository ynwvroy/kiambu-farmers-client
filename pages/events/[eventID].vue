<script setup lang="ts">
const {
  getSingleEvent,
  isEditingEvent,
  eventFormState,
  createNewEvent,
  updateSingleEvent,
} = useEvents();
useHead({
  title: "Events",
  meta: [
    {
      name: "description",
      content:
        "Create and organize a new event. Share your event details and engage with your audience.",
    },
  ],
});

const saveEvent = async () => {
  if (isEditingEvent.value) {
    await updateSingleEvent(eventFormState.value.id);
  } else {
    await createNewEvent();
  }
};
</script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <h3 class="text-h3 py-3">
        {{ isEditingEvent === true ? "Edit event" : "New event" }}
      </h3>
      <div class="pb-4">
        <BaseCollapsibleCard title="About your event">
          <div class="px-8 pb-7">
            <FormsEventAboutEvent />
          </div>
        </BaseCollapsibleCard>
      </div>

      <div class="pb-4">
        <BaseCollapsibleCard title="Contact information">
          <div class="px-8 pb-7">
            <FormsEventContact />
          </div>
        </BaseCollapsibleCard>
      </div>

      <div class="pb-4">
        <BaseCollapsibleCard title="Date & Time">
          <div class="px-8 pb-7">
            <FormsEventDate />
          </div>
        </BaseCollapsibleCard>
      </div>

      <div class="pb-4">
        <BaseCollapsibleCard title="Location & Direction">
          <div class="px-8 pb-7">
            <FormsEventLocation />
          </div>
        </BaseCollapsibleCard>
      </div>

      <div class="pb-4">
        <BaseCollapsibleCard title="Capacity & Pricing">
          <div class="px-8 pb-7">
            <FormsEventPricing />
          </div>
        </BaseCollapsibleCard>
      </div>

      <div class="pb-4">
        <BaseCollapsibleCard title="Tickets">
          <div class="px-8 pb-7">
            <FormsEventTickets />
          </div>
        </BaseCollapsibleCard>
      </div>

      <div class="pb-4">
        <BaseCollapsibleCard title="Promo codes">
          <div class="px-8 pb-7">
            <FormsEventPromoCodes />
          </div>
        </BaseCollapsibleCard>
      </div>

      <div class="pb-4">
        <BaseCollapsibleCard title="Additional information">
          <div class="px-8 pb-7">
            <FormsEventAdditionalInfo />
          </div>
        </BaseCollapsibleCard>
      </div>
    </v-col>
  </v-row>

  <v-row class="py-12 px-6" justify="end">
    <v-btn color="secondary" @click="saveEvent()">
      {{ isEditingEvent ? "Update" : "Create" }}
    </v-btn>
  </v-row>
</template>
