export function useProducts() {
  const router = useRouter();

  const userType = useCookie("user_type");

  const userId = useCookie<string | any>("user_id");

  const products = ref<IGetAllProducts>();

  const isEditingProducts = useState<boolean>(
    "is-editing-product",
    () => false
  );

  /**
   * ---------------------------------------------------
   * Products FormState
   * ---------------------------------------------------
   *
   */
  const productsFormState = useState<IProductsFormState>("products", () => ({
    id: 0,
    name: "",
    description: "",
    stock_quantity: 0,
    units_sold: 0,
    price: 0,
    created_by: null,
    seller_id: null,
    category_id: null,
    created_at: null,
  }));

  /**
   * ---------------------------------------------------
   * Reset Products FormState
   * ---------------------------------------------------
   *
   */
  const resetProductsFormState = () => {
    productsFormState.value = {
      id: 0,
      name: "",
      description: "",
      stock_quantity: 0,
      units_sold: 0,
      price: 0,
      created_by: null,
      seller_id: null,
      category_id: null,
      created_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all products
   * ---------------------------------------------------
   *
   */
  const getAllProducts = async () => {
    try {

      if (userType.value === 'farmer') {

        const response = await useApi<IGetAllProducts>(`/products/seller/${userId.value}`, {
          method: "GET",
        });

      } else if (userType.value === 'super_admin') {

        const response = await useApi<IGetAllProducts>("/products", {
          method: "GET",
        });

      }

      productsFormState.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllProducts::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new product
   * ---------------------------------------------------
   *
   */
  const createProduct = async () => {
    try {
      const response = await useApi<ICreateProductsResponse>("/products", {
        method: "POST",
        data: productsFormState.value satisfies ICreateProductsRequest,
      });
      if (response?.success) {
        notification["success"]({
          description: "Product created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/products");
        resetProductsFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the product. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createProduct::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single products
   * ---------------------------------------------------
   *
   */
  const getSingleProduct = async (product_id: string | number) => {
    try {
      const response = await useApi<IGetSingleProducts>(
        `/products/${product_id}`,
        {
          method: "GET",
        }
      );

      if (response?.success) {
        productsFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleProduct::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single products
   * ---------------------------------------------------
   *
   */
  const updateSingleProduct = async (product_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateProductsResponse>(
        `/products/${product_id}`,
        {
          method: "PUT",
          data: productsFormState.value satisfies IUpdateProductsRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Product updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/products");
        resetProductsFormState();
        isEditingProducts.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the product. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleProduct::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single products
   * ---------------------------------------------------
   *
   */
  const deleteSingleProduct = async (product_id: number) => {
    try {
      const deleteProductResponse = await useApi<IDeleteProductsResponse>(
        `/products/${product_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteProductResponse?.success === true) {
        notification["success"]({
          description: "Product deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return deleteProductResponse.data?.data;
      } else if (deleteProductResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteProductResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (
        deleteProductResponse.data?.code === "ER_ROW_IS_REFERENCED_2"
      ) {
        notification["warning"]({
          description: deleteProductResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleProduct::: ", error);
    }
  };

  return {
    products,
    productsFormState,
    isEditingProducts,
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
    resetProductsFormState,
  };
}
