<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import {
  BrandLinkedinIcon,
  ClipboardTextIcon,
  TrashIcon,
} from "vue-tabler-icons";

useHead({
  title: "Career Applications",
  meta: [
    {
      name: "description",
      content:
        "Explore and apply for exciting career opportunities at our company. Join us and be a part of our amazing order!",
    },
    {
      name: "keywords",
      content: "career, jobs, employment, applications, opportunities",
    },
    {
      property: "og:title",
      content: "Career Applications - Kiambu Farmers",
    },
    {
      property: "og:description",
      content:
        "Explore and apply for exciting career opportunities at our company. Join us and be a part of our amazing order!",
    },
    {
      property: "og:image",
      content: "https://kiambu-farmers.com/career-applications-image.jpg",
    },
    {
      property: "og:url",
      content: "https://kiambu-farmers.com/career-applications",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Career Applications - Kiambu Farmers",
    },
    {
      name: "twitter:description",
      content:
        "Explore and apply for exciting career opportunities at our company. Join us and be a part of our amazing order!",
    },
    {
      name: "twitter:image",
      content: "https://kiambu-farmers.com/career-applications-image.jpg",
    },
  ],
});

const {
  getSingleCareerApplication,
  isEditingCareerApplication,
  resetCareerApplicationFormState,
  deleteSingleCareerApplication,
  getAllCareerApplications,
  careerApplicationFormState,
} = useCareerApplications();

const router = useRouter();

const response = await useApi<IGetAllCareerApplications>(
  "/career-application",
  {
    method: "GET",
  }
);

careerApplicationFormState.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 100,
  },
  {
    title: "Full name",
    dataIndex: "full_name",
    key: "full_name",
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
    title: "Phone number",
    dataIndex: "phone_number",
    key: "phone_number",
    resizable: true,
    width: 300,

    ellipsis: true,
  },
  {
    title: "Role applied",
    dataIndex: "role_application",
    key: "role_application",
    resizable: true,
    width: 150,
  },
  {
    title: "LinkedIn",
    dataIndex: "linkedin_url",
    key: "linkedin_url",
    resizable: true,
    width: 150,
  },
  {
    title: "Resume",
    dataIndex: "resume_url",
    key: "resume_url",
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
    title: "Response status",
    dataIndex: "response_status",
    key: "response_status",
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
    title: "Review",
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

const editCareerApplication = async (application_id: string) => {
  isEditingCareerApplication.value = true;
  const response = await getSingleCareerApplication(application_id);
  router.push(`/career-applications/${response?.id}`);
};

const showDeleteConfirm = async (application_id: number) => {
  Modal.confirm({
    title: "Delete product category",
    icon: TrashIcon,
    content: "Are you sure you want to delete this category?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleCareerApplication(application_id);
      await getAllCareerApplications();
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
    <h1 class="text-h1 py-4">Career applications</h1>
    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="pt-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesCareersLeastPopular />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesCareersMostPopular />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesCareersTotal />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--CareerApplication table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div>
            <a-table
              :dataSource="careerApplicationFormState"
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

                <!-- LinkedIn -->
                <template v-if="column.key === 'linkedin_url'">
                  <NuxtLink :to="record.linkedin_url" target="_blank">
                    <BrandLinkedinIcon size="30" color="primary" />
                  </NuxtLink>
                </template>

                <!-- Resume -->
                <template v-if="column.key === 'resume_url'">
                  <NuxtLink :to="record.resume_url" target="_blank">
                    <ClipboardTextIcon size="30" color="primary" />
                  </NuxtLink>
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
                    color="red"
                    style="cursor: pointer"
                    @click="showDeleteConfirm(record.id)"
                  />
                  <a-divider type="vertical" />
                  <EditIcon
                    size="18"
                    color="blue"
                    @click="editCareerApplication(record.id)"
                    style="cursor: pointer"
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
