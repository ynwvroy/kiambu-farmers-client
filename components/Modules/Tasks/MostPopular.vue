<script setup lang="ts"></script>

<template>
  <div>
    <v-card elevation="5" rounded="lg" class="withbg">
      <v-card-item>
        <div class="d-sm-flex align-center justify-space-between pt-sm-2">
          <v-card-title class="text-h5">Most popular</v-card-title>
        </div>
        <v-row>
          <v-col cols="12">
            <div class="mt-6">
              <h3 class="text-h3 text-center pb-4">Tasks 1</h3>
              <div class="mt-1">
                <v-avatar class="bg-lightsuccess text-success" size="25">
                  <ArrowUpLeftIcon size="20" />
                </v-avatar>
                <span class="text-subtitle-1 ml-2 font-weight-bold"
                  >x events</span
                >
                <span class="text-subtitle-1 text-muted ml-2">all time</span>
              </div>

              <div class="mt-1">
                <v-avatar class="bg-lightsuccess text-success" size="25">
                  <ArrowUpLeftIcon size="20" />
                </v-avatar>
                <span class="text-subtitle-1 ml-2 font-weight-bold"
                  >x tickets sold</span
                >
                <span class="text-subtitle-1 text-muted ml-2">all time</span>
              </div>
              <div class="d-flex align-center mt-sm-10 mt-8">
                <h6 class="text-subtitle-1 text-muted">
                  <v-icon
                    icon="mdi mdi-checkbox-blank-circle"
                    class="mr-1"
                    size="10"
                    color="primary"
                  ></v-icon>
                  Joined 2022
                </h6>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-card-item>
    </v-card>
  </div>
</template>
