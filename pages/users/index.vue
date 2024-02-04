<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Users",
  meta: [
    {
      name: "description",
      content:
        "Explore and connect with other users on the platform. Build your network and engage with the community.",
    },
  ],
});

const router = useRouter()

const {
  isEditingUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  resetUsersFormState,
  userFormState,
} = useUsers();

const response = await useApi<IGetAllUsers>("/user", {
  method: "GET",
});

userFormState.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 30,
  },
  {
    title: "Profile",
    dataIndex: "profile_url",
    key: "profile_url",
    resizable: true,
    width: 30,
  },
  {
    title: "Full Name",
    dataIndex: "full_name",
    key: "full_name",
    resizable: true,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    resizable: true,
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    resizable: true,
  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
    resizable: true,
  },
  {
    title: "Organization",
    dataIndex: "organization_id",
    key: "organization_id",
    resizable: true,
  },
  {
    title: "User Type",
    dataIndex: "user_type",
    key: "user_type",
    resizable: true,
  },
  {
    title: "Date joined",
    dataIndex: "created_at",
    key: "created_at",
    resizable: true,
  },
  {
    title: "Contact",
    dataIndex: "write_email",
    key: "write_email",
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

const editUser = async (user_id: string) => {
  isEditingUser.value = true;
  const response = await getSingleUser(user_id);

  router.push(`/users/${response?.username}`);
};

const openUserForm = () => {
  isEditingUser.value = false;
  resetUsersFormState();
  router.push("/users/new-user");
};

const showDeleteConfirm = async (user_id: number) => {
  Modal.confirm({
    title: "Delete user",
    icon: TrashIcon,
    content: "Are you sure you want to delete this user?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleUser(user_id);
      await getAllUsers();
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
    <h1 class="text-h1 py-4">Users</h1>

    <!-- ---------------------------------------------- -->
    <!--Users table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openUserForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Create User
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="userFormState"
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

                <!-- Image -->
                <template v-if="column.key === 'profile_url'">
                  <v-img
                    :src="record.profile_url"
                    style="height: 2rem; width: 2rem"
                  />
                </template>

                <!-- User type -->
                <template v-if="column.key === 'user_type'">
                  <span v-if="record.user_type === 'user'">
                    <a-tag color="red"> User </a-tag>
                  </span>
                  <span v-else-if="record.user_type === 'farmer'">
                    <a-tag color="blue">Organizer</a-tag>
                  </span>
                  <span v-else-if="record.user_type === 'super_admin'">
                    <a-tag color="grey">Super Admin</a-tag>
                  </span>
                </template>

                <!-- Organization relation -->
                <template v-if="column.key === 'organization_id'">
                  <span v-if="record.organization_id !== null">
                    ({{ record.organization.id }})
                    {{ record.organization.name }}
                  </span>
                  <span v-else> NO-ORGANIZATION </span>
                </template>

                <!-- Date -->
                <template v-if="column.key === 'created_at'">
                  <span>
                    {{ record.created_at.split("T")[0] }}
                  </span>
                </template>

                <!-- Phone number -->
                <template v-if="column.key === 'phone_number'">
                  <div class="d-flex align-center gap-2">
                    <PhoneOutlined />
                    {{ record.phone_number }}
                  </div>
                </template>

                <!-- Write email -->
                <template v-if="column.key === 'write_email'">
                  <v-btn color="primary"> Email </v-btn>
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
                    @click="editUser(record.id)"
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
