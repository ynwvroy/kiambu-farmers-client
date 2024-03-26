export function useExpenses() {
  const router = useRouter();

  const userId = useCookie<string | any>("user_id");

  const expenses = ref<IGetAllExpenses>();

  const isEditingExpense = useState<boolean>("is-editing-expense", () => false);

  /**
   * ---------------------------------------------------
   * Expense FormState
   * ---------------------------------------------------
   *
   */
  const expenseFormState = useState<IExpenseFormState>("expenses", () => ({
    id: 0,
    amount: 0,
    description: "",
    comments: "",
    created_at: null,
    updated_at: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Expense FormState
   * ---------------------------------------------------
   *
   */
  const resetExpenseFormState = () => {
    expenseFormState.value = {
      id: 0,
      amount: 0,
      description: "",
      comments: "",
      created_at: null,
      updated_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all expenses
   * ---------------------------------------------------
   *
   */
  const getAllExpenses = async () => {
    try {
      const response = await useApi<IGetAllExpenses>("/expenses", {
        method: "GET",
      });

      expenses.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllExpenses::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new expense
   * ---------------------------------------------------
   *
   */
  const createExpense = async () => {
    try {
      const response = await useApi<ICreateExpenseResponse>("/expenses", {
        method: "POST",
        data: expenseFormState.value satisfies ICreateExpenseRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Expense created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/expenses");
        resetExpenseFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the expense. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createExpense::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single expense
   * ---------------------------------------------------
   *
   */
  const getSingleExpense = async (expense_id: string | number) => {
    try {
      const response = await useApi<IGetSingleExpense>(`/expenses/${expense_id}`, {
        method: "GET",
      });

      if (response?.success) {
        expenseFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleExpense::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single expense
   * ---------------------------------------------------
   *
   */
  const updateSingleExpense = async (expense_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateExpenseResponse>(`/expenses/${expense_id}`, {
        method: "PUT",
        data: expenseFormState.value satisfies IUpdateExpenseRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Expense updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/expenses");
        resetExpenseFormState();
        isEditingExpense.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the expense. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleExpense::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single expense
   * ---------------------------------------------------
   *
   */
  const deleteSingleExpense = async (expense_id: number) => {
    try {
      const deleteExpenseResponse = await useApi<IDeleteExpenseResponse>(
        `/expenses/${expense_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteExpenseResponse?.success === true) {
        notification["success"]({
          description: "Expense deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        // await getAllExpenses()
        return deleteExpenseResponse.data?.data;
      } else if (deleteExpenseResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteExpenseResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteExpenseResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteExpenseResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleExpense::: ", error);
    }
  };

  return {
    expenses,
    expenseFormState,
    isEditingExpense,
    getAllExpenses,
    createExpense,
    getSingleExpense,
    updateSingleExpense,
    deleteSingleExpense,
    resetExpenseFormState,
  };
}
