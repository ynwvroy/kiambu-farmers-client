<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Organizations",
  meta: [
    {
      name: "description",
      content:
        "Explore and discover different organizations. Connect with like-minded groups and entities.",
    },
  ],
});

const router = useRouter();

const {
  isEditingOrganization,
  resetOrganizationFormState,
  getSingleOrganization,
  deleteSingleOrganization,
  getAllOrganizations,
  organizationFormState,
} = useOrganization();

const response = await useApi<IGetAllOrganizations>("/organizations", {
  method: "GET",
});

organizationFormState.value = response?.data;

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
    width: 220,
  },
  {
    title: "Admin",
    dataIndex: "admin_id",
    key: "admin_id",
    resizable: true,
    width: 250,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    width: 350,
  },
  {
    title: "Office location",
    dataIndex: "location",
    key: "location",
    width: 150,
    resizable: true,
  },
  {
    title: "Contact Email",
    dataIndex: "contact_email",
    key: "contact_email",
    resizable: true,
    width: 250,
  },
  {
    title: "Contact Phone Number",
    dataIndex: "contact_phone_number",
    key: "contact_phone_number",
    resizable: true,
    width: 250,
  },
  {
    title: "Date created",
    dataIndex: "created_at",
    key: "created_at",
    resizable: true,
    width: 250,
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

const editOrganization = async (organization_id: string) => {
  isEditingOrganization.value = true;
  const response = await getSingleOrganization(organization_id);
  router.push(`/organizations/${response?.slug}`);
};

const openOrganizationForm = () => {
  isEditingOrganization.value = false;
  resetOrganizationFormState();
  router.push("/organizations/new-organization");
};

const showDeleteConfirm = async (organization_id: number) => {
  Modal.confirm({
    title: "Delete organization",
    icon: TrashIcon,
    content: "Are you sure you want to delete this organization?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleOrganization(organization_id);
      await getAllOrganizations();
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
    <h1 class="text-h1 py-4">Organizations</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="py-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesOrganizationsLeastPopular />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesOrganizationsMostPopular />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesOrganizationsTotal />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--Organizations table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openOrganizationForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Create Organization
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="organizationFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1000"
            >
              <template #bodyCell="{ column, record }">
                <!-- Email -->
                <template v-if="column.key === 'contact_email'">
                  <div
                    style="
                      color: blue !important;
                      text-decoration: underline !important;
                    "
                  >
                    {{ record.contact_email }}
                  </div>
                </template>

                <!-- Date -->
                <template v-if="column.key === 'created_at'">
                  <span>
                    {{ record.created_at.split("T")[0] }}
                  </span>
                </template>

                <!-- User relation -->
                <template v-if="column.key === 'admin_id'">
                  <span v-if="record.admin_id && record.admin_id > 0">
                    ({{ record.user.id }}) {{ record?.user?.full_name }}
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
                    @click="editOrganization(record.id)"
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
