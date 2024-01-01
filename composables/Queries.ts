export function useContactQueries() {
  const router = useRouter();

  const contactQueries = ref<IGetAllContactQueries>();

  const isEditingQuery = useState<boolean>("is-editing-query", () => false);
  /**
   * ---------------------------------------------------
   * Contact Queries  FormState
   * ---------------------------------------------------
   *
   */
  const contactQueriesFormState = useState<IContactQueriesFormState>(
    "contact_queries",
    () => ({
      id: 0,
      name: "",
      email: "",
      description: "",
      topic: null,
      is_resolved: 0,
      created_at: null,
      updated_at: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Contact Queries  FormState
   * ---------------------------------------------------
   *
   */
  const resetContactQueriesFormState = () => {
    contactQueriesFormState.value = {
      id: 0,
      name: "",
      email: "",
      description: "",
      topic: null,
      is_resolved: 0,
      created_at: null,
      updated_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all contactQueries
   * ---------------------------------------------------
   *
   */
  const getAllContactQueries = async () => {
    try {
      const response = await useApi<IGetAllContactQueries>("/contact-queries", {
        method: "GET",
      });

      contactQueriesFormState.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllContactQueries::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new contact_queries
   * ---------------------------------------------------
   *
   */
  const createContactQueries = async () => {
    try {
      const response = await useApi<ICreateContactQueriesResponse>(
        "/contact-queries",
        {
          method: "POST",
          data: contactQueriesFormState.value satisfies ICreateContactQueriesRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description:
            "Your query has been sent successfully. We will get back to you soon via the email provided.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/queries");
        resetContactQueriesFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not send the query. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createContactQueries::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single contact_queries
   * ---------------------------------------------------
   *
   */
  const getSingleContactQueries = async (query_id: string) => {
    try {
      const response = await useApi<IGetSingleContactQueries>(
        `/contact-queries/${query_id}`,
        {
          method: "GET",
        }
      );
      if (response?.success === true) {
        contactQueriesFormState.value = response.data;
      }
    } catch (error) {
      console.error("Error getSingleContactQueries::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single contact_queries
   * ---------------------------------------------------
   *
   */
  const updateSingleContactQueries = async (query_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateContactQueriesResponse>(
        `/contact-queries/${query_id}`,
        {
          method: "PUT",
          data: contactQueriesFormState.value satisfies IUpdateContactQueriesRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Contact query updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/queries");
        resetContactQueriesFormState();
        isEditingQuery.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the contact query. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleContactQueries::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single contact_queries
   * ---------------------------------------------------
   *
   */
  const deleteSingleContactQueries = async (query_id: number) => {
    try {
      const deleteQueryResponse = await useApi<IDeleteContactQueriesResponse>(
        `/contact-queries/${query_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteQueryResponse?.success === true) {
        notification["success"]({
          description: "Contact query deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return deleteQueryResponse.data?.data;
      } else if (deleteQueryResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteQueryResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteQueryResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteQueryResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleContactQueries::: ", error);
    }
  };

  return {
    contactQueries,
    contactQueriesFormState,
    isEditingQuery,
    getAllContactQueries,
    createContactQueries,
    getSingleContactQueries,
    updateSingleContactQueries,
    deleteSingleContactQueries,
    resetContactQueriesFormState,
  };
}
