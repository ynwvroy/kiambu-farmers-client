<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Products",
  meta: [
    {
      name: "description",
      content:
        "Manage and track your products efficiently. Stay organized and achieve your goals with our product management system.",
    },
  ],
});

const userId = useCookie<string | any>("user_id");

const {
  isEditingProducts,
  getSingleProduct,
  resetProductsFormState,
  productsFormState,
  deleteSingleProduct,
  getAllProducts,
} = useProducts();

const router = useRouter();

const response = await useApi<IGetAllProducts>(`/products/seller/${userId.value}`, {
  method: "GET",
});

productsFormState.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 50,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    resizable: true,
    width: 120,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    ellipsis: true,
    width: 150,
  },
  {
    title: "Category",
    dataIndex: "category_id",
    key: "category_id",
    resizable: true,
    width: 60,
  },
  {
    title: "Quantity",
    dataIndex: "stock_quantity",
    key: "stock_quantity",
    resizable: true,
    width: 60,
  },
  {
    title: "Units sold",
    dataIndex: "units_sold",
    key: "units_sold",
    resizable: true,
    width: 60,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
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

const editProducts = async (product_id: string) => {
  isEditingProducts.value = true;
  const response = await getSingleProduct(product_id);
  router.push(`/products/${response?.id}`);
};

const openProductsForm = () => {
  isEditingProducts.value = false;
  resetProductsFormState();
  router.push("/products/new-product");
};

const showDeleteConfirm = async (product_id: number) => {
  Modal.confirm({
    title: "Delete product",
    icon: TrashIcon,
    content: "Are you sure you want to delete this product?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleProduct(product_id);
      await getAllProducts();
    },
    onCancel() {
      return;
    },
  });
};
</script>

<template>
  <div class="pa-4">
    <!-- ---------------------------------------------- -->
    <!--Title -->
    <!-- ---------------------------------------------- -->
    <h1 class="text-h1 py-4">My Products</h1>

    <!-- ---------------------------------------------- -->
    <!--Products table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openProductsForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Create Product
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="productsFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Category relation -->
                <template v-if="column.key === 'category_id'">
                  <span v-if="record.category_id && record.category_id > 0">
                    ({{ record.category.id }}) {{ record.category.name }}
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
                    @click="editProducts(record.id)"
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
