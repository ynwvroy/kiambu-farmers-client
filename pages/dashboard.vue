<script setup lang="ts">
definePageMeta({
  layout: "default",
});

useHead({
  title: "Dashboard",
});

const route = useRoute();

const { analyticsState } = useAnalytics();

const pageNameCapitalized = computed(() => {
  return route.name
    ? route.name.toString().charAt(0).toUpperCase() +
        route.name.toString().slice(1)
    : "";
});

const response = await useApi<IFetchAnalytics>("/pages/analytics", {
  method: "GET",
});

analyticsState.value = response.data;
</script>

<template>
  <div>
    <!-- ---------------------------------------------- -->
    <!-- Header -->
    <!-- ---------------------------------------------- -->
    <!-- Breadcrumb -->
    <a-breadcrumb style="height: 40px; display: flex; align-items: center">
      <a-breadcrumb-item style="color: #5f8524; font-weight: 600"
        >Dashboard</a-breadcrumb-item
      >
      <a-breadcrumb-item>{{ pageNameCapitalized }}</a-breadcrumb-item>
    </a-breadcrumb>

    <a-space direction="vertical" style="width: 100%">
      <a-row
        :gutter="[
          { xs: 8, sm: 16, md: 24, lg: 32 },
          { xs: 8, sm: 16, md: 24, lg: 32 },
        ]"
      >
        <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
          <a-page-header
            title="Analytics"
            sub-title="System overview"
            :ghost="false"
          >
          </a-page-header>
        </a-col>
      </a-row>
    </a-space>
    {{ analytics }}

    <a-row
      :gutter="[
        { xs: 8, sm: 16, md: 24, lg: 32 },
        { xs: 8, sm: 16, md: 24, lg: 32 },
      ]"
    >
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <a-card title="Cases comparison" style="margin-top: 20px">
          <p>Comparison of number of cases open vs. number of closed cases</p>
          <ChartsPieChart />
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <a-card
          title="Officers and number of closed cases"
          style="margin-top: 20px"
        >
          <ChartsHorizontalBarChart />
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
        <a-card title="Monthly cases" style="margin-top: 20px">
          <ChartsBarChart />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
