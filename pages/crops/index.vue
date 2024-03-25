<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Crops",
});

const userId = useCookie<string | any>("user_id");

const userType = useCookie<string | undefined>("user_type");

const router = useRouter();

const {
  isEditingCrops,
  resetCropsFormState,
  getSingleCrop,
  deleteSingleCrop,
  cropsFormState,
  getAllCrops,
  crops
} = useCrops();

const url =
  userType.value === "farmer" ? `/crops/seller/${userId.value}` : "/crops";

const response = await useApi<IGetAllCrops>(url, {
  method: "GET",
});

crops.value = response?.data;

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
    width: 150,
  },
  {
    title: "Variety",
    dataIndex: "variety",
    key: "variety",
    resizable: true,
    width: 120,
  },
  {
    title: "Planted Date",
    dataIndex: "planted_date",
    key: "planted_date",
    resizable: true,
    width: 150,
  },
  {
    title: "Harvest Date",
    dataIndex: "harvest_date",
    key: "harvest_date",
    resizable: true,
    width: 150,
  },
  {
    title: "Yield",
    dataIndex: "actual_yield",
    key: "actual_yield",
    resizable: true,
    width: 60,
  },
  {
    title: "Profit",
    dataIndex: "amount_profit",
    key: "amount_profit",
    resizable: true,
    width: 60,
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
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

const editCrop = async (crop_id: string) => {
  isEditingCrops.value = true;
  const response = await getSingleCrop(crop_id);
  router.push(`/crops/${response?.id}`);
};

const showDeleteConfirm = async (crop_id: number) => {
  Modal.confirm({
    title: "Delete product",
    icon: TrashIcon,
    content: "Are you sure you want to delete this product?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleCrop(crop_id);
      await getAllCrops();
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
      title="Crops"
      pageCrumbTitle="Dashboard"
      pageName="Crops"
      :hasActionButton="true"
      buttonName="New Crop"
      buttonRouteTo="/crops/new-crop"
    />

    <!-- ---------------------------------------------- -->
    <!--crops table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="crops"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">

                <!-- Date -->
                <template v-if="column.key === 'planted_date'">
                  <span>
                    {{ record.planted_date.split("T")[0] }}
                  </span>
                </template>


                <!-- Date -->
                <template v-if="column.key === 'harvest_date'">
                  <span>
                    {{ record.harvest_date.split("T")[0] }}
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
                    @click="editCrop(record.id)"
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
