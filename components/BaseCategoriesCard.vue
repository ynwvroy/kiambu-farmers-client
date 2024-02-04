<script setup lang="ts">
const props = defineProps([
  "link",
  "photo",
  "title",
  "price",
  "salesPrice",
  "rating",
]);

</script>

<template>
  <v-card elevation="10" class="withbg" rounded="md">
    <NuxtLink :to="link">
      <v-img :src="photo" height="100%" class="rounded-t-md"></v-img>
    </NuxtLink>
    <div class="d-flex justify-end mr-4 mt-n5">
      <v-btn size="40" icon class="bg-primary d-flex">
        <v-avatar size="30" class="text-white">
          <BasketIcon size="15" />
        </v-avatar>
        <v-tooltip activator="parent" location="bottom">Add To Cart </v-tooltip>
      </v-btn>
    </div>
    <v-card-item class="pt-0">
      <h6 class="text-h6" v-text="title"></h6>
      <div class="d-flex align-center justify-space-between mt-1">
        <div>
          <span class="text-h6" v-text="'$' + price"></span>
          <span
            class="text-body-1 ml-2 text-medium-emphasis text-decoration-line-through"
            v-text="'$' + salesPrice"
          ></span>
        </div>
      </div>
    </v-card-item>
  </v-card>
</template>
