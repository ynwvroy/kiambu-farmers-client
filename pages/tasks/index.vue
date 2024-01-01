<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Tasks",
  meta: [
    {
      name: "description",
      content:
        "Manage and track your tasks efficiently. Stay organized and achieve your goals with our task management system.",
    },
  ],
});

const {
  isEditingTasks,
  getSingleTask,
  resetTasksFormState,
  tasksFormState,
  deleteSingleTask,
  getAllTasks,
} = useTasks();

const router = useRouter();

const response = await useApi<IGetAllTasks>("/tasks", {
  method: "GET",
});

tasksFormState.value = response?.data;

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
    title: "Team",
    dataIndex: "team_id",
    key: "team_id",
    resizable: true,
    width: 150,
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
    title: "Created by",
    dataIndex: "created_by",
    key: "created_by",
    resizable: true,
    width: 180,
  },
  {
    title: "Assigned to",
    dataIndex: "assignee_id",
    key: "assignee_id",
    resizable: true,
    width: 180,
  },
  {
    title: "Label",
    dataIndex: "label",
    key: "label",
    resizable: true,
    width: 100,
  },
  {
    title: "Priority",
    dataIndex: "priority",
    key: "priority",
    resizable: true,
    width: 100,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    resizable: true,
    width: 100,
  },
  {
    title: "Date created",
    dataIndex: "created_at",
    key: "created_at",
    resizable: true,
    width: 100,
  },
  {
    title: "Comments",
    dataIndex: "comments",
    key: "comments",
    resizable: true,
    ellipsis: true,
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

const editTasks = async (task_id: string) => {
  isEditingTasks.value = true;
  const response = await getSingleTask(task_id);
  router.push(`/tasks/${response?.slug}`);
};

const openTasksForm = () => {
  isEditingTasks.value = false;
  resetTasksFormState();
  router.push("/tasks/new-task");
};

const showDeleteConfirm = async (task_id: number) => {
  Modal.confirm({
    title: "Delete task",
    icon: TrashIcon,
    content: "Are you sure you want to delete this task?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleTask(task_id);
      await getAllTasks();
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
    <h1 class="text-h1 py-4">Tasks</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="py-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesTasksLeastPopular />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesTasksMostPopular />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesTasksTotal />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--Tasks table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openTasksForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Create Task
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="tasksFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Date -->
                <template v-if="column.key === 'created_at'">
                  <span>
                    {{ record.created_at.split("T")[0] }}
                  </span>
                </template>

                <!-- Team relation -->
                <template v-if="column.key === 'team_id'">
                  <span v-if="record.team_id && record.team_id > 0">
                    ({{ record.team.id }}) {{ record?.team?.name }}
                  </span>
                  <span v-else> - </span>
                </template>

                <!-- Created by -->
                <template v-if="column.key === 'created_by'">
                  <v-tag
                    v-if="record.created_by && record.created_by > 0"
                    color="red"
                  >
                    ({{ record.creator.id }}) {{ record?.creator?.full_name }}
                  </v-tag>
                  <span v-else> - </span>
                </template>

                <!-- Assignee -->
                <template v-if="column.key === 'assignee_id'">
                  <span v-if="record.assignee_id && record.assignee_id > 0">
                    ({{ record.assignee.id }}) {{ record?.assignee?.full_name }}
                  </span>
                  <span v-else> - </span>
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
                    @click="editTasks(record.id)"
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
