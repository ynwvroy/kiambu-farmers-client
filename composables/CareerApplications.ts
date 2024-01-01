export function useCareerApplications() {
  const router = useRouter();

  const careerApplications = ref<IGetAllCareerApplications>();

  const isEditingCareerApplication = useState<boolean>(
    "is-editing-career-application",
    () => false
  );
  /**
   * ---------------------------------------------------
   * CareerApplications  FormState
   * ---------------------------------------------------
   *
   */
  const careerApplicationFormState = useState<ICareerApplicationFormState>(
    "careerApplication",
    () => ({
      id: 0,
      full_name: "",
      email: "",
      phone_number: "",
      role_application: null,
      linkedin_url: "",
      resume_url: "",
      status: "",
      response_status: "",
      created_at: null,
      updated_at: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Career Application FormState
   * ---------------------------------------------------
   *
   */
  const resetCareerApplicationFormState = () => {
    careerApplicationFormState.value = {
      id: 0,
      full_name: "",
      email: "",
      phone_number: "",
      role_application: null,
      linkedin_url: "",
      resume_url: "",
      status: "",
      response_status: "",
      created_at: null,
      updated_at: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all careerApplications
   * ---------------------------------------------------
   *
   */
  const getAllCareerApplications = async () => {
    try {
      const response = await useApi<IGetAllCareerApplications>(
        "/career-application",
        {
          method: "GET",
        }
      );

      careerApplicationFormState.value = response?.data
      return response?.data;
    } catch (error) {
      console.error("Error getAllCareerApplications::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single careerApplication
   * ---------------------------------------------------
   *
   */
  const createSingleCareerApplication = async () => {
    try {
      const response = await useApi<ICreateCareerApplicationResponse>(
        "/career-application/",
        {
          method: "POST",
          data: careerApplicationFormState.value satisfies ICreateCareerApplicationRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Job application sent successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/about");
        resetCareerApplicationFormState();
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not send the job application. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createSingleCareerApplication::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single careerApplication
   * ---------------------------------------------------
   *
   */
  const getSingleCareerApplication = async (careerApplication_id: string) => {
    try {
      const response = await useApi<IGetSingleCareerApplication>(
        `/career-application/${careerApplication_id}`,
        {
          method: "GET",
        }
      );
      if (response?.success === true) {
        careerApplicationFormState.value = response.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleCareerApplication::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single careerApplication
   * ---------------------------------------------------
   *
   */
  const updateSingleCareerApplication = async (
    careerApplication_id: number | undefined
  ) => {
    try {
      const response = await useApi<IUpdateCareerApplicationResponse>(
        `/career-application/${careerApplication_id}`,
        {
          method: "PUT",
          data: careerApplicationFormState.value satisfies IUpdateCareerApplicationRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Career application updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/career-applications");
        resetCareerApplicationFormState();
        isEditingCareerApplication.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not update the career application. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleCareerApplication::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single careerApplication
   * ---------------------------------------------------
   *
   */
  const deleteSingleCareerApplication = async (
    careerApplication_id: number
  ) => {
    try {
      const deleteApplicationResponse = await useApi<IDeleteCareerApplicationResponse>(
        `/career-application/${careerApplication_id}`,
        {
          method: "DELETE",
        }
      );
      if (deleteApplicationResponse?.success === true) {
        notification["success"]({
          description: "Career application deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return deleteApplicationResponse.data?.data;
      } else if (deleteApplicationResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteApplicationResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteApplicationResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteApplicationResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }  else {
        notification["error"]({
          description:
            "Could not delete the application. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleCareerApplication::: ", error);
    }
  };

  return {
    careerApplications,
    careerApplicationFormState,
    isEditingCareerApplication,
    getAllCareerApplications,
    getSingleCareerApplication,
    createSingleCareerApplication,
    updateSingleCareerApplication,
    deleteSingleCareerApplication,
    resetCareerApplicationFormState,
  };
}
