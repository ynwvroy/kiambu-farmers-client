import { notification } from "ant-design-vue";

export function useProductCategories() {
  const productCategories = ref<IGetAllProductCategories>();

  const isEditingProductCategory = useState<boolean>(
    "is-editing-event-category",
    () => false
  );

  const router = useRouter();

  /**
   * ---------------------------------------------------
   * Product category FormState
   * ---------------------------------------------------
   *
   */
  const ProductCategoryFormState = useState<IProductCategoryFormState>(
    "event-category",
    () => ({
      name: "",
      description: "",
      slug: "",
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Product category FormState
   * ---------------------------------------------------
   *
   */
  const resetProductCategoryFormState = () => {
    ProductCategoryFormState.value = {
      id: 0,
      name: "",
      description: "",
      slug: "",
      created_at: null,
      updated_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all event categories
   * ---------------------------------------------------
   *
   */
  const getAllProductCategories = async () => {
    try {
      const response = await useApi<IGetAllProductCategories>(
        "/product-categories",
        {
          method: "GET",
        }
      );

      ProductCategoryFormState.value = response?.data;
      return response?.data;
    } catch (error) {
      console.error("Error getAllProductCategories::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new product category
   * ---------------------------------------------------
   *
   */
  const createProductCategory = async () => {
    try {
      const response = await useApi<ICreateProductCategoryResponse>(
        "/product-categories",
        {
          method: "POST",
          data: ProductCategoryFormState.value satisfies ICreateProductCategoryRequest,
        }
      );

      if (response?.success) {
        notification["success"]({
          description: "Product category created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/product-categories");
        resetProductCategoryFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the product category. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createProductCategory::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single product category
   * ---------------------------------------------------
   *
   */
  const getSingleProductCategory = async (category_id: string) => {
    try {
      const response = await useApi<IGetSingleProductCategory>(
        `/product-categories/${category_id}`,
        {
          method: "GET",
        }
      );

      if (response?.success === true) {
        ProductCategoryFormState.value = response.data;
      }

      return response;
    } catch (error) {
      console.error("Error getSingleProductCategory::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single product category
   * ---------------------------------------------------
   *
   */
  const updateSingleProductCategory = async (category_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateProductCategoryResponse>(
        `/product-categories/${category_id}`,
        {
          method: "PUT",
          data: ProductCategoryFormState.value satisfies IUpdateProductCategoryRequest,
        }
      );

      if (response?.success) {
        notification["success"]({
          description: "Product category updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/product-categories");
        resetProductCategoryFormState();
        isEditingProductCategory.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the product category. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleProductCategory::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single product category
   * ---------------------------------------------------
   *
   */
  const deleteSingleProductCategory = async (category_id: number) => {
    try {
      const deleteCategoryResponse = await useApi<IDeleteProductCategoryResponse>(
        `/product-categories/${category_id}`,
        {
          method: "DELETE",
        }
      );

      if (deleteCategoryResponse?.success === true) {
        notification["success"]({
          description: "Product category deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return deleteCategoryResponse.data?.data;
      } else if (deleteCategoryResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteCategoryResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteCategoryResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteCategoryResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleProductCategory::: ", error);
    }
  };


  return {
    productCategories,
    ProductCategoryFormState,
    isEditingProductCategory,
    getAllProductCategories,
    createProductCategory,
    getSingleProductCategory,
    updateSingleProductCategory,
    deleteSingleProductCategory,
    resetProductCategoryFormState,
  };
}
