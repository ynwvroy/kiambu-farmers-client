<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

useHead({
  title: "Tickets",
  meta: [
    { name: "description", content: "View and manage tickets for events. Stay organized and keep track of your event attendance." },

  ],
});

const tickets = ref<IGetAllTickets>();

const response = await useApi<IGetAllTickets>("/tickets", {
  method: "GET",
});

tickets.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 70,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    width: 350,
    resizable: true,
  },
  {
    title: "Buyer",
    dataIndex: "user_id",
    key: "user_id",
    resizable: true,
    width: 250,
  },
  {
    title: "Amount payable",
    dataIndex: "amount_to_pay",
    key: "amount_to_pay",
    ellipsis: true,
    width: 150,
    resizable: true,
  },
  {
    title: "Discount",
    dataIndex: "discount_amount",
    key: "discount_amount",
    ellipsis: true,
    width: 150,
    resizable: true,
  },
  {
    title: "Has promo code",
    dataIndex: "has_promo_code",
    key: "has_promo_code",
    resizable: true,
    width: 150,
  },
  {
    title: "Payment status",
    dataIndex: "has_paid",
    key: "has_paid",
    resizable: true,
    width: 150,
  },
  {
    title: "Method of Payment",
    dataIndex: "method_of_payment",
    key: "method_of_payment",
    ellipsis: true,
    width: 350,
    resizable: true,
  },
  {
    title: "Transaction ID",
    dataIndex: "payment_transaction_id",
    key: "payment_transaction_id",
    ellipsis: true,
    width: 350,
    resizable: true,
  },
  {
    title: "Ticket type",
    dataIndex: "ticket_type",
    key: "ticket_type",
    width: 150,
    resizable: true,
  },
  {
    title: "No. of tickets",
    dataIndex: "number_of_tickets",
    key: "number_of_tickets",
    width: 150,
    resizable: true,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    width: 150,
    resizable: true,
  },
  {
    title: "Seat allocation",
    dataIndex: "seat_number_allocation",
    key: "seat_number_allocation",
    width: 150,
    resizable: true,
  },
  {
    title: "Event details",
    dataIndex: "event_id",
    key: "event_id",
    resizable: true,
    width: 250,
  },
  {
    title: "Promo code",
    dataIndex: "promo_code_id",
    key: "promo_code_id",
    resizable: true,
    width: 250,
  },
  {
    title: "Date created",
    dataIndex: "created_at",
    key: "created_at",
    resizable: true,
    width: 150,
  },
  {
    title: "Actions",
    key: "action",
    resizable: true,
    width: 150,
  },
]);

function handleResizeColumn(w: any, col: any) {
  col.width = w;
}
</script>

<template>
  <div class="pa-4">
    <!-- ---------------------------------------------- -->
    <!--Title -->
    <!-- ---------------------------------------------- -->
    <h1 class="text-h1 py-4">Tickets</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="py-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesTicketsPast3Months />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesTicketsPast6Months />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesTicketsPast12Months />
      </v-col>
      <v-col cols="12">
        <ModulesTicketsOverview />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--Tickets table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="tickets"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1500"
            >
              <template #bodyCell="{ column, record }">
                <!-- Date created -->
                <template v-if="column.key === 'created_at'">
                  <span>
                    {{ record.created_at.split("T")[0] }}
                  </span>
                </template>

                <!-- Buyer relation -->
                <template v-if="column.key === 'user_id'">
                  <span v-if="record.user_id && record.user_id > 0">
                    ({{ record.user.id }}) {{ record.user.full_name }}
                  </span>
                </template>

                <!-- Event relation -->
                <template v-if="column.key === 'event_id'">
                  <span v-if="record.event_id && record.event_id > 0">
                    ({{ record.events.id }}) {{ record.events.name }}
                  </span>
                </template>

                <!-- Currency -->
                <template v-if="column.key === 'currency'">
                  <a-tag color="blue">{{ record.currency }}</a-tag>
                </template>

                <!-- Promo code relation -->
                <template v-if="column.key === 'promo_code_id'">
                  <span v-if="record.promo_code_id && record.promo_code_id > 0">
                    ({{ record.promo_codes.id }})
                    {{ record.promo_codes.description }}
                  </span>
                </template>

                <!-- Has promo -->
                <template v-if="column.key === 'has_promo_code'">
                  <span v-if="record.has_promo_code === 1">
                    <a-tag color="green">Yes</a-tag>
                  </span>
                  <span v-else-if="record.has_promo_code === 0">
                    <a-tag color="red">No</a-tag>
                  </span>
                </template>

                <!-- Has paid -->
                <template v-if="column.key === 'has_paid'">
                  <span v-if="record.has_paid === 1">
                    <a-tag color="green">Paid</a-tag>
                  </span>
                  <span v-else-if="record.has_paid === 0">
                    <a-tag color="red">Not Paid</a-tag>
                  </span>
                </template>

                <!-- Actions -->
                <template v-if="column.key === 'action'">
                  <DeleteOutlined style="cursor: pointer" />
                  <a-divider type="vertical" />
                  <EditOutlined style="cursor: pointer" />
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
