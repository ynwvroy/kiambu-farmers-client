export function useMailList() {

  const router = useRouter();

  const mailList = ref<IGetAllMailList>();

  const isEditingMailList = useState<boolean>(
    "is-editing-mail-list",
    () => false
  );

  /**
   * ---------------------------------------------------
   * Mail list FormState
   * ---------------------------------------------------
   *
   */
  const mailListFormState = useState<IMailListFormState>("mail-list", () => ({
    id: 0,
    type: "",
    email: "",
    created_at: null,
    updated_at: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Mail list FormState
   * ---------------------------------------------------
   *
   */
  const resetMailListFormState = () => {
    mailListFormState.value = {
      id: 0,
      type: "",
      email: "",
      created_at: null,
      updated_at: null,
    }
  }

  /**
   * ---------------------------------------------------
   * Get all mail list
   * ---------------------------------------------------
   *
   */
  const getAllMailList = async () => {
    try {
      const response = await useApi<IGetAllMailList>("/mail-list", {
        method: "GET",
      });

      mailListFormState.value = response?.data
      return response?.data;
    } catch (error) {
      console.error("Error getAllMailList::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new mail list
   * ---------------------------------------------------
   *
   */
  const createMailList = async () => {
    try {
      const response = await useApi<ICreateMailListResponse>("/mail-list", {
        method: "POST",
        data: mailListFormState.value satisfies ICreateMailListRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Your email has been added to our mailing list.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        resetMailListFormState()
        router.push('/mailing-list')
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not add the email to mailing list. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createMailList::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single mail list
   * ---------------------------------------------------
   *
   */
  const getSingleMailList = async (mail_id: string) => {
    try {
      const response = await useApi<IGetSingleMailList>(
        `/mail-list/${mail_id}`,
        {
          method: "GET",
        }
      );

      if (response?.success === true) {
        mailListFormState.value = response?.data;
        return response?.data
      }
    } catch (error) {
      console.error("Error getSingleMailList::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single mail list
   * ---------------------------------------------------
   *
   */
  const updateSingleMailList = async (mail_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateMailListResponse>(
        `/mail-list/${mail_id}`,
        {
          method: "PUT",
          data: mailListFormState.value satisfies IUpdateMailListRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Mailing list updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/mailing-list");
        resetMailListFormState()
        isEditingMailList.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the mailing list. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleMailList::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single mail list
   * ---------------------------------------------------
   *
   */
  const deleteSingleMailList = async (mail_id: number) => {
    try {
      const deleteMailResponse = await useApi<IDeleteMailListResponse>(
        `/mail-list/${mail_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteMailResponse?.success === true) {
        notification["success"]({
          description: "Email deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return deleteMailResponse.data?.data;
      } else if (deleteMailResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteMailResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteMailResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteMailResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleMailList::: ", error);
    }
  };

  return {
    mailList,
    mailListFormState,
    isEditingMailList,
    getAllMailList,
    createMailList,
    getSingleMailList,
    updateSingleMailList,
    deleteSingleMailList,
    resetMailListFormState
  };
}
