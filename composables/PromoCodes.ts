export function usePromoCodes() {
  const promoCodes = ref<IGetAllPromoCodes>();

  /**
   * ---------------------------------------------------
   * Promo codes FormState
   * ---------------------------------------------------
   *
   */
  const promoCodeFormState = useState<IPromoCodeFormState>(
    "promo-code",
    () => ({
      id: 0,
      amount: 0,
      description: "",
      event_id: 0,
      code: "",
      event: null,
      is_valid: 0,
      valid_until: null,
      type_of_use: "",
      currency: "",
      redemption_count: 0,
      usage_limit_per_person: 0,
      created_at: null,
      updated_at: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Get all promo codes
   * ---------------------------------------------------
   *
   */
  const getAllPromoCodes = async () => {
    try {
      const response = await useApi<IGetAllPromoCodes>("/promo-codes", {
        method: "GET",
      });
      return response?.data;
    } catch (error) {
      console.error("Error getAllPromoCodes::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new promo code
   * ---------------------------------------------------
   *
   */
  const createPromoCode = async () => {
    try {
      const response = await useApi<ICreatePromoCodeResponse>("/promo-codes", {
        method: "POST",
        data: promoCodeFormState.value satisfies ICreatePromoCodeRequest,
      });
      return response?.data;
    } catch (error) {
      console.error("Error createPromoCode::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single promo code
   * ---------------------------------------------------
   *
   */
  const getSinglePromoCode = async (promo_code_id: string) => {
    try {
      const response = await useApi<IGetSinglePromoCode>(
        `/promo-codes/${promo_code_id}`,
        {
          method: "GET",
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error getSinglePromoCode::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single promo code
   * ---------------------------------------------------
   *
   */
  const updateSinglePromoCode = async (promo_code_id: string) => {
    try {
      const response = await useApi<IUpdatePromoCodeResponse>(
        `/promo-codes/${promo_code_id}`,
        {
          method: "PUT",
          data: promoCodeFormState.value satisfies IUpdatePromoCodeRequest,
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error updateSinglePromoCode::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single promo code
   * ---------------------------------------------------
   *
   */
  const deleteSinglePromoCode = async (promo_code_id: string) => {
    try {
      const response = await useApi<IDeletePromoCodeResponse>(
        `/promo-codes/${promo_code_id}`,
        {
          method: "DELETE",
        }
      );
      return response?.data;
    } catch (error) {
      console.error("Error deleteSinglePromoCode::: ", error);
    }
  };

  return {
    promoCodes,
    promoCodeFormState,
    getAllPromoCodes,
    createPromoCode,
    getSinglePromoCode,
    updateSinglePromoCode,
    deleteSinglePromoCode,
  };
}
