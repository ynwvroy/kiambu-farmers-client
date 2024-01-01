<script setup lang="ts">
const { eventFormState } = useEvents();

const event_visibility = [
  {
    name: "Public",
    value: true,
  },
  {
    name: "Private",
    value: false,
  },
];

const event_fee = [
  {
    name: "Yes - I will charge for my event",
    value: true,
  },
  {
    name: "No - My event is free for all",
    value: false,
  },
];
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Is your event public</v-label>
        <v-select
          v-model="eventFormState.is_public"
          variant="outlined"
          hide-details
          :items="event_visibility"
          item-title="name"
          item-value="value"
          placeholder="A private event won't be featured on our list"
          color="primary"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1"
          >Is your event free entry</v-label
        >
        <v-select
          v-model="eventFormState.event_has_price"
          variant="outlined"
          hide-details
          :items="event_fee"
          item-title="name"
          item-value="value"
          placeholder="Choose one"
          color="primary"
        ></v-select>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1"
          >How many attendants can you accommodate?</v-label
        >
        <v-text-field
          v-model="eventFormState.initial_places_available"
          variant="outlined"
          hide-details
          placeholder="Enter the number of people your event expects"
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
