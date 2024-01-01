<script setup lang="ts">
const selectedTicketTypes = ref<string[]>([]);
const earlyBirdPrice = ref("");
const earlyBirdQuantity = ref(0);
const studentSeniorPrice = ref("");
const studentSeniorQuantity = ref(0);
const groupPrice = ref("");
const groupQuantity = ref(0);
const groupNumber = ref(0);
const vipPrice = ref("");
const vipQuantity = ref(0);
const generalPrice = ref("");
const generalQuantity = ref(0);
const backstagePrice = ref("");
const backstageQuantity = ref(0);
const familyPrice = ref("");
const familyQuantity = ref(0);
</script>

<template>
  <div>
    <v-row>
      <v-col cols="12" md="6" xs="12">
        <v-checkbox
          v-model="selectedTicketTypes"
          label="Free"
          value="free"
        ></v-checkbox>

        <v-text-field
          v-if="selectedTicketTypes.includes('earlyBird')"
          v-model="earlyBirdPrice"
          color="primary"
          variant="outlined"
          label="Price"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('earlyBird')"
          v-model="earlyBirdQuantity"
          label="Number of Tickets"
          color="primary"
          variant="outlined"
          type="number"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-checkbox
          v-model="selectedTicketTypes"
          label="Early bird"
          value="earlyBird"
        ></v-checkbox>
        <v-text-field
          v-if="selectedTicketTypes.includes('earlyBird')"
          v-model="earlyBirdPrice"
          label="Price"
          color="primary"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('earlyBird')"
          v-model="earlyBirdQuantity"
          label="Number of Tickets"
          type="number"
          color="primary"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-checkbox
          v-model="selectedTicketTypes"
          label="Student/Senior"
          value="studentSenior"
        ></v-checkbox>
        <v-text-field
          v-if="selectedTicketTypes.includes('studentSenior')"
          v-model="studentSeniorPrice"
          label="Price"
          color="primary"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('studentSenior')"
          v-model="studentSeniorQuantity"
          label="Number of Tickets"
          type="number"
          color="primary"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-checkbox
          v-model="selectedTicketTypes"
          label="Group ticket"
          value="group"
          color="primary"
          variant="outlined"
        ></v-checkbox>
        <v-text-field
          v-if="selectedTicketTypes.includes('group')"
          v-model="groupPrice"
          label="Price"
          color="primary"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('group')"
          v-model="groupQuantity"
          label="Number of Tickets"
          type="number"
          color="primary"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('group')"
          v-model="groupNumber"
          label="Group Number"
          type="number"
          color="primary"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-checkbox
          v-model="selectedTicketTypes"
          label="VIP ticket"
          value="vip"
          color="primary"
          variant="outlined"
        ></v-checkbox>
        <v-text-field
          v-if="selectedTicketTypes.includes('vip')"
          v-model="vipPrice"
          label="Price"
          color="primary"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('vip')"
          v-model="vipQuantity"
          label="Number of Tickets"
          type="number"
          color="primary"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-checkbox
          v-model="selectedTicketTypes"
          label="General ticket"
          value="general"
        ></v-checkbox>
        <v-text-field
          v-if="selectedTicketTypes.includes('general')"
          v-model="generalPrice"
          color="primary"
          variant="outlined"
          label="Price"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('general')"
          v-model="generalQuantity"
          label="Number of Tickets"
          type="number"
          color="primary"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-checkbox
          v-model="selectedTicketTypes"
          label="Backstage ticket"
          value="backstage"
        ></v-checkbox>
        <v-text-field
          v-if="selectedTicketTypes.includes('backstage')"
          v-model="backstagePrice"
          label="Price"
          color="primary"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('backstage')"
          v-model="backstageQuantity"
          label="Number of Tickets"
          type="number"
          color="primary"
          variant="outlined"
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="6" xs="12">
        <v-checkbox
          v-model="selectedTicketTypes"
          label="Family ticket"
          value="family"
        ></v-checkbox>
        <v-text-field
          v-if="selectedTicketTypes.includes('family')"
          v-model="familyPrice"
          label="Price"
          color="primary"
          variant="outlined"
        ></v-text-field>
        <v-text-field
          v-if="selectedTicketTypes.includes('family')"
          v-model="familyQuantity"
          label="Number of Tickets"
          type="number"
          color="primary"
          variant="outlined"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
