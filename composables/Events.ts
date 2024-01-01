export function useEvents() {
  const events = ref<IGetAllEvents>();

  const router = useRouter();

  const isEditingEvent = useState<boolean>("is-editing-event", () => false);
  /**
   * ---------------------------------------------------
   * Events  FormState
   * ---------------------------------------------------
   *
   */
  const eventFormState = useState<IEventFormState>("event", () => ({
    id: 0,
    name: "",
    about: "",
    description: "",
    slug: "",
    organizer_email: "",
    organizer_phone: "",
    ticket_types: "",
    additional_images: "",
    start_date: null,
    start_time: "",
    end_date: null,
    end_time: "",
    number_of_days: 0,
    event_category_id: 0,
    organization_id: 0,
    event_qr_code: "",
    event_link: "",
    ticket_qr_code: "",
    event_has_price: 0,
    event_has_promo_codes: 0,
    event_has_tickets: 0,
    entry_fee: "",
    location: "",
    maps_direction_pin: "",
    banner_url: "",
    initial_places_available: "",
    places_available: "",
    is_public: 0,
    created_at: null,
    updated_at: null,
    category: null,
    organization: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset event  FormState
   * ---------------------------------------------------
   *
   */
  const resetEventFormState = () => {
    eventFormState.value = {
      id: 0,
      name: "",
      about: "",
      description: "",
      slug: "",
      organizer_email: "",
      organizer_phone: "",
      ticket_types: "",
      additional_images: "",
      start_date: null,
      start_time: "",
      end_date: null,
      end_time: "",
      number_of_days: 0,
      event_category_id: 0,
      organization_id: 0,
      event_qr_code: "",
      event_link: "",
      ticket_qr_code: "",
      event_has_price: 0,
      event_has_promo_codes: 0,
      event_has_tickets: 0,
      entry_fee: "",
      location: "",
      maps_direction_pin: "",
      banner_url: "",
      initial_places_available: "",
      places_available: "",
      is_public: 0,
      created_at: null,
      updated_at: null,
      category: null,
      organization: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all events
   * ---------------------------------------------------
   *
   */
  const getAllEvents = async () => {
    try {
      const response = await useApi<IGetAllEvents>("/events", {
        method: "GET",
      });

      eventFormState.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllEvents::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new event
   * ---------------------------------------------------
   *
   */
  const createNewEvent = async () => {
    try {
      const response = await useApi<ICreateEventResponse>("/events", {
        method: "POST",
        data: eventFormState.value satisfies ICreateEventRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Event created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/events");
        resetEventFormState();
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not create the event. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createNewEvent::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single event
   * ---------------------------------------------------
   *
   */
  const getSingleEvent = async (event_id: string) => {
    try {
      const response = await useApi<IGetSingleEvent>(`/events/${event_id}`, {
        method: "GET",
      });
      if (response?.success === true) {
        eventFormState.value = response.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleEvent::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single event
   * ---------------------------------------------------
   *
   */
  const updateSingleEvent = async (event_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateEventResponse>(
        `/events/${event_id}`,
        {
          method: "PUT",
          data: eventFormState.value satisfies IUpdateEventRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Event updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/events");
        resetEventFormState();
        isEditingEvent.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not update the event. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleEvent::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single event
   * ---------------------------------------------------
   *
   */
  const deleteSingleEvent = async (event_id: number) => {
    try {
      const deleteEventResponse = await useApi<IDeleteEventResponse>(
        `/events/${event_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteEventResponse?.success === true) {
        notification["success"]({
          description: "Event deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        resetEventFormState()
      } else if (deleteEventResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteEventResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteEventResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteEventResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleEvent::: ", error);
    }
  };

  return {
    events,
    eventFormState,
    isEditingEvent,
    getAllEvents,
    getSingleEvent,
    createNewEvent,
    updateSingleEvent,
    deleteSingleEvent,
    resetEventFormState,
  };
}
