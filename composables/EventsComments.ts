export function useEventsComments() {
  const router = useRouter();

  const eventsComments = ref<IGetAllEventsComments>();

  const isEditingEventsComments = useState<boolean>(
    "is-editing-event-comment",
    () => false
  );

  /**
   * ---------------------------------------------------
   * Events Comments FormState
   * ---------------------------------------------------
   *
   */
  const eventsCommentsFormState = useState<IEventsCommentsFormState>(
    "events-comment",
    () => ({
      id: 0,
      name: "",
      email: "",
      comment: "",
      rating: 0,
      event_id: 0,
      is_anonymous: 0,
      created_at: null,
      updated_at: null,
      event: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Events Comments FormState
   * ---------------------------------------------------
   *
   */
  const resetEventsCommentsFormState = () => {
    eventsCommentsFormState.value = {
      id: 0,
      name: "",
      email: "",
      comment: "",
      rating: 0,
      event_id: 0,
      is_anonymous: 0,
      created_at: null,
      updated_at: null,
      event: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all events comments
   * ---------------------------------------------------
   *
   */
  const getAllEventsComments = async () => {
    try {
      const response = await useApi<IGetAllEventsComments>("/events-comments", {
        method: "GET",
      });

      eventsCommentsFormState.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllEventsComments::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new event comment
   * ---------------------------------------------------
   *
   */
  const createEventsComment = async () => {
    try {
      const response = await useApi<ICreateEventsCommentResponse>(
        "/events-comments",
        {
          method: "POST",
          data: eventsCommentsFormState.value satisfies ICreateEventsCommentRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Event's comment created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/events-comments");
        resetEventsCommentsFormState();
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not create the event's comment. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createEventsComment::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single event comment
   * ---------------------------------------------------
   *
   */
  const getSingleEventsComment = async (event_comment_id: string) => {
    try {
      const response = await useApi<IGetSingleEventsComment>(
        `/events-comments/${event_comment_id}`,
        {
          method: "GET",
        }
      );

      if (response?.success === true) {
        eventsCommentsFormState.value = response.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleEventsComment::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single event comment
   * ---------------------------------------------------
   *
   */
  const updateSingleEventsComment = async (event_comment_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateEventsCommentResponse>(
        `/events-comments/${event_comment_id}`,
        {
          method: "PUT",
          data: eventsCommentsFormState.value satisfies IUpdateEventsCommentRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Event comment updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/events-comments");
        resetEventsCommentsFormState();
        isEditingEventsComments.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not update the event comment. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleEventsComment::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single event comment
   * ---------------------------------------------------
   *
   */
  const deleteSingleEventsComment = async (event_comment_id: number) => {
    try {
      const response = await useApi<IDeleteEventsCommentResponse>(
        `/events-comments/${event_comment_id}`,
        {
          method: "DELETE",
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Event comment deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not delete the event comment. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleEventsComment::: ", error);
    }
  };

  return {
    eventsComments,
    eventsCommentsFormState,
    isEditingEventsComments,
    getAllEventsComments,
    createEventsComment,
    getSingleEventsComment,
    updateSingleEventsComment,
    deleteSingleEventsComment,
    resetEventsCommentsFormState,
  };
}
