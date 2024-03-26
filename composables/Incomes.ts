export function useIncomes() {
  const router = useRouter();


  const userType = useCookie('user_type');
  const userId = useCookie<string | any>('user_id');

  const incomes = ref<IGetAllIncomes>();

  const isEditingIncome = useState<boolean>("is-editing-income", () => false);

  /**
   * ---------------------------------------------------
   * Income FormState
   * ---------------------------------------------------
   *
   */
  const incomeFormState = useState<IIncomeFormState>("incomes", () => ({
    id: 0,
    amount: 0,
    description: "",
    farmer_id: userId.value,
    comments: "",
    created_at: null,
    updated_at: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Income FormState
   * ----------------------s-----------------------------
   *
   */
  const resetIncomeFormState = () => {
    incomeFormState.value = {
      id: 0,
      amount: 0,
      description: "",
      farmer_id: userId.value,
      comments: "",
      created_at: null,
      updated_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all incomes
   * ---------------------------------------------------
   *
   */
  const getAllIncomes = async () => {
    try {
      // const response = await useApi<IGetAllIncomes>("/incomes", {
      //   method: "GET",
      // });
      const url =
      userType.value === 'farmer'
        ? `/incomes/farmer/${userId.value}`
        : '/incomes';
    const response = await useApi<IGetAllIncomes>(url, {
      method: 'GET'
    });

      incomes.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllIncomes::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new income
   * ---------------------------------------------------
   *
   */
  const createIncome = async () => {
    try {
      const response = await useApi<ICreateIncomeResponse>("/incomes", {
        method: "POST",
        data: incomeFormState.value satisfies ICreateIncomeRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Income created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/incomes");
        resetIncomeFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the income. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createIncome::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single income
   * ---------------------------------------------------
   *
   */
  const getSingleIncome = async (income_id: string | number) => {
    try {
      const response = await useApi<IGetSingleIncome>(`/incomes/${income_id}`, {
        method: "GET",
      });

      if (response?.success) {
        incomeFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleIncome::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single income
   * ---------------------------------------------------
   *
   */
  const updateSingleIncome = async (income_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateIncomeResponse>(`/incomes/${income_id}`, {
        method: "PUT",
        data: incomeFormState.value satisfies IUpdateIncomeRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Income updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/incomes");
        resetIncomeFormState();
        isEditingIncome.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the income. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleIncome::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single income
   * ---------------------------------------------------
   *
   */
  const deleteSingleIncome = async (income_id: number) => {
    try {
      const deleteIncomeResponse = await useApi<IDeleteIncomeResponse>(
        `/incomes/${income_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteIncomeResponse?.success === true) {
        notification["success"]({
          description: "Income deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        // await getAllIncomes()
        return deleteIncomeResponse.data?.data;
      } else if (deleteIncomeResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteIncomeResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteIncomeResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteIncomeResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleIncome::: ", error);
    }
  };

  return {
    incomes,
    incomeFormState,
    isEditingIncome,
    getAllIncomes,
    createIncome,
    getSingleIncome,
    updateSingleIncome,
    deleteSingleIncome,
    resetIncomeFormState,
  };
}
