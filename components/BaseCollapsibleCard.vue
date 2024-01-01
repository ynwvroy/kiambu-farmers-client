<script setup lang="ts">
import { ref } from "vue";

import { ChevronDownIcon, ChevronUpIcon } from "vue-tabler-icons";

const props = defineProps({
  title: String,
  class: String,
});

const isCollapsed = ref(true);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<template>
  <v-card elevation="6" class="withbg" rounded="lg">
    <v-card-item class="pa-0">
      <div
        class="d-sm-flex align-center justify-space-between"
        @click="toggleCollapse"
        style="cursor: pointer"
      >
        <div class="d-flex align-center pa-6" style="gap: 20px">
          <div>
            <span v-if="isCollapsed">
              <ChevronDownIcon />
            </span>
            <span v-else>
              <ChevronUpIcon />
            </span>
          </div>
          <div>
            <h5 class="text-h5">{{ title }}</h5>
          </div>
        </div>
        <slot name="action"></slot>
      </div>

      <transition name="fade">
        <div v-show="!isCollapsed">
          <slot />
        </div>
      </transition>
    </v-card-item>
  </v-card>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
