<script setup lang="ts">
const { eventFormState } = useEvents();
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1"
          >Enter the event location</v-label
        >
        <v-text-field
          v-model="eventFormState.location"
          variant="outlined"
          hide-details
          placeholder="Enter a general place your event will be"
          color="primary"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1"
          >Google maps direction link</v-label
        >
        <v-text-field
          v-model="eventFormState.maps_direction_pin"
          variant="outlined"
          hide-details
          placeholder="https://maps.googlemapsapi...."
          color="primary"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
