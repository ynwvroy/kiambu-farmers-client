<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Teams",
  meta: [
    {
      name: "description",
      content:
        "Explore and discover different teams. Connect with like-minded groups and entities.",
    },
  ],
});

const router = useRouter();

const {
  isEditingTeams,
  resetTeamsFormState,
  getSingleTeam,
  deleteSingleTeam,
  teamsFormState,
  getAllTeams,
} = useTeams();

const response = await useApi<IGetAllTeams>("/teams", {
  method: "GET",
});

teamsFormState.value = response?.data;

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
    title: "Organization",
    dataIndex: "organization_id",
    key: "organization_id",
    resizable: true,
    width: 150,
  },
  {
    title: "Event",
    dataIndex: "event_id",
    key: "event_id",
    resizable: true,
    width: 150,
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
    resizable: true,
    ellipsis: true,
    width: 200,
  },
  {
    title: "Date created",
    dataIndex: "created_at",
    key: "created_at",
    resizable: true,
    width: 100,
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

const editTeam = async (team_id: string) => {
  isEditingTeams.value = true;
  const response = await getSingleTeam(team_id);
  router.push(`/teams/${response?.slug}`);
};

const openTeamsForm = () => {
  isEditingTeams.value = false;
  resetTeamsFormState();
  router.push("/teams/new-team");
};

const showDeleteConfirm = async (team_id: number) => {
  Modal.confirm({
    title: "Delete task",
    icon: TrashIcon,
    content: "Are you sure you want to delete this task?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleTeam(team_id);
      await getAllTeams();
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
    <h1 class="text-h1 py-4">Teams</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="py-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesTeamsLeastPopular />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesTeamsMostPopular />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesTeamsTotal />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--Teams table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openTeamsForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Create Team
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="teamsFormState"
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

                <!-- Organization relation -->
                <template v-if="column.key === 'organization_id'">
                  <span
                    v-if="record.organization_id && record.organization_id > 0"
                  >
                    ({{ record.organization.id }})
                    {{ record?.organization?.name }}
                  </span>
                  <span v-else> - </span>
                </template>

                <!-- Event relation -->
                <template v-if="column.key === 'event_id'">
                  <span v-if="record.event_id && record.event_id > 0">
                    ({{ record.event.id }}) {{ record?.event?.name }}
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
                    @click="editTeam(record.id)"
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
