<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Livestock",
});

const userId = useCookie<string | any>("user_id");

const userType = useCookie<string | undefined>("user_type");

const router = useRouter();

const {
  isEditingLivestock,
  resetLivestockFormState,
  getSingleLivestock,
  deleteSingleLivestock,
  livestockFormState,
  getAllLivestock,
  livestock,
} = useLivestock();

const url =
  userType.value === "farmer"
    ? `/livestock/farmer/${userId.value}`
    : "/livestock";

const response = await useApi<IGetAllLivestock>(url, {
  method: "GET",
});

livestock.value = response?.data;

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
    title: "Breed",
    dataIndex: "breed",
    key: "breed",
    resizable: true,
    width: 120,
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
    resizable: true,
    width: 150,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    resizable: true,
    width: 150,
  },
  {
    title: "Sex",
    dataIndex: "sex",
    key: "sex",
    resizable: true,
    width: 60,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
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
    title: "DOB",
    dataIndex: "date_of_birth",
    key: "date_of_birth",
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

const editLivestock = async (livestock_id: string) => {
  isEditingLivestock.value = true;
  const response = await getSingleLivestock(livestock_id);
  router.push(`/livestock/${response?.id}`);
};

const showDeleteConfirm = async (livestock_id: number) => {
  Modal.confirm({
    title: "Delete product",
    icon: TrashIcon,
    content: "Are you sure you want to delete this product?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleLivestock(livestock_id);
      await getAllLivestock();
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
      title="Livestock"
      pageCrumbTitle="Dashboard"
      pageName="Livestock"
      :hasActionButton="true"
      buttonName="New Livestock"
      buttonRouteTo="/livestock/new-livestock"
    />

    <!-- ---------------------------------------------- -->
    <!--livestock table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="livestock"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Date -->
                <template v-if="column.key === 'date_of_birth'">
                  <span>
                    {{ record.date_of_birth.split("T")[0] }}
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
                    @click="editLivestock(record.id)"
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
