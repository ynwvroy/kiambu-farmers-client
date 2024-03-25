<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Sales",
  meta: [
    {
      name: "description",
      content:
        "Manage and track your sales efficiently. Stay organized and achieve your goals with our sale management system.",
    },
  ],
});

const {
  isEditingSales,
  getSingleSale,
  resetSalesFormState,
  salesFormState,
  deleteSingleSale,
  getAllSales,
} = useSales();

const router = useRouter();

const response = await useApi<IGetAllSales>("/sales", {
  method: "GET",
});

salesFormState.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 50,
  },
  {
    title: "Seller",
    dataIndex: "farmer_id",
    key: "farmer_id",
    resizable: true,
    width: 120,
  },
  {
    title: "Transaction ID",
    dataIndex: "payment_transaction_id",
    key: "payment_transaction_id",
    resizable: true,
    width: 120,
  },
  {
    title: "Payment Method",
    dataIndex: "payment_method",
    key: "payment_method",
    resizable: true,
    width: 120,
  },
  {
    title: "Product",
    dataIndex: "product_id",
    key: "product_id",
    resizable: true,
    width: 150,
  },
  {
    title: "Total Amount",
    dataIndex: "total_amount",
    key: "total_amount",
    resizable: true,
    ellipsis: true,
    width: 60,
  },
  {
    title: "Units Sold",
    dataIndex: "units_sold",
    key: "units_sold",
    resizable: true,
    width: 60,
  },
  {
    title: "Payment Status",
    dataIndex: "payment_status",
    key: "payment_status",
    resizable: true,
    width: 80,
  },
  {
    title: "Payment Date",
    dataIndex: "payment_received_date",
    key: "payment_received_date",
    resizable: true,
    width: 60,
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

const editSales = async (sale_id: string) => {
  isEditingSales.value = true;
  const response = await getSingleSale(sale_id);
  router.push(`/sales/${response?.id}`);
};

const openSalesForm = () => {
  isEditingSales.value = false;
  resetSalesFormState();
  router.push("/sales/new-sale");
};

const showDeleteConfirm = async (sale_id: number) => {
  Modal.confirm({
    title: "Delete sale",
    icon: TrashIcon,
    content: "Are you sure you want to delete this sale?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleSale(sale_id);
      await getAllSales();
    },
    onCancel() {
      return;
    },
  });
};
</script>

<template>
  <div>
    <!-- ---------------------------------------------- -->
    <!--Header -->
    <!-- ---------------------------------------------- -->
    <BaseHeader
      title="Sales"
      pageCrumbTitle="Dashboard"
      pageName="Sales"
      :hasActionButton="true"
      buttonName="New Sale"
      buttonRouteTo="/sales/new-sale"
    />

    <!-- ---------------------------------------------- -->
    <!--Sales table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="salesFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Seller relation -->
                <template v-if="column.key === 'farmer_id'">
                  <span v-if="record.farmer_id && record.farmer_id > 0">
                    ({{ record.farmer.id }}) {{ record.farmer.full_name }}
                  </span>
                </template>

                <!-- Product relation -->
                <template v-if="column.key === 'product_id'">
                  <span v-if="record.product_id && record.product_id > 0">
                    ({{ record.product.id }}) {{ record.product.name }}
                  </span>
                </template>

                <!-- Actions -->
                <template v-if="column.key === 'action'">
                  <TrashIcon
                    size="18"
                    color="red"
                    style="cursor: pointer"
                    @click="showDeleteConfirm(record.id)"
                  />
                  <a-divider type="vertical" />
                  <EditIcon
                    size="18"
                    color="blue"
                    style="cursor: pointer"
                    @click="editSales(record.id)"
                  />
                </template>
              </template>
            </a-table>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
