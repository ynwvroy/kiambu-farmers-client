<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Events Comments",
  meta: [
    {
      name: "description",
      content:
        "View and engage with comments on various events. Share your thoughts and experiences.",
    },
  ],
});

const router = useRouter();

const {
  isEditingEventsComments,
  resetEventsCommentsFormState,
  getSingleEventsComment,
  getAllEventsComments,
  deleteSingleEventsComment,
  eventsCommentsFormState
} = useEventsComments();

const response = await useApi<IGetAllEventsComments>("/events-comments", {
  method: "GET",
});

eventsCommentsFormState.value = response?.data;

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
    title: "Email",
    dataIndex: "email",
    key: "email",
    resizable: true,
    width: 200,
  },
  {
    title: "Comment",
    dataIndex: "comment",
    key: "comment",
    resizable: true,
    width: 150,
    ellipsis: true,
  },
  {
    title: "Rating",
    dataIndex: "rating",
    key: "rating",
    resizable: true,
    width: 150,
  },
  {
    title: "Event details",
    dataIndex: "event_id",
    key: "event_id",
    resizable: true,
    width: 150,
  },
  {
    title: "Anonymous",
    dataIndex: "is_anonymous",
    key: "is_anonymous",
    resizable: true,
    width: 150,
  },
  {
    title: "Date posted",
    dataIndex: "created_at",
    key: "created_at",
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

const editEventComment = async (comment_id: string) => {
  isEditingEventsComments.value = true;
  const response = await getSingleEventsComment(comment_id);
  router.push(`/events-comments/${response?.id}`);
};

const openEventsCommentsForm = () => {
  isEditingEventsComments.value = false;
  resetEventsCommentsFormState();
  router.push("/events-comments/new-comment");
};

const showDeleteConfirm = async (comment_id: number) => {
  Modal.confirm({
    title: 'Delete event comment',
    icon: TrashIcon,
    content: 'Are you sure you want to delete this comment?',
    okText: 'Yes',
    centered: true,
    okType: 'danger',
    cancelText: 'No',
    async onOk() {
      await deleteSingleEventsComment(comment_id)
      await getAllEventsComments()
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
    <h1 class="text-h1 py-4">Events comments</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="py-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesEventsCommentsAverage />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesEventsCommentsTotal />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--Event comments table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openEventsCommentsForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                New comment
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="eventsCommentsFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
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
                <template v-if="column.key === 'is_anonymous'">
                  <span v-if="record.is_anonymous === 0">
                    <a-tag color="error">Not anonymous</a-tag>
                  </span>
                  <span v-if="record.is_anonymous === 1">
                    <a-tag color="success">Anonymous</a-tag>
                  </span>
                </template>

                <!-- Date -->
                <template v-if="column.key === 'created_at'">
                  <span>
                    {{ record.created_at.split("T")[0] }}
                  </span>
                </template>

                <!-- Event relation -->
                <template v-if="column.key === 'event_id'">
                  <span> ({{ record.event.id }}) {{ record.event.name }} </span>
                </template>

                <!-- Rating -->
                <template v-if="column.key === 'rating'">
                  <v-rating
                    density="compact"
                    color="warning"
                    size="small"
                    readonly
                    v-model="record.rating"
                  ></v-rating>
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
                    @click="editEventComment(record.id)"
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
