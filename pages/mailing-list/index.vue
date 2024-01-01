<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { MailIcon, TrashIcon } from "vue-tabler-icons";

import { useDisplay } from "vuetify";

useHead({
  title: "Mailing List",
  meta: [
    {
      name: "description",
      content:
        "Subscribe to our mailing list and stay updated with the latest news and announcements.",
    },
  ],
});

const router = useRouter();

const {
  getSingleMailList,
  isEditingMailList,
  deleteSingleMailList,
  getAllMailList,
  mailListFormState,
  resetMailListFormState,
} = useMailList();

const response = await useApi<IGetAllMailList>("/mail-list", {
  method: "GET",
});

mailListFormState.value = response?.data;

const { smAndDown } = useDisplay();

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
    resizable: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    resizable: true,
  },
  {
    title: "Actions",
    key: "action",
    resizable: true,
  },
]);

function handleResizeColumn(w: any, col: any) {
  col.width = w;
}

const editMailList = async (mail_id: string) => {
  isEditingMailList.value = true;
  const response = await getSingleMailList(mail_id);
  router.push(`/mailing-list/${response?.id}`);
};

const openMailForm = () => {
  isEditingMailList.value = false;
  resetMailListFormState();
  router.push("/mailing-list/new-email");
};

const showDeleteConfirm = async (comment_id: number) => {
  Modal.confirm({
    title: "Delete mail",
    icon: TrashIcon,
    content: "Are you sure you want to delete this mail from the mailing list?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleMailList(comment_id);
      await getAllMailList();
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

    <h1 class="text-h1 py-4">Mailing list</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="py-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesMailingListTotalSent />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesMailingListTotalOpened />
      </v-col>
      <v-col cols="12">
        <ModulesMailingListOverview />
      </v-col>
    </v-row>
    <!-- ---------------------------------------------- -->
    <!--Mail list table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openMailForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Add to mail list
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="mailListFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
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
                    @click="editMailList(record.id)"
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
