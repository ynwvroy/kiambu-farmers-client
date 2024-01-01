<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

useHead({
  title: "Promo Codes",
  meta: [
    { name: "description", content: "Explore and manage promotional codes. Boost engagement and attract more users with special offers." },

  ],
});

const promoCodes = ref<IGetAllPromoCodes>();

const response = await useApi<IGetAllPromoCodes>("/promo-codes", {
  method: "GET",
});

promoCodes.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 100,
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
    resizable: true,
    width: 220,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    width: 350,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    width: 150,
    resizable: true,
  },
  {
    title: "Is valid",
    dataIndex: "is_valid",
    key: "is_valid",
    width: 150,
    resizable: true,
  },
  {
    title: "Valid until",
    dataIndex: "valid_until",
    key: "valid_until",
    resizable: true,
    width: 250,
  },
  {
    title: "Type of use",
    dataIndex: "type_of_use",
    key: "type_of_use",
    resizable: true,
    width: 250,
  },
  {
    title: "Redemption count",
    dataIndex: "redemption_count",
    key: "redemption_count",
    resizable: true,
    width: 250,
  },
  {
    title: "Usage limit",
    dataIndex: "usage_limit_per_person",
    key: "usage_limit_per_person",
    resizable: true,
    width: 250,
  },
  {
    title: "Currency",
    dataIndex: "currency",
    key: "currency",
    resizable: true,
    width: 250,
  },
  {
    title: "Event details",
    dataIndex: "event_id",
    key: "event_id",
    resizable: true,
    width: 250,
  },
  {
    title: "Date created",
    dataIndex: "created_at",
    key: "created_at",
    resizable: true,
    width: 250,
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
    <h1 class="text-h1 py-4">Promo codes</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="pt-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesPromoCodesOrganization />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesPromoCodesTotal />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesPromoCodesEvent />
      </v-col>
    </v-row>
    <v-row class="pb-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesPromoCodesPast3Months />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesPromoCodesPast6Months />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesPromoCodesPast12Months />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--Promo codes table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" to="/promo-codes/new-promo-code">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Create Promo Code
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="promoCodes"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Date created -->
                <template v-if="column.key === 'created_at'">
                  <span>
                    {{ record.created_at.split("T")[0] }}
                  </span>
                </template>

                <!-- Valid until -->
                <template v-if="column.key === 'valid_until'">
                  <span>
                    {{ record.valid_until.split("T")[0] }}
                  </span>
                </template>

                <!-- Event relation -->
                <template v-if="column.key === 'event_id'">
                  <span v-if="record.event_id && record.event_id > 0">
                    ({{ record.event.id }}) {{ record.event.name }}
                  </span>
                </template>

                <!-- Currency -->
                <template v-if="column.key === 'currency'">
                  <a-tag color="blue">{{ record.currency }}</a-tag>
                </template>

                <!-- Is valid -->
                <template v-if="column.key === 'is_valid'">
                  <span v-if="record.is_valid === 0">
                    <a-tag color="red">INVALID</a-tag>
                  </span>
                  <span v-else-if="record.is_valid === 1">
                    <a-tag color="green">VALID</a-tag>
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
