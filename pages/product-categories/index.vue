<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Product Categories",
  meta: [
    {
      name: "description",
      content:
        "Explore and discover different event categories. Find the perfect category for your events.",
    },
  ],
});

const {
  getSingleProductCategory,
  isEditingProductCategory,
  resetProductCategoryFormState,
  deleteSingleProductCategory,
  ProductCategoryFormState,
  getAllProductCategories,
} = useProductCategories();

const response = await useApi<IGetAllProductCategories>("/product-categories", {
  method: "GET",
});

ProductCategoryFormState.value = response?.data;

const router = useRouter();

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 10,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    resizable: true,
    width: 30,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    ellipsis: true,
    width: 50,
  },
  {
    title: "Actions",
    key: "action",
    resizable: true,
    width: 50,
  },
]);

function handleResizeColumn(w: any, col: any) {
  col.width = w;
}

const editProductCategory = async (category_id: string) => {
  isEditingProductCategory.value = true;
  const response = await getSingleProductCategory(category_id);
  router.push(`/product-categories/${response?.data?.slug}`);
};

const openProductCategory = () => {
  isEditingProductCategory.value = false;
  resetProductCategoryFormState();
  router.push("/product-categories/new-category");
};

const showDeleteConfirm = async (category_id: number) => {
  Modal.confirm({
    title: "Delete product category",
    icon: TrashIcon,
    content: "Are you sure you want to delete this category?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleProductCategory(category_id);
      await getAllProductCategories();
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
    <!-- <h1 class="text-h2 py-4">Product Categories</h1> -->
    <BaseHeader
      title="Product Categories"
      pageCrumbTitle="Dashboard"
      pageName="Product Categories"
      :hasActionButton="true"
      buttonName="New Category"
      buttonRouteTo="/product-categories/new-category"
    />
    <!-- ---------------------------------------------- -->
    <!--ProductCategories table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="ProductCategoryFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="100"
            >
              <template #bodyCell="{ column, record }">
                <!-- Actions -->
                <template v-if="column.key === 'action'">
                  <TrashIcon
                    size="18"
                    style="cursor: pointer"
                    color="red"
                    @click="showDeleteConfirm(record.id)"
                  />
                  <a-divider type="vertical" />
                  <EditIcon
                    size="18"
                    color="blue"
                    style="cursor: pointer"
                    @click="editProductCategory(record.id)"
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
