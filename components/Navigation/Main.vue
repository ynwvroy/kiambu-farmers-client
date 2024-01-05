<script setup lang="ts">
import {
  LayoutDashboardIcon,
  UserCircleIcon,
  DeviceAnalyticsIcon,
  FileDescriptionIcon,
  MailFastIcon,
  UsersIcon,
  QuestionMarkIcon,
  AffiliateIcon,
  Category2Icon,
  ComponentsIcon,
  CalendarEventIcon,
  SitemapIcon,
  LogoutIcon,
  MessageIcon,
  MessageCircle2Icon,
  ConfettiIcon,
  TicketIcon,
  GiftIcon,
  Menu2Icon,
  LockSquareIcon,
  BanIcon,
  ClearAllIcon,
  MessageDotsIcon,
  BrandWebflowIcon,
  ScubaMaskIcon,
  LayoutKanbanIcon,
  BrandWhatsappIcon,
  BrandLinktreeIcon
} from "vue-tabler-icons";

const sDrawer = ref(true);

const userType = useCookie("user_type");

const sidebarItems = ref([
  { header: "Admin Dashboard", user_type: ["super_admin"] },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/home",
    user_type: ["super_admin", "farmer", "user"],
  },
  {
    title: "Products",
    icon: FileDescriptionIcon,
    to: "/products",
    user_type: ["super_admin"],
  },
  {
    title: "Product Categories",
    icon: MailFastIcon,
    to: "/product-categories",
    user_type: ["super_admin"],
  },
  {
    title: "Orders",
    icon: ConfettiIcon,
    to: "/orders",
    user_type: ["super_admin"],
  },
  { header: "Farmer Dashboard", user_type: ["farmer"] },
  {
    title: "Sales",
    icon: SitemapIcon,
    to: "/producer/sales",
    user_type: ["farmer"],
  },
  {
    title: "Products",
    icon: ComponentsIcon,
    to: "/producer/products",
    user_type: ["farmer"],
  },
  {
    title: "Orders",
    icon: CalendarEventIcon,
    to: "/producer/orders",
    user_type: ["farmer"],
  },
  {
    title: "Crop management",
    icon: SitemapIcon,
    to: "/producer/crop-management",
    user_type: ["farmer"],
  },
  {
    title: "Livestock management",
    icon: SitemapIcon,
    to: "/livestock-management",
    user_type: ["farmer"],
  },
  { header: "Regular customer", user_type: ["user"] },
  {
    title: "Place an order",
    icon: ComponentsIcon,
    to: "/my-tickets",
    user_type: ["user"],
  },
]);

// const kiambufarmersItems = ref([
//   { header: "Reservo" },
//   {
//     title: "Kiambu Farmers Website",
//     icon: BrandWebflowIcon,
//     href: "https://kiambu-farmers.com",
//     user_type: ["user", "farmer"],
//   },
//   {
//     title: "Upcoming events",
//     icon: ConfettiIcon,
//     href: "https://kiambu-farmers.com/events",
//     user_type: ["user", "farmer"],
//   },
//   {
//     title: "All organizations",
//     icon: ClearAllIcon,
//     href: "https://kiambu-farmers.com/organizations",
//     user_type: ["user", "farmer"],
//   },
//   {
//     title: "Leave a comment",
//     icon: MessageDotsIcon,
//     href: "https://kiambu-farmers.com/reviews",
//     user_type: ["user", "farmer"],
//   },
//   {
//     title: "Terms of Use",
//     icon: LockSquareIcon,
//     href: "https://kiambu-farmers.com/terms",
//     user_type: ["user", "farmer"],
//   },
//   {
//     title: "Privacy Policy",
//     icon: BanIcon,
//     href: "https://kiambu-farmers.com/privacy",
//     user_type: ["user", "farmer"],
//   },
// ]);

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
    <div class="pa-5">
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
          <!-- <template v-for="item in kiambufarmersItems" :key="item.title">
            <NavigationSidebarNavGroup :item="item" v-if="item.header" />
            <template v-else>
              <a
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
          </template> -->
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
