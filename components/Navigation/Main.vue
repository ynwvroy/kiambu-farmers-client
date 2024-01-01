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
  { header: "Home" },
  {
    title: "Dashboard",
    icon: LayoutDashboardIcon,
    to: "/home",
    user_type: ["super_admin", "event_organizer", "user"],
  },
  { header: "Eveenti Management", user_type: ["super_admin"] },
  {
    title: "Career Applications",
    icon: FileDescriptionIcon,
    to: "/career-applications",
    user_type: ["super_admin"],
  },
  {
    title: "Mailing List",
    icon: MailFastIcon,
    to: "/mailing-list",
    user_type: ["super_admin"],
  },
  {
    title: "Events",
    icon: ConfettiIcon,
    to: "/events",
    user_type: ["super_admin"],
  },
  {
    title: "Tickets",
    icon: TicketIcon,
    to: "/tickets",
    user_type: ["super_admin"],
  },
  {
    title: "Promo Codes",
    icon: GiftIcon,
    to: "/promo-codes",
    user_type: ["super_admin"],
  },
  {
    title: "Users",
    icon: UsersIcon,
    to: "/users",
    user_type: ["super_admin"],
  },
  {
    title: "Queries & Contact",
    icon: QuestionMarkIcon,
    to: "/queries",
    user_type: ["super_admin"],
  },
  {
    title: "Organizations",
    icon: AffiliateIcon,
    to: "/organizations",
    user_type: ["super_admin"],
  },
  {
    title: "Teams",
    icon: ScubaMaskIcon,
    to: "/teams",
    user_type: ["super_admin"],
  },
  {
    title: "Tasks",
    icon: LayoutKanbanIcon,
    to: "/tasks",
    user_type: ["super_admin"],
  },
  {
    title: "Event Categories",
    icon: Category2Icon,
    to: "/event-categories",
    user_type: ["super_admin"],
  },
  {
    title: "Organizations comments",
    icon: MessageIcon,
    to: "/organizations-comments",
    user_type: ["super_admin"],
  },
  {
    title: "Events comments",
    icon: MessageCircle2Icon,
    to: "/events-comments",
    user_type: ["super_admin"],
  },
  { header: "Your organization", user_type: ["event_organizer"] },
  {
    title: "My Organization",
    icon: ComponentsIcon,
    to: "/my-organization",
    user_type: ["event_organizer"],
  },
  {
    title: "My events",
    icon: CalendarEventIcon,
    to: "/my-events",
    user_type: ["event_organizer"],
  },
  {
    title: "My team",
    icon: SitemapIcon,
    to: "/my-team",
    user_type: ["event_organizer"],
  },
  { header: "Regular user", user_type: ["user"] },
  {
    title: "My tickets",
    icon: ComponentsIcon,
    to: "/my-tickets",
    user_type: ["user"],
  },
  {
    title: "Past events",
    icon: CalendarEventIcon,
    to: "/past-events",
    user_type: ["user"],
  },
  {
    title: "Host an event",
    icon: ConfettiIcon,
    to: "/host-an-event",
    user_type: ["user"],
  },
  // {
  //   header: "Quick links",
  //   user_type: ["user", "event_organizer"],
  // },
  // {
  //   title: "Upcoming events",
  //   icon: ConfettiIcon,
  //   href: "https://reservo.co.ke/events",
  //   user_type: ["user", "event_organizer"],
  // },
  // {
  //   title: "All organizations",
  //   icon: ClearAllIcon,
  //   href: "https://reservo.co.ke/organizations",
  //   user_type: ["user", "event_organizer"],
  // },
  // {
  //   title: "Leave a comment",
  //   icon: MessageDotsIcon,
  //   href: "https://reservo.co.ke/reviews",
  //   user_type: ["user", "event_organizer"],
  // },
  // {
  //   title: "Terms of Use",
  //   icon: LockSquareIcon,
  //   href: "https://reservo.co.ke/terms",
  //   user_type: ["user", "event_organizer"],
  // },
  // {
  //   title: "Privacy Policy",
  //   icon: BanIcon,
  //   href: "https://reservo.co.ke/privacy",
  //   user_type: ["user", "event_organizer"],
  // },
]);

const eveentiItems = ref([
  { header: "Reservo" },
  {
    title: "Eveenti Website",
    icon: BrandWebflowIcon,
    href: "https://eveenti.com",
    user_type: ["user", "event_organizer"],
  },
  {
    title: "Upcoming events",
    icon: ConfettiIcon,
    href: "https://eveenti.com/events",
    user_type: ["user", "event_organizer"],
  },
  {
    title: "All organizations",
    icon: ClearAllIcon,
    href: "https://eveenti.com/organizations",
    user_type: ["user", "event_organizer"],
  },
  {
    title: "Leave a comment",
    icon: MessageDotsIcon,
    href: "https://eveenti.com/reviews",
    user_type: ["user", "event_organizer"],
  },
  {
    title: "Terms of Use",
    icon: LockSquareIcon,
    href: "https://eveenti.com/terms",
    user_type: ["user", "event_organizer"],
  },
  {
    title: "Privacy Policy",
    icon: BanIcon,
    href: "https://eveenti.com/privacy",
    user_type: ["user", "event_organizer"],
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
          <template v-for="item in eveentiItems" :key="item.title">
            <NavigationSidebarNavGroup :item="item" v-if="item.header" />
            <template v-else>
              <!-- <router-link
                v-if="item.to"
                :to="item.to"
                :class="{ 'sidebar-link': true, leftPadding: !item.to }"
                style="text-decoration: none"
                class="text-textSecondary"
              >
                <NavigationSidebarNavItem :item="item" />
              </router-link> -->
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
