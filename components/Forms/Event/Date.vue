<script setup lang="ts">
const { eventFormState } = useEvents();

watch(
  () => eventFormState.value.number_of_days,
  (newValue) => {
    generateDateFields(newValue);
  }
);

const generateDateFields = (days: string | number) => {
  const dates = Array.from({ length: Number(days) }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return date.toISOString().split("T")[0]; // Format the date as 'YYYY-MM-DD'
  });

  eventFormState.value.start_date = dates[0];
  eventFormState.value.end_date = dates[dates.length - 1];
};
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6">
        <v-label class="font-weight-bold mb-1">Number of Days</v-label>
        <v-text-field
          v-model="eventFormState.number_of_days"
          variant="outlined"
          hide-details
          color="primary"
          type="number"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="eventFormState.start_date && eventFormState.end_date">
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">Start Date</v-label>
        <v-text-field
          v-model="eventFormState.start_date"
          variant="outlined"
          hide-details
          color="primary"
          type="date"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-label class="font-weight-bold mb-1">End Date</v-label>
        <v-text-field
          v-model="eventFormState.end_date"
          variant="outlined"
          hide-details
          color="primary"
          type="date"
        ></v-text-field>
      </v-col>
    </v-row>
    <div>
      <v-row
        v-for="(index) in Array.from({
          length: Number(eventFormState.number_of_days) || 0,
        })"
        :key="index"
      >
          <v-col cols="12" md="6" xs="12">
            <v-label class="font-weight-bold mb-1">Start Time {{ index }}</v-label>
            <v-text-field
              v-model="eventFormState.start_time"
              variant="outlined"
              hide-details
              color="primary"
              type="time"
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="6" xs="12">
            <v-label class="font-weight-bold mb-1">End Time</v-label>
            <v-text-field
              v-model="eventFormState.end_time"
              variant="outlined"
              hide-details
              color="primary"
              type="time"
            ></v-text-field>
          </v-col>
      </v-row>
    </div>
  </div>
</template>
