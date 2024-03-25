export function useLivestockHealth() {
  const router = useRouter();

  const livestockHealth = ref<ILivestockHealth[]>();

  /**
   * ---------------------------------------------------
   * Livestock Health FormState
   * ---------------------------------------------------
   *
   */
  const livestockHealthFormState = useState<ILivestockHealthFormState>('livestockHealth', () => ({
    id: 0,
    livestock_id: 0,
    date_recorded: new Date(),
    description: '',
    treatment: '',
    vaccination: '',
    medication: '',
    comments: '',
  }));

  /**
   * ---------------------------------------------------
   * Reset Livestock Health FormState
   * ---------------------------------------------------
   *
   */
  const resetLivestockHealthFormState = () => {
    livestockHealthFormState.value = {
      id: 0,
      livestock_id: 0,
      date_recorded: new Date(),
      description: '',
      treatment: '',
      vaccination: '',
      medication: '',
      comments: '',
    };
  };

  /**
   * ---------------------------------------------------
   * Get all livestock health records
   * ---------------------------------------------------
   */
  const getAllLivestockHealth = async () => {
    try {
      const response = await useApi<IGetAllLivestockHealth>('/livestock-health', {
        method: 'GET',
      });
      if (response?.success) {
        livestockHealth.value = response.data;
        return response.data;
      } else {
        notification.error({
          description: 'Failed to fetch livestock health records.',
          message: 'Error',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error getAllLivestockHealth::: ', error);
      notification.error({
        description: 'An error occurred while fetching livestock health records. Please try again.',
        message: 'Error',
        placement: 'bottomRight',
        duration: 8,
      });
    }
  };

  /**
   * ---------------------------------------------------
   * Create new livestock health record
   * ---------------------------------------------------
   */
  const createLivestockHealth = async (newData: ILivestockHealthFormState) => {
    try {
      const response = await useApi<ICreateLivestockHealthResponse>('/livestock-health', {
        method: 'POST',
        data: newData,
      });
      if (response?.success) {
        notification.success({
          description: 'Livestock health record created successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });
        router.push('/livestock-health');
        return response.data;
      } else {
        notification.error({
          description: 'Failed to create livestock health record. Please try again.',
          message: 'Error',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error createLivestockHealth::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update existing livestock health record
   * ---------------------------------------------------
   */
  const updateLivestockHealth = async (id: number, newData: ILivestockHealthFormState) => {
    try {
      const response = await useApi<IUpdateLivestockHealthResponse>(`/livestock-health/${id}`, {
        method: 'PUT',
        data: newData,
      });
      if (response?.success) {
        notification.success({
          description: 'Livestock health record updated successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });
        return response.data;
      } else {
        notification.error({
          description: 'Failed to update livestock health record. Please try again.',
          message: 'Error',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error updateLivestockHealth::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete existing livestock health record
   * ---------------------------------------------------
   */
  const deleteLivestockHealth = async (id: number) => {
    try {
      const response = await useApi<IDeleteLivestockHealthResponse>(`/livestock-health/${id}`, {
        method: 'DELETE',
      });
      if (response?.success) {
        notification.success({
          description: 'Livestock health record deleted successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });
        return response.data;
      } else {
        notification.error({
          description: 'Failed to delete livestock health record. Please try again.',
          message: 'Error',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error deleteLivestockHealth::: ', error);
    }
  };


  return {
    livestockHealth,
    livestockHealthFormState,
    getAllLivestockHealth,
    createLivestockHealth,
    updateLivestockHealth,
    deleteLivestockHealth,
    resetLivestockHealthFormState,
  };
}
