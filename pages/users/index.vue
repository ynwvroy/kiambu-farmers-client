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
    title: "Full Name",
    dataIndex: "full_name",
    key: "full_name",
    resizable: true,
    width: 150,
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    resizable: true,
    width: 150,

  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    resizable: true,
    width: 150,

  },
  {
    title: "Phone Number",
    dataIndex: "phone_number",
    key: "phone_number",
    resizable: true,
    width: 150,

  },
  {
    title: "User Type",
    dataIndex: "user_type",
    key: "user_type",
    resizable: true,
    width: 150,

  },
  {
    title: "Date joined",
    dataIndex: "created_at",
    key: "created_at",
    resizable: true,
    width: 150,

  },
  {
    title: "Actions",
    key: "action",
    resizable: true,
    width: 100,

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
    <!-- <h1 class="text-h1 py-4">Users</h1> -->
    <BaseHeader
      title="Users"
      pageCrumbTitle="Dashboard"
      pageName="Users"
      :hasActionButton="true"
      buttonName="New User"
      buttonRouteTo="/users/new-user"
    />
    <!-- ---------------------------------------------- -->
    <!--Users table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
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

                <!-- User type -->
                <template v-if="column.key === 'user_type'">
                  <span v-if="record.user_type === 'user'">
                    <a-tag color="blue"> User </a-tag>
                  </span>
                  <span v-else-if="record.user_type === 'farmer'">
                    <a-tag color="success">Farmer</a-tag>
                  </span>
                  <span v-else-if="record.user_type === 'super_admin'">
                    <a-tag color="cyan">Super Admin</a-tag>
                  </span>
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
