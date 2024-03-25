export function useLivestockProduction() {
  const livestockProductions = ref<IGetAllLivestockProduction>();

  /**
   * ---------------------------------------------------
   * Livestock Production FormState
   * ---------------------------------------------------
   */
  const livestockProductionFormState = useState<ILivestockProductionFormState>("livestockProduction", () => ({
    livestock_id: null,
    date_recorded: null,
    production_type: "",
    quantity: 0,
    market_price: 0,
    profit_total: "",
    comments: "",
  }));

  /**
   * ---------------------------------------------------
   * Reset Livestock Production FormState
   * ---------------------------------------------------
   */
  const resetLivestockProductionFormState = () => {
    livestockProductionFormState.value = {
      livestock_id: null,
      date_recorded: null,
      production_type: "",
      quantity: 0,
      market_price: 0,
      profit_total: "",
      comments: "",
    };
  };

  /**
   * ---------------------------------------------------
   * Get all livestock productions
   * ---------------------------------------------------
   */
  const getAllLivestockProductions = async () => {
    try {
      const response = await useApi<IGetAllLivestockProductions>('/livestock-productions', {
        method: 'GET',
      });
      livestockProductions.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error('Error getAllLivestockProductions::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new livestock production
   * ---------------------------------------------------
   */
  const createLivestockProduction = async () => {
    try {
      const response = await useApi<ICreateLivestockProductionResponse>('/livestock-productions', {
        method: 'POST',
        data: livestockProductionFormState.value satisfies ICreateLivestockProductionRequest,
      });
      if (response?.success) {
        notification.success({
          description: 'Livestock production record created successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });
        resetLivestockProductionFormState();
        return response?.data;
      } else {
        notification.error({
          description: 'Failed to create livestock production record. Please try again.',
          message: 'Error',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error createLivestockProduction::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update existing livestock production record
   * ---------------------------------------------------
   */
  const updateLivestockProduction = async (id: number, newData: ILivestockProductionFormState) => {
    try {
      const response = await useApi<IUpdateLivestockProductionResponse>(`/livestock-productions/${id}`, {
        method: 'PUT',
        data: newData,
      });
      if (response?.success) {
        notification.success({
          description: 'Livestock production record updated successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });
        return response?.data;
      } else {
        notification.error({
          description: 'Failed to update livestock production record. Please try again.',
          message: 'Error',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error updateLivestockProduction::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete existing livestock production record
   * ---------------------------------------------------
   */
  const deleteLivestockProduction = async (id: number) => {
    try {
      const response = await useApi<IDeleteLivestockProductionResponse>(`/livestock-productions/${id}`, {
        method: 'DELETE',
      });
      if (response?.success) {
        notification.success({
          description: 'Livestock production record deleted successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });
        return response?.data;
      } else {
        notification.error({
          description: 'Failed to delete livestock production record. Please try again.',
          message: 'Error',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error deleteLivestockProduction::: ', error);
    }
  };

  return {
    livestockProductions,
    livestockProductionFormState,
    resetLivestockProductionFormState,
    getAllLivestockProductions,
    createLivestockProduction,
    updateLivestockProduction,
    deleteLivestockProduction,
  };
}
