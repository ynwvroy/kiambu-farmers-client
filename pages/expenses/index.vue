<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Expenses",
});

const userId = useCookie<string | any>("user_id");

const userType = useCookie<string | undefined>("user_type");

const router = useRouter();

const {
  isEditingExpense,
  getSingleExpense,
  deleteSingleExpense,
  expenseFormState,
  getAllExpenses,
  expenses,
} = useExpenses();

const url =
  userType.value === "farmer"
    ? `/expenses/seller/${userId.value}`
    : "/expenses";

const response = await useApi<IGetAllExpenses>(url, {
  method: "GET",
});

expenses.value = response?.data;

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

const editExpenses = async (expense_id: string) => {
  isEditingExpense.value = true;
  const response = await getSingleExpense(expense_id);
  router.push(`/expenses/${response?.id}`);
};

const showDeleteConfirm = async (expense_id: number) => {
  Modal.confirm({
    title: "Delete expense",
    icon: TrashIcon,
    content: "Are you sure you want to delete this expense?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleExpense(expense_id);
      await getAllExpenses();
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
      title="Expenses"
      pageCrumbTitle="Dashboard"
      pageName="Expenses"
      :hasActionButton="true"
      buttonName="New Expenses"
      buttonRouteTo="/expenses/new-expense"
    />

    <!-- ---------------------------------------------- -->
    <!--Income table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="expenses"
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
                    @click="editExpenses(record.id)"
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
