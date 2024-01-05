<script setup lang="ts"></script>

<template>
  <v-row>
    <v-col cols="12" md="12">
      <BaseCard title="So, you want to host your own event?">
        <div class="pa-7 pt-1">
          <p class="text-center py-5">
            With Reservo, managing your event is as easy as it gets<br />
            Here are some of the benefits
          </p>
          <v-row>
            <v-col cols="12" md="4" xs="12">
              <BaseContentCard title="Order help">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                mollitia pariatur accusamus?
              </BaseContentCard>
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <BaseContentCard title="Analytics">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                mollitia pariatur accusamus?
              </BaseContentCard>
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <BaseContentCard title="Tickets provision">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                mollitia pariatur accusamus?
              </BaseContentCard>
            </v-col>
            <v-col cols="12" md="4" xs="12">
              <BaseContentCard title="Comments">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Harum
                mollitia pariatur accusamus?
              </BaseContentCard>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12">
              <p class="text-center py-5">Ready to get started?<NuxtLink to="/host-an-event/new-organization"> Click here to create your organization</NuxtLink></p>
            </v-col>
          </v-row>
        </div>
      </BaseCard>
    </v-col>
  </v-row>
</template>
