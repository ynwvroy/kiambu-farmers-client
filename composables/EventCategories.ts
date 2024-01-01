import { notification } from "ant-design-vue";

export function useEventCategories() {
  const eventCategories = ref<IGetAllEventCategories>();

  const isEditingEventCategory = useState<boolean>(
    "is-editing-event-category",
    () => false
  );

  const router = useRouter();

  /**
   * ---------------------------------------------------
   * Event category FormState
   * ---------------------------------------------------
   *
   */
  const eventCategoryFormState = useState<IEventCategoryFormState>(
    "event-category",
    () => ({
      name: "",
      description: "",
      slug: "",
      banner_url: "",
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Event category FormState
   * ---------------------------------------------------
   *
   */
  const resetEventCategoryFormState = () => {
    eventCategoryFormState.value = {
      id: 0,
      name: "",
      description: "",
      slug: "",
      banner_url: "",
      created_at: null,
      updated_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all event categories
   * ---------------------------------------------------
   *
   */
  const getAllEventCategories = async () => {
    try {
      const response = await useApi<IGetAllEventCategories>(
        "/event-categories",
        {
          method: "GET",
        }
      );

      eventCategoryFormState.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllEventCategories::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new event category
   * ---------------------------------------------------
   *
   */
  const createEventCategory = async () => {
    try {
      const response = await useApi<ICreateEventCategoryResponse>(
        "/event-categories",
        {
          method: "POST",
          data: eventCategoryFormState.value satisfies ICreateEventCategoryRequest,
        }
      );

      if (response?.success) {
        notification["success"]({
          description: "Event category created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/event-categories");
        resetEventCategoryFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the event category. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createEventCategory::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single event category
   * ---------------------------------------------------
   *
   */
  const getSingleEventCategory = async (category_id: string) => {
    try {
      const response = await useApi<IGetSingleEventCategory>(
        `/event-categories/${category_id}`,
        {
          method: "GET",
        }
      );

      if (response?.success === true) {
        eventCategoryFormState.value = response.data;
      }

      return response;
    } catch (error) {
      console.error("Error getSingleEventCategory::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single event category
   * ---------------------------------------------------
   *
   */
  const updateSingleEventCategory = async (category_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateEventCategoryResponse>(
        `/event-categories/${category_id}`,
        {
          method: "PUT",
          data: eventCategoryFormState.value satisfies IUpdateEventCategoryRequest,
        }
      );

      if (response?.success) {
        notification["success"]({
          description: "Event category updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/event-categories");
        resetEventCategoryFormState();
        isEditingEventCategory.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the event category. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleEventCategory::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single event category
   * ---------------------------------------------------
   *
   */
  const deleteSingleEventCategory = async (category_id: number) => {
    try {
      const deleteCategoryResponse = await useApi<IDeleteEventCategoryResponse>(
        `/event-categories/${category_id}`,
        {
          method: "DELETE",
        }
      );

      if (deleteCategoryResponse?.success === true) {
        notification["success"]({
          description: "Event category deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return deleteCategoryResponse.data?.data;
      } else if (deleteCategoryResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteCategoryResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteCategoryResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteCategoryResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleEventCategory::: ", error);
    }
  };


  return {
    eventCategories,
    eventCategoryFormState,
    isEditingEventCategory,
    getAllEventCategories,
    createEventCategory,
    getSingleEventCategory,
    updateSingleEventCategory,
    deleteSingleEventCategory,
    resetEventCategoryFormState,
  };
}
