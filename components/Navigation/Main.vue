<script setup lang="ts">
import {
  LayoutDashboardIcon,
  FileDescriptionIcon,
  ComponentsIcon,
  CashBanknoteIcon,
  Menu2Icon,
  UsersIcon,
} from "vue-tabler-icons";

import {
  IconShoppingCart,
  IconCurrencyEuro,
  IconChartPie2,
  IconTruckDelivery,
  IconAlignBoxLeftMiddle,
  IconCoins,
} from "@tabler/icons-vue";

const sDrawer = ref(true);

const userType = useCookie("user_type");

const sidebarItems = ref([
  { header: "Admin Dashboard", user_type: ["super_admin"] },
  { header: "Farmer Dashboard", user_type: ["farmer"] },
  { header: "Regular customer", user_type: ["user"] },

  // Common for all
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/dashboard",
    user_type: ["super_admin", "farmer", "user"],
  },

  // Super admin only
  {
    title: "Products",
    icon: FileDescriptionIcon,
    to: "/products",
    user_type: ["super_admin"],
  },
  {
    title: "Users",
    icon: UsersIcon,
    to: "/users",
    user_type: ["super_admin"],
  },
  {
    title: "Sales",
    icon: IconCoins,
    to: "/sales",
    user_type: ["super_admin"],
  },
  {
    title: "Product Categories",
    icon: IconAlignBoxLeftMiddle,
    to: "/product-categories",
    user_type: ["super_admin"],
  },
  {
    title: "Orders",
    icon: IconTruckDelivery,
    to: "/orders",
    user_type: ["super_admin"],
  },


  // Farmer only
  {
    title: "My Sales",
    icon: CashBanknoteIcon,
    to: "/producer/sales",
    user_type: ["farmer"],
  },
  {
    title: "My Products",
    icon: FileDescriptionIcon,
    to: "/producer/products",
    user_type: ["farmer"],
  },
  {
    title: "My Orders",
    icon: IconShoppingCart,
    to: "/producer/orders",
    user_type: ["farmer"],
  },

  {
    title: "Income & Expenses",
    icon: IconCurrencyEuro,
    to: "/producer/income-expense",
    user_type: ["farmer"],
  },

  // Regular user only
  {
    title: "My orders",
    icon: ComponentsIcon,
    to: "/regular/my-orders",
    user_type: ["user"],
  },
]);

const filteredSidebarItems = computed(() => {
  return userType.value
    ? sidebarItems.value.filter(
        (item) =>
          Array.isArray(item.user_type) &&
          item.user_type.some((type) => userType.value?.includes(type))
      )
    : sidebarItems.value;
});

// Watch for changes in userType and update the computed ref using watchEffect
watchEffect(() => {
  filteredSidebarItems.value = userType.value
    ? sidebarItems.value.filter(
        (item) =>
          Array.isArray(item.user_type) &&
          item.user_type.some((type) => userType.value?.includes(type))
      )
    : sidebarItems.value;
});
</script>

<template>
  <v-navigation-drawer
    left
    elevation="0"
    app
    class="leftSidebar"
    v-model="sDrawer"
  >
    <div class="" style="max-height: 70px;">
      <NavigationLogo />
    </div>
    <!-- ---------------------------------------------- -->
    <!---Navigation -->
    <!-- ---------------------------------------------- -->
    <div>
      <perfect-scrollbar class="scrollnavbar">
        <v-list class="pa-6">
          <template v-for="item in filteredSidebarItems" :key="item.title">
            <NavigationSidebarNavGroup :item="item" v-if="item.header" />
            <template v-else>
              <router-link
                v-if="item.to"
                :to="item.to"
                :class="{ 'sidebar-link': true, leftPadding: !item.to }"
                style="text-decoration: none"
                class="text-textSecondary"
              >
                <NavigationSidebarNavItem :item="item" />
              </router-link>
              <a
                v-else
                :href="item.href"
                target="_blank"
                rel="noopener noreferrer"
                :class="{ 'sidebar-link': true, leftPadding: !item.to }"
                style="text-decoration: none"
                class="text-textSecondary"
              >
                <NavigationSidebarNavItem :item="item" />
              </a>
            </template>
          </template>
        </v-list>
      </perfect-scrollbar>
    </div>
  </v-navigation-drawer>
  <v-app-bar elevation="0" height="70">
    <div class="d-flex align-center justify-space-between w-100">
      <div>
        <v-btn
          class="hidden-lg-and-up ms-md-3 ms-sm-5 ms-3 text-muted"
          @click="sDrawer = !sDrawer"
          icon
          variant="flat"
          size="small"
        >
          <Menu2Icon size="20" stroke-width="1.5" />
        </v-btn>
        <NavigationHeaderNotificationDD />
      </div>
      <div>
        <NavigationHeaderProfileDD />
      </div>
    </div>
  </v-app-bar>
</template>
