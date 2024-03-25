export function useSales() {
  const router = useRouter();

  const userType = useCookie("user_type");

  const userId = useCookie<string | any>("user_id");

  const sales = ref<IGetAllSales>();

  const isEditingSales = useState<boolean>("is-editing-sale", () => false);

  /**
   * ---------------------------------------------------
   * Sales FormState
   * ---------------------------------------------------
   *
   */
  const salesFormState = useState<ISalesFormState>("sales", () => ({
    id: 0,
    payment_transaction_id: null,
    payment_method: null,
    date: null,
    comments: "",
    total_amount: 0,
    farmer_id: null,
    product_id: null,
    units_sold: 0,
    payment_received_date: null,
    payment_status: "",
    created_at: null,
    updated_at: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Sales FormState
   * ---------------------------------------------------
   *
   */
  const resetSalesFormState = () => {
    salesFormState.value = {
      id: 0,
      payment_transaction_id: null,
      payment_method: null,
      date: null,
      comments: "",
      total_amount: 0,
      farmer_id: null,
      product_id: null,
      units_sold: 0,
      payment_received_date: null,
      payment_status: "",
      created_at: null,
      updated_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all sales
   * ---------------------------------------------------
   *
   */
  const getAllSales = async () => {
    try {
      const url = userType.value === "farmer" ? `/sales/seller/${userId.value}` : "/sales";

      const response = await useApi<IGetAllSales>(url, {
        method: "GET",
      });

      salesFormState.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllSales::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new sale
   * ---------------------------------------------------
   *
   */
  const createSale = async () => {
    try {
      const response = await useApi<ICreateSalesResponse>("/sales", {
        method: "POST",
        data: salesFormState.value satisfies ICreateSalesRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Sale created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/sales");
        resetSalesFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the sale. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createSale::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single sales
   * ---------------------------------------------------
   *
   */
  const getSingleSale = async (sale_id: string | number) => {
    try {
      const response = await useApi<IGetSingleSales>(`/sales/${sale_id}`, {
        method: "GET",
      });

      if (response?.success) {
        salesFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleSale::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single sales
   * ---------------------------------------------------
   *
   */
  const updateSingleSale = async (sale_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateSalesResponse>(`/sales/${sale_id}`, {
        method: "PUT",
        data: salesFormState.value satisfies IUpdateSalesRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Sale updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/sales");
        resetSalesFormState();
        isEditingSales.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the sale. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleSale::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single sales
   * ---------------------------------------------------
   *
   */
  const deleteSingleSale = async (sale_id: number) => {
    try {
      const deleteSaleResponse = await useApi<IDeleteSalesResponse>(
        `/sales/${sale_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteSaleResponse?.success === true) {
        notification["success"]({
          description: "Sale deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        // await getAllSales()
        return deleteSaleResponse.data?.data;
      } else if (deleteSaleResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteSaleResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteSaleResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteSaleResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleSale::: ", error);
    }
  };

  return {
    sales,
    salesFormState,
    isEditingSales,
    getAllSales,
    createSale,
    getSingleSale,
    updateSingleSale,
    deleteSingleSale,
    resetSalesFormState,
  };
}
