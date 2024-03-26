<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Incomes",
});

const userId = useCookie<string | any>("user_id");

const userType = useCookie<string | undefined>("user_type");

const router = useRouter();

const {
  isEditingIncome,
  resetIncomeFormState,
  getSingleIncome,
  deleteSingleIncome,
  incomeFormState,
  getAllIncomes,
  incomes,
} = useIncomes();

const url =
  userType.value === "farmer"
    ? `/incomes/seller/${userId.value}`
    : "/incomes";

const response = await useApi<IGetAllIncomes>(url, {
  method: "GET",
});

incomes.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 50,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
    resizable: true,
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    width: 120,
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

const editIncomes = async (income_id: string) => {
  isEditingIncome.value = true;
  const response = await getSingleIncome(income_id);
  router.push(`/incomes/${response?.id}`);
};

const showDeleteConfirm = async (income_id: number) => {
  Modal.confirm({
    title: "Delete income",
    icon: TrashIcon,
    content: "Are you sure you want to delete this income?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleIncome(income_id);
      await getAllIncomes();
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
      title="Incomes"
      pageCrumbTitle="Dashboard"
      pageName="Incomes"
      :hasActionButton="true"
      buttonName="New Incomes"
      buttonRouteTo="/incomes/new-income"
    />

    <!-- ---------------------------------------------- -->
    <!--Income table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="incomes"
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
                    @click="editIncomes(record.id)"
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
