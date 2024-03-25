<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Orders",
});

const userId = useCookie<string | any>("user_id");

const userType = useCookie<string | undefined>("user_type");

const router = useRouter();

const {
  isEditingOrders,
  resetOrdersFormState,
  getSingleOrder,
  deleteSingleOrder,
  ordersFormState,
  getAllOrders,
} = useOrders();

const url =
  userType.value === "farmer" ? `/orders/seller/${userId.value}` : "/orders";

const response = await useApi<IGetAllOrders>(url, {
  method: "GET",
});

ordersFormState.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 50,
  },
  {
    title: "Tracking number",
    dataIndex: "tracking_number",
    key: "tracking_number",
    resizable: true,
    width: 150,
  },
  {
    title: "Product",
    dataIndex: "product_id",
    key: "product_id",
    resizable: true,
    width: 120,
  },
  {
    title: "Buyer",
    dataIndex: "buyer_id",
    key: "buyer_id",
    resizable: true,
    width: 150,
  },
  {
    title: "Seller",
    dataIndex: "seller_id",
    key: "seller_id",
    resizable: true,
    width: 150,
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
    resizable: true,
    width: 60,
  },
  {
    title: "Total price",
    dataIndex: "total_price",
    key: "total_price",
    resizable: true,
    width: 60,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    resizable: true,
    width: 150,
  },
  {
    title: "Payment method",
    dataIndex: "payment_method",
    key: "payment_method",
    resizable: true,
    width: 150,
  },
  {
    title: "Transaction ID",
    dataIndex: "payment_transaction_id",
    key: "payment_transaction_id",
    resizable: true,
    width: 150,
  },
  {
    title: "Delivery Address",
    dataIndex: "delivery_address",
    key: "delivery_address",
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

const editOrder = async (order_id: string) => {
  isEditingOrders.value = true;
  const response = await getSingleOrder(order_id);
  router.push(`/orders/${response?.id}`);
};

const openOrdersForm = () => {
  isEditingOrders.value = false;
  resetOrdersFormState();
  router.push("/orders/new-order");
};

const showDeleteConfirm = async (order_id: number) => {
  Modal.confirm({
    title: "Delete product",
    icon: TrashIcon,
    content: "Are you sure you want to delete this product?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleOrder(order_id);
      await getAllOrders();
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
    <!--Title -->
    <!-- ---------------------------------------------- -->
    <BaseHeader
      title="Orders"
      pageCrumbTitle="Dashboard"
      pageName="Orders"
      :hasActionButton="true"
      buttonName="New Order"
      buttonRouteTo="/orders/new-order"
    />

    <!-- ---------------------------------------------- -->
    <!--Orders table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="ordersFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Product relation -->
                <template v-if="column.key === 'product_id'">
                  <span v-if="record.product_id && record.product_id > 0">
                    ({{ record.product.id }})
                    {{ record?.product?.name }}
                  </span>
                </template>

                <!-- Seller relation -->
                <template v-if="column.key === 'seller_id'">
                  <span v-if="record.seller_id && record.seller_id > 0">
                    ({{ record.seller.id }})
                    {{ record?.seller?.full_name }}
                  </span>
                </template>

                <!-- Buyer relation -->
                <template v-if="column.key === 'buyer_id'">
                  <span v-if="record.buyer_id && record.buyer_id > 0">
                    ({{ record.buyer.id }})
                    {{ record?.buyer?.full_name }}
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
                    @click="editOrder(record.id)"
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
