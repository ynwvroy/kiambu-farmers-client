<script setup lang="ts">
import type { TableColumnsType } from "ant-design-vue";

import { TrashIcon } from "vue-tabler-icons";

useHead({
  title: "Events",
  meta: [
    {
      name: "description",
      content:
        "Discover and attend exciting events near you. Stay updated with the latest happenings.",
    },
  ],
});

const {
  getSingleEvent,
  isEditingEvent,
  resetEventFormState,
  deleteSingleEvent,
  eventFormState,
  getAllEvents,
} = useEvents();

const router = useRouter();

const response = await useApi<IGetAllEvents>("/events", {
  method: "GET",
});

eventFormState.value = response?.data;

const columns = ref<TableColumnsType>([
  {
    title: "id",
    dataIndex: "id",
    key: "id",
    resizable: true,
    width: 70,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    resizable: true,
    width: 220,
  },
  {
    title: "About",
    dataIndex: "about",
    key: "about",
    ellipsis: true,
    width: 350,
    resizable: true,
  },
  {
    title: "Organizer email",
    dataIndex: "organizer_email",
    key: "organizer_email",
    ellipsis: true,
    width: 350,
    resizable: true,
  },
  {
    title: "Organizer phone",
    dataIndex: "organizer_phone",
    key: "organizer_phone",
    ellipsis: true,
    width: 350,
    resizable: true,
  },
  {
    title: "Start date",
    dataIndex: "start_date",
    key: "start_date",
    width: 150,
    resizable: true,
  },
  {
    title: "End date",
    dataIndex: "end_date",
    key: "end_date",
    width: 150,
    resizable: true,
  },
  {
    title: "Start time",
    dataIndex: "start_time",
    key: "start_time",
    width: 150,
    resizable: true,
  },
  {
    title: "End time",
    dataIndex: "end_time",
    key: "end_time",
    width: 150,
    resizable: true,
  },
  {
    title: "Event category",
    dataIndex: "event_category_id",
    key: "event_category_id",
    resizable: true,
    width: 250,
  },
  {
    title: "Organization",
    dataIndex: "organization_id",
    key: "organization_id",
    resizable: true,
    width: 250,
  },
  {
    title: "Entry fee",
    dataIndex: "entry_fee",
    key: "entry_fee",
    resizable: true,
    width: 250,
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    resizable: true,
    width: 250,
  },
  {
    title: "Is public",
    dataIndex: "is_public",
    key: "is_public",
    resizable: true,
    width: 150,
  },
  {
    title: "Initial Slots",
    dataIndex: "initial_places_available",
    key: "initial_places_available",
    resizable: true,
    width: 150,
  },
  {
    title: "Places available",
    dataIndex: "places_available",
    key: "places_available",
    resizable: true,
    width: 150,
  },
  {
    title: "Event priced",
    dataIndex: "event_has_price",
    key: "event_has_price",
    resizable: true,
    width: 150,
  },
  {
    title: "Date created",
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

const editEvent = async (event_id: string) => {
  isEditingEvent.value = true;
  const response = await getSingleEvent(event_id);

  router.push(`/events/${response?.slug}`);
};

const openEventForm = () => {
  isEditingEvent.value = false;
  resetEventFormState();
  router.push("/events/new-event");
};

const showDeleteConfirm = async (event_id: number) => {
  Modal.confirm({
    title: "Delete event",
    icon: TrashIcon,
    content: "Are you sure you want to delete this event?",
    okText: "Yes",
    centered: true,
    okType: "danger",
    cancelText: "No",
    async onOk() {
      await deleteSingleEvent(event_id);
      await getAllEvents();
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
    <h1 class="text-h1 py-4">Events</h1>

    <!-- ---------------------------------------------- -->
    <!--Analytics -->
    <!-- ---------------------------------------------- -->
    <v-row class="py-12">
      <v-col cols="12" md="4" xs="12">
        <ModulesEventsUpcomingEvents />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesEventsPastEvents />
      </v-col>
      <v-col cols="12" md="4" xs="12">
        <ModulesEventsTotalEvents />
      </v-col>
      <v-col cols="12">
        <ModulesEventsOverview />
      </v-col>
    </v-row>

    <!-- ---------------------------------------------- -->
    <!--Events table -->
    <!-- ---------------------------------------------- -->
    <v-row>
      <v-col cols="12" md="12">
        <div class="py-7 pt-1">
          <div class="px-3 pb-5">
            <v-btn color="info" @click="openEventForm()">
              <div class="d-flex align-center gap-2">
                <PlusSquareOutlined :size="24" />
                Create Event
              </div>
            </v-btn>
          </div>
          <div>
            <a-table
              :dataSource="eventFormState"
              :columns="columns"
              @resizeColumn="handleResizeColumn"
              :scroll="{ x: 2000 }"
              :expand-column-width="1500"
            >
              <template #bodyCell="{ column, record }">
                <!-- Date created -->
                <template v-if="column.key === 'created_at'">
                  <span>
                    {{ record.created_at.split("T")[0] }}
                  </span>
                </template>

                <!-- Start date -->
                <template v-if="column.key === 'start_date'">
                  <span>
                    {{ record.start_date.split(" ")[0] }}
                  </span>
                </template>

                <!-- End date -->
                <template v-if="column.key === 'end_date'">
                  <span>
                    {{ record.end_date.split(" ")[0] }}
                  </span>
                </template>

                <!-- Start time -->
                <template v-if="column.key === 'start_time'">
                  <span>
                    {{ record.start_time }}
                  </span>
                </template>

                <!-- End time -->
                <template v-if="column.key === 'end_time'">
                  <span>
                    {{ record.end_time }}
                  </span>
                </template>

                <!-- Organization relation -->
                <template v-if="column.key === 'organization_id'">
                  <span
                    v-if="record.organization_id && record.organization_id > 0"
                  >
                    ({{ record.organization.id }})
                    {{ record.organization.name }}
                  </span>
                </template>

                <!-- Category relation -->
                <template v-if="column.key === 'event_category_id'">
                  <span
                    v-if="
                      record.event_category_id && record.event_category_id > 0
                    "
                  >
                    ({{ record.category.id }}) {{ record.category.name }}
                  </span>
                </template>

                <!-- Currency -->
                <template v-if="column.key === 'currency'">
                  <a-tag color="blue">{{ record.currency }}</a-tag>
                </template>

                <!-- Is public -->
                <template v-if="column.key === 'is_public'">
                  <span v-if="record.is_public === 0">
                    <a-tag color="red">PRIVATE</a-tag>
                  </span>
                  <span v-else-if="record.is_public === 1">
                    <a-tag color="green">PUBLIC</a-tag>
                  </span>
                </template>

                <!-- Is priced -->
                <template v-if="column.key === 'event_has_price'">
                  <span v-if="record.event_has_price === 0">
                    <a-tag color="green">Free</a-tag>
                  </span>
                  <span v-else-if="record.event_has_price === 1">
                    <a-tag color="red">Priced</a-tag>
                  </span>
                </template>

                <!-- Email -->
                <template v-if="column.key === 'organizer_email'">
                  <div
                    style="
                      color: blue !important;
                      text-decoration: underline !important;
                    "
                  >
                    {{ record.organizer_email }}
                  </div>
                </template>

                <!-- Phone number -->
                <template v-if="column.key === 'organizer_phone'">
                  <div class="d-flex align-center gap-2">
                    <PhoneOutlined />
                    {{ record.organizer_phone }}
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
                    @click="editEvent(record.id)"
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
