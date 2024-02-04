<script lang="ts" setup>
const collapsed = ref<boolean>(false);
</script>

<template>
  <a-layout style="min-height: 100vh">
    <!-- ---------------------------------------------- -->
    <!-- Sidebar -->
    <!-- ---------------------------------------------- -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <BaseSideBar />
    </a-layout-sider>
    <a-layout>
      <!-- ---------------------------------------------- -->
      <!-- Header -->
      <!-- ---------------------------------------------- -->
      <a-layout-header style="background: #fff; padding: 0" />

      <!-- ---------------------------------------------- -->
      <!-- Content -->
      <!-- ---------------------------------------------- -->
      <a-layout-content style="margin: 0 16px">
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
  </a-layout>
</template>

<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
</style>
