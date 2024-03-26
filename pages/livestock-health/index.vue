<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Livestock health",
});

const userId = useCookie<string | any>("user_id");

const userType = useCookie<string | undefined>("user_type");

const {
  isEditingLivestockHealth,
  getSingleLivestockHealth,
  resetLivestockHealthFormState,
  livestockHealthFormState,
  livestockHealth,
  deleteLivestockHealth,
  getAllLivestockHealth,
} = useLivestockHealth();

const router = useRouter();

const url =
  userType.value === "farmer"
    ? `/livestock-health/farmer/${userId.value}`
    : "/livestock-health";

const response = await useApi<IGetAllLivestockHealth>(url, {
  method: "GET",
});

livestockHealth.value = response?.data;

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
    title: "Treatment",
    dataIndex: "treatment",
    key: "treatment",
    resizable: true,
    width: 60,
  },
  {
    title: "Vaccination",
    dataIndex: "vaccination",
    key: "vaccination",
    resizable: true,
    width: 60,
  },
  {
    title: "Medication",
    dataIndex: "medication",
    key: "medication",
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

const editLivestockHealth = async (livestock_health_id: string) => {
  isEditingLivestockHealth.value = true;
  const response = await getSingleLivestockHealth(livestock_health_id);
  router.push(`/livestock-health/${response?.id}`);
};

const showDeleteConfirm = async (livestock_health_id: number) => {
  Modal.confirm({
    title: "Delete livestock health",
    icon: TrashIcon,
    content: "Are you sure you want to delete this livestock health?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteLivestockHealth(livestock_health_id);
      await getAllLivestockHealth();
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
      title="Livestock health"
      pageCrumbTitle="Dashboard"
      pageName="Livestock health"
      :hasActionButton="true"
      buttonName="New livestock health"
      buttonRouteTo="/livestock-health/new-livestock-health"
    />

    <!-- ---------------------------------------------- -->
    <!--Livestock health table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="livestockHealth"
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
                    @click="editLivestockHealth(record.id)"
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
