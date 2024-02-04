<template>
  <a-layout class="layout" style="min-height: 100vh">
    <!-- ---------------------------------------------- -->
    <!-- Header -->
    <!-- ---------------------------------------------- -->
    <PublicAppBar />
    <!-- ---------------------------------------------- -->
    <!-- Content -->
    <!-- ---------------------------------------------- -->
    <a-layout-content>
      <div>
        <slot />
      </div>
    </a-layout-content>
    <!-- ---------------------------------------------- -->
    <!-- Footer -->
    <!-- ---------------------------------------------- -->
    <!-- <a-layout-footer style="text-align: center">
      Footer content here
    </a-layout-footer> -->
  </a-layout>
</template>
