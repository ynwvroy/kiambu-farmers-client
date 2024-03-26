export function useLivestock() {
  const router = useRouter();

  const userType = useCookie("user_type");

  const userId = useCookie<string | any>("user_id");

  const livestock = ref<IGetAllLivestock>();

  const isEditingLivestock = useState<boolean>(
    "is-editing-livestock",
    () => false
  );

  /**
   * ---------------------------------------------------
   * Livestock FormState
   * ---------------------------------------------------
   *
   */
  const livestockFormState = useState<ILivestockFormState>("livestock", () => ({
    name: "",
    type: "",
    breed: "",
    date_of_birth: null,
    farmer_id: userId.value,
    sex: false,
    color: "",
    status: "",
    created_at: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Livestock FormState
   * ---------------------------------------------------
   *
   */
  const resetLivestockFormState = () => {
    livestockFormState.value = {
      id: 0,
      name: "",
      type: "",
      breed: "",
      date_of_birth: "",
      farmer_id: userId.value,
      sex: false,
      color: "",
      status: "",
      created_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all livestock
   * ---------------------------------------------------
   *
   */
  const getAllLivestock = async () => {
    try {
      const url =
        userType.value === "farmer"
          ? `/livestock/farmer/${userId.value}`
          : "/livestock";
      const response = await useApi<IGetAllLivestock>(url, {
        method: "GET",
      });

      livestock.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllLivestock::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new livestock
   * ---------------------------------------------------
   *
   */
  const createLivestock = async () => {
    try {
      const response = await useApi<ICreateLivestockResponse>("/livestock", {
        method: "POST",
        data: livestockFormState.value satisfies ICreateLivestockRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Livestock created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/livestock");
        resetLivestockFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the livestock. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createLivestock::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single livestock
   * ---------------------------------------------------
   *
   */
  const getSingleLivestock = async (livestock_id: string | number) => {
    try {
      const response = await useApi<IGetSingleLivestock>(
        `/livestock/${livestock_id}`,
        {
          method: "GET",
        }
      );

      if (response?.success) {
        livestockFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleLivestock::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single livestock
   * ---------------------------------------------------
   *
   */
  const updateSingleLivestock = async (livestock_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateLivestockResponse>(
        `/livestock/${livestock_id}`,
        {
          method: "PUT",
          data: livestockFormState.value satisfies IUpdateLivestockRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Livestock updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/livestock");
        resetLivestockFormState();
        isEditingLivestock.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the livestock. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleLivestock::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single livestock
   * ---------------------------------------------------
   *
   */
  const deleteSingleLivestock = async (livestock_id: number) => {
    try {
      const deleteLivestockResponse = await useApi<IDeleteLivestockResponse>(
        `/livestock/${livestock_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteLivestockResponse?.success === true) {
        notification["success"]({
          description: "Livestock deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        return deleteLivestockResponse.data?.data;
      } else if (deleteLivestockResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteLivestockResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (
        deleteLivestockResponse.data?.code === "ER_ROW_IS_REFERENCED_2"
      ) {
        notification["warning"]({
          description: deleteLivestockResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleLivestock::: ", error);
    }
  };

  return {
    livestock,
    livestockFormState,
    isEditingLivestock,
    getAllLivestock,
    createLivestock,
    getSingleLivestock,
    updateSingleLivestock,
    deleteSingleLivestock,
    resetLivestockFormState,
  };
}
