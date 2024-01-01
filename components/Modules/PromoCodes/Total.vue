<script setup lang="ts"></script>

<template>
  <div>
    <v-card elevation="5" rounded="lg" class="withbg">
      <v-card-item>
        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">Total promo codes</v-card-title>
        </div>
        <v-row>
          <v-col cols="12">
            <div class="mt-6">
              <h3 class="text-h3 text-center pb-4 text-error">352 promo codes</h3>
              <div class="mt-1">
                <v-avatar class="bg-lightsuccess text-success" size="25">
                  <ArrowUpLeftIcon size="20" />
                </v-avatar>
                <span class="text-subtitle-1 ml-2 font-weight-bold"
                  >x redeemed</span
                >
              </div>
              <div class="mt-1">
                <v-avatar class="bg-lightsuccess text-success" size="25">
                  <ArrowUpLeftIcon size="20" />
                </v-avatar>
                <span class="text-subtitle-1 ml-2 font-weight-bold"
                  >x redeemed</span
                >
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </div>
</template>
