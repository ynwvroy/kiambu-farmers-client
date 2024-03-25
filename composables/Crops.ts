export function useCrops() {
  const router = useRouter();

  const userType = useCookie('user_type');
  const userId = useCookie<string | any>('user_id');

  const crops = ref<IGetAllCrops>();

  const isEditingCrops = ref<boolean>(false);

  /**
   * ---------------------------------------------------
   * Crops FormState
   * ---------------------------------------------------
   *
   */
  const cropsFormState = useState<ICropFormState>("crops", () => ({
    id: 0,
    name: '',
    variety: '',
    planted_date: new Date(),
    harvest_date: new Date(),
    actual_yield: 0,
    amount_profit: '',
    comments: ''
  }));

  /**
   * ---------------------------------------------------
   * Reset Crops FormState
   * ---------------------------------------------------
   *
   */
  const resetCropsFormState = () => {
    cropsFormState.value = {
      id: 0,
      name: '',
      variety: '',
      planted_date: new Date(),
      harvest_date: new Date(),
      actual_yield: 0,
      amount_profit: '',
      comments: ''
    };
  };

  /**
   * ---------------------------------------------------
   * Get all crops
   * ---------------------------------------------------
   *
   */
  const getAllCrops = async () => {
    try {
      const url =
        userType.value === 'farmer'
          ? `/crops/seller/${userId.value}`
          : '/crops';
      const response = await useApi<IGetAllCrops>(url, {
        method: 'GET'
      });

      crops.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error('Error getAllCrops::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new crop
   * ---------------------------------------------------
   *
   */
  const createCrop = async () => {
    try {
      const response = await useApi<ICreateCropResponse>('/crops', {
        method: 'POST',
        data: cropsFormState.value as ICreateCropRequest
      });
      if (response?.success) {
        notification.success({
          description: 'Crop created successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });

        router.push('/crops');
        resetCropsFormState();
        return response?.data;
      } else {
        notification.error({
          description: 'Could not create the crop. Please try again.',
          message: 'Failed',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error createCrop::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single crop
   * ---------------------------------------------------
   *
   */
  const getSingleCrop = async (crop_id: string | number) => {
    try {
      const response = await useApi<IGetSingleCrop>(
        `/crops/${crop_id}`,
        {
          method: 'GET',
        }
      );

      if (response?.success) {
        cropsFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error('Error getSingleCrop::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single crop
   * ---------------------------------------------------
   *
   */
  const updateSingleCrop = async (crop_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateCropResponse>(
        `/crops/${crop_id}`,
        {
          method: 'PUT',
          data: cropsFormState.value as IUpdateCropRequest,
        }
      );
      if (response?.success) {
        notification.success({
          description: 'Crop updated successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });

        router.push('/crops');
        resetCropsFormState();
        isEditingCrops.value = false;
        return response?.data;
      } else {
        notification.error({
          description: 'Could not update the crop. Please try again.',
          message: 'Failed',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error updateSingleCrop::: ', error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single crop
   * ---------------------------------------------------
   *
   */
  const deleteSingleCrop = async (crop_id: number) => {
    try {
      const deleteCropResponse = await useApi<IDeleteCropsResponse>(
        `/crops/${crop_id}`,
        {
          method: 'DELETE',
        }
      );
      if (deleteCropResponse?.success === true) {
        notification.success({
          description: 'Crop deleted successfully.',
          message: 'Success',
          placement: 'bottomRight',
          duration: 8,
        });

        return deleteCropResponse.data?.data;
      } else if (deleteCropResponse.data?.code === 'E_ROW_NOT_FOUND') {
        notification.warning({
          description: deleteCropResponse.data?.message,
          message: 'Failed',
          placement: 'bottomRight',
          duration: 8,
        });
      } else if (
        deleteCropResponse.data?.code === 'ER_ROW_IS_REFERENCED_2'
      ) {
        notification.warning({
          description: deleteCropResponse.data?.message,
          message: 'Failed',
          placement: 'bottomRight',
          duration: 8,
        });
      }
    } catch (error) {
      console.error('Error deleteSingleCrop::: ', error);
    }
  };

  return {
    crops,
    cropsFormState,
    isEditingCrops,
    getAllCrops,
    createCrop,
    getSingleCrop,
    updateSingleCrop,
    deleteSingleCrop,
    resetCropsFormState,
  };
}
