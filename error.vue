<script setup lang="ts">
// Page title
const title = ref("404-Page Not Found");
useHead({
  meta: [{ content: title }],
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - 404-Page Not Found`
      : "Kiambu Farmers Dashboard";
  },
});
</script>
<template>
  <div class="d-flex justify-center align-center text-center h-100vh">
      <div>
          <img src="/images/background/errorimg.svg" width="500" alt="404" />
          <h1 class="text-h1 pt-3">Opps!!!</h1>
          <h4 class="text-h4 my-8">This page you are looking for could not be found.</h4>
          <v-btn flat color="primary" class="mb-4" to="/home">Go Back to Home</v-btn>
      </div>
  </div>
</template>

<!-- crop management fields

id
farmer_id
crop name
variety
planting_date
harvesting_date
yeild_quantity
input_expenses
revenue_earned
market_price_per_unit
units_sold
units_remaining
spoilt_units
disease_management_notes
harvest_quality_rating
pest_management_notes
average_weather_conditions


livestock management

id
farmer_id
name
species
breed
birth_date
purchase_date
purchase_price
offspring_count
reproduction_status -->
