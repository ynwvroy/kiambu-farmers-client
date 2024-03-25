export function useCropHealth() {
  const router = useRouter();
  const userId = useCookie<string | any>("user_id");
  const cropHealth = ref<ICropHealthFormState[]>([]);
  const isEditingCropHealth = ref<boolean>(false);

  /**
   * ---------------------------------------------------
   * Crop Health FormState
   * ---------------------------------------------------
   */
  const cropHealthFormState = useState<ICropHealthFormState>(
    "crop-health",
    () => ({
      crop_id: 0,
      date_recorded: new Date(),
      input_type: "",
      quantity_applied: "",
      application_method: "",
      cost: 0,
      comments: "",
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Crop Health FormState
   * ---------------------------------------------------
   */
  const resetCropHealthFormState = () => {
    cropHealthFormState.value = {
      crop_id: 0,
      date_recorded: new Date(),
      input_type: "",
      quantity_applied: "",
      application_method: "",
      cost: 0,
      comments: "",
    };
  };

  /**
   * ---------------------------------------------------
   * Get all crop health records
   * ---------------------------------------------------
   */
  const getAllCropHealth = async () => {
    try {
      const response = await useApi<ICropHealthFormState[]>(
        `/crop-health/${userId.value}`,
        {
          method: "GET",
        }
      );
      if (response?.success) {
        cropHealth.value = response.data;
        return response.data;
      }
    } catch (error) {
      console.error("Error getAllCropHealth::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new crop health record
   * ---------------------------------------------------
   */
  const createCropHealth = async () => {
    try {
      const response = await useApi<ICreateCropHealthResponse>("/crop-health", {
        method: "POST",
        data: cropHealthFormState.value as ICreateCropHealthRequest,
      });
      if (response?.success) {
        notification.success({
          description: "Crop health record created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        router.push("/crop-health");
        resetCropHealthFormState();
        return response.data;
      } else {
        notification.error({
          description: "Could not create crop health record. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createCropHealth::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update existing crop health record
   * ---------------------------------------------------
   */
  const updateCropHealth = async (
    id: number,
    newData: ICropHealthFormState
  ) => {
    try {
      const response = await useApi(`/crop-health/${id}`, {
        method: "PUT",
        data: newData,
      });
      if (response?.success) {
        notification.success({
          description: "Crop health record updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        // Optionally, you can fetch the updated data or perform other actions here
        return response.data;
      } else {
        notification.error({
          description: "Could not update crop health record. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateCropHealth::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete existing crop health record
   * ---------------------------------------------------
   */
  const deleteCropHealth = async (id: number) => {
    try {
      const response = await useApi(`/crop-health/${id}`, {
        method: "DELETE",
      });
      if (response?.success) {
        notification.success({
          description: "Crop health record deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        // Optionally, you can perform other actions here
      } else {
        notification.error({
          description: "Could not delete crop health record. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteCropHealth::: ", error);
    }
  };

  return {
    cropHealth,
    cropHealthFormState,
    isEditingCropHealth,
    getAllCropHealth,
    createCropHealth,
    updateCropHealth,
    deleteCropHealth,
    resetCropHealthFormState,
  };
}
