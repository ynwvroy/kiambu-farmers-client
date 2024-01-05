<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Queries",
  meta: [
    {
      name: "description",
      content:
        "View and manage queries from users. Respond to inquiries and provide support.",
    },
  ],
});

const router = useRouter();

const {
  isEditingQuery,
  getAllContactQueries,
  deleteSingleContactQueries,
  contactQueriesFormState,
  resetContactQueriesFormState,
  getSingleContactQueries,
} = useContactQueries();

const response = await useApi<IGetAllContactQueries>("/contact-queries", {
  method: "GET",
});

contactQueriesFormState.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 100,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    resizable: true,
    width: 200,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    resizable: true,
    width: 300,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    width: 300,

    ellipsis: true,
  },
  {
    title: "Topic",
    dataIndex: "topic",
    key: "topic",
    resizable: true,
    width: 150,
  },
  {
    title: "Resolved",
    dataIndex: "is_resolved",
    key: "is_resolved",
    resizable: true,
    width: 150,
  },
  {
    title: "Date",
    dataIndex: "created_at",
    key: "created_at",
    resizable: true,
    width: 150,
  },
  {
    title: "Reply",
    dataIndex: "reply",
    key: "reply",
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

const editQuery = async (query_id: string) => {
  isEditingQuery.value = true;
  const response = await getSingleContactQueries(query_id);
  router.push(`/queries/${response?.data?.id}`);
};

const openQueryForm = () => {
  isEditingQuery.value = false;
  resetContactQueriesFormState();
  router.push("/queries/new-query");
};

const showDeleteConfirm = async (comment_id: number) => {
  Modal.confirm({
    title: "Delete contact query",
    icon: TrashIcon,
    content: "Are you sure you want to delete this contact query?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleContactQueries(comment_id);
      await getAllContactQueries();
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
    <h1 class="text-h1 py-4">Contact queries</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="py-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesQueriesCommon />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesQueriesPast3Months />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesQueriesPast6Months />
      </v-col>
      <v-col cols="12">
        <ModulesQueriesOverview />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--ProductCategories table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openQueryForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Create New Query
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="contactQueriesFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Banner -->
                <template v-if="column.key === 'banner_url'">
                  <v-img :src="record.banner_url" style="border-radius: 50%" />
                </template>

                <!-- Email -->
                <template v-if="column.key === 'email'">
                  <div
                    style="
                      color: blue !important;
                      text-decoration: underline !important;
                    "
                  >
                    {{ record.email }}
                  </div>
                </template>

                <!-- Resolved -->
                <template v-if="column.key === 'is_resolved'">
                  <span v-if="record.is_resolved === 0">
                    <a-tag color="error">Not Resolved</a-tag>
                  </span>
                  <span v-if="record.is_resolved === 1">
                    <a-tag color="success">Resolved</a-tag>
                  </span>
                </template>

                <!-- Date -->
                <template v-if="column.key === 'created_at'">
                  <span>
                    {{ record.created_at.split("T")[0] }}
                  </span>
                </template>

                <!-- Reply -->
                <template v-if="column.key === 'reply'">
                  <v-btn color="primary">Reply</v-btn>
                </template>

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
                    @click="editQuery(record.id)"
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
