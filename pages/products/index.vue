<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Products",
});

const userId = useCookie<string | any>("user_id");

const userType = useCookie<string | undefined>("user_type");

const {
  isEditingProducts,
  getSingleProduct,
  resetProductsFormState,
  productsFormState,
  products,
  deleteSingleProduct,
  getAllProducts,
} = useProducts();

const router = useRouter();

const url =
  userType.value === "farmer"
    ? `/products/seller/${userId.value}`
    : "/products";

const response = await useApi<IGetAllProducts>(url, {
  method: "GET",
});

products.value = response?.data;

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
    <!-- <h1 class="text-h1 py-4">{{ userType === 'farmer' ? 'My products' : 'Products' }}</h1> -->
    <BaseHeader
      title="Products"
      pageCrumbTitle="Dashboard"
      pageName="Products"
      :hasActionButton="true"
      buttonName="New Product"
      buttonRouteTo="/products/new-product"
    />

    <!-- ---------------------------------------------- -->
    <!--Products table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="products"
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

                <!-- Image -->
                <template v-if="column.key === 'image_url'">
                  <v-img
                    :src="record.image_url"
                    style="height: 2rem; width: 2rem"
                  />
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
