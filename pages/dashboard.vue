<script setup lang="ts">

useHead({
  title: "Home",
});

</script>
<template>
  <v-row>
    <v-col cols="12">
      <v-row>
        <!-- Sales overview -->
        <v-col cols="12" lg="8">
          <!-- <BaseSalesOverview /> -->
        </v-col>
        <!-- Yearly Breakup / Monthly Earnings -->
        <v-col cols="12" lg="4">
          <div class="mb-6">
            <!-- <BaseYearlyBreakup /> -->
          </div>
          <div>
            <!-- <BaseMonthlyEarning /> -->
          </div>
        </v-col>
        <!-- Recent transaction -->
        <v-col cols="12" lg="4">
          <BaseRecentTransaction />
        </v-col>
        <!-- Product performence -->
        <v-col cols="12" lg="8">
          <BaseProductPerformance />
        </v-col>
        <!-- Product Cards -->
        <!-- <v-col cols="12">
          <BaseProductCards />
        </v-col> -->
      </v-row>
    </v-col>
  </v-row>
</template>
