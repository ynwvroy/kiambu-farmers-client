<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Crop health",
});

const userId = useCookie<string | any>("user_id");

const userType = useCookie<string | undefined>("user_type");

const router = useRouter();

const {
  isEditingCropHealth,
  resetCropHealthFormState,
  getSingleCropHealth,
  deleteCropHealth,
  cropHealthFormState,
  getAllCropHealth,
  cropHealth,
} = useCropHealth();

const url =
  userType.value === "farmer"
    ? `/crop-health/seller/${userId.value}`
    : "/crop-health";

const response = await useApi<IGetAllCropHealth>(url, {
  method: "GET",
});

cropHealth.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 50,
  },
  {
    title: "Date recorded",
    dataIndex: "date_recorded",
    key: "date_recorded",
    resizable: true,
    width: 150,
  },
  {
    title: "Input type",
    dataIndex: "input_type",
    key: "input_type",
    resizable: true,
    width: 120,
  },
  {
    title: "Quantity applied",
    dataIndex: "quantity_applied",
    key: "quantity_applied",
    resizable: true,
    width: 150,
  },
  {
    title: "Application method",
    dataIndex: "application_method",
    key: "application_method",
    resizable: true,
    width: 150,
  },
  {
    title: "Cost",
    dataIndex: "cost",
    key: "cost",
    resizable: true,
    width: 60,
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
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

const editCropHealth = async (crop_health_id: number) => {
  isEditingCropHealth.value = true;
  const response = await getSingleCropHealth(crop_health_id);
  router.push(`/crop-health/${response?.id}`);
};

const showDeleteConfirm = async (crop_health_id: number) => {
  Modal.confirm({
    title: "Delete product",
    icon: TrashIcon,
    content: "Are you sure you want to delete this product?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteCropHealth(crop_health_id);
      await getAllCropHealth();
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
      title="Crop health"
      pageCrumbTitle="Dashboard"
      pageName="Crop health"
      :hasActionButton="true"
      buttonName="New Crop Health"
      buttonRouteTo="/crop-health/new-crop-health"
    />

    <!-- ---------------------------------------------- -->
    <!--Crop health table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="cropHealth"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Date -->
                <template v-if="column.key === 'date_recorded'">
                  <span>
                    {{ record.date_recorded.split("T")[0] }}
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
                    @click="editCropHealth(record.id)"
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
