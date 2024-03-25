export function useOrders() {
  const router = useRouter();

  const orders = ref<IGetAllOrders>();

  const userType = useCookie("user_type");

  const userId = useCookie<string | any>("user_id");

  const isEditingOrders = useState<boolean>("is-editing-order", () => false);

  /**
   * ---------------------------------------------------
   * Orders FormState
   * ---------------------------------------------------
   *
   */
  const ordersFormState = useState<IOrdersFormState>("orders", () => ({
    id: 0,
    buyer_id: 0,
    seller_id: 0,
    product_id: 0,
    quantity: 0,
    total_price: 0,
    status: "",
    payment_method: "",
    payment_transaction_id: 0,
    comments: "",
    delivery_address: "",
    tracking_number: 0,
    created_at: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Orders FormState
   * ---------------------------------------------------
   *
   */
  const resetOrdersFormState = () => {
    ordersFormState.value = {
      id: 0,
      buyer_id: 0,
      seller_id: 0,
      product_id: 0,
      quantity: 0,
      total_price: 0,
      status: "",
      payment_method: "",
      payment_transaction_id: 0,
      comments: "",
      delivery_address: "",
      tracking_number: 0,
      created_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all orders
   * ---------------------------------------------------
   *
   */
  const getAllOrders = async () => {
    try {
      const url =
        userType.value === "farmer"
          ? `/orders/seller/${userId.value}`
          : "/orders";

      const response = await useApi<IGetAllOrders>(url, {
        method: "GET",
      });

      orders.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllOrders::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new order
   * ---------------------------------------------------
   *
   */
  const createOrder = async () => {
    try {
      const response = await useApi<ICreateOrdersResponse>("/orders", {
        method: "POST",
        data: ordersFormState.value satisfies ICreateOrdersRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Order created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/orders");
        resetOrdersFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the order. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createOrder::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single orders
   * ---------------------------------------------------
   *
   */
  const getSingleOrder = async (order_id: string | number) => {
    try {
      const response = await useApi<IGetSingleOrders>(`/orders/${order_id}`, {
        method: "GET",
      });

      if (response?.success) {
        ordersFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleOrder::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single orders
   * ---------------------------------------------------
   *
   */
  const updateSingleOrder = async (order_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateOrdersResponse>(
        `/orders/${order_id}`,
        {
          method: "PUT",
          data: ordersFormState.value satisfies IUpdateOrdersRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Order updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/orders");
        resetOrdersFormState();
        isEditingOrders.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the order. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleOrder::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single orders
   * ---------------------------------------------------
   *
   */
  const deleteSingleOrder = async (order_id: number) => {
    try {
      const deleteOrderResponse = await useApi<IDeleteOrdersResponse>(
        `/orders/${order_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteOrderResponse?.success === true) {
        notification["success"]({
          description: "Order deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
        resetOrdersFormState();
      } else if (deleteOrderResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteOrderResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteOrderResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteOrderResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleOrder::: ", error);
    }
  };

  return {
    orders,
    ordersFormState,
    isEditingOrders,
    getAllOrders,
    createOrder,
    getSingleOrder,
    updateSingleOrder,
    deleteSingleOrder,
    resetOrdersFormState,
  };
}
