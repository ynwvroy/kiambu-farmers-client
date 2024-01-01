export function useOrganization() {
  const router = useRouter();

  const organizations = ref<IGetAllOrganizations>();

  const isEditingOrganization = useState<boolean>(
    "is-editing-organization",
    () => false
  );

  /**
   * ---------------------------------------------------
   * Organizations  FormState
   * ---------------------------------------------------
   *
   */
  const organizationFormState = useState<IOrganizationFormState>(
    "organization",
    () => ({
      id: 0,
      name: "",
      slug: "",
      description: "",
      admin_id: null,
      contact_phone_number: "",
      contact_email: "",
      instagram_url: "",
      facebook_url: "",
      twitter_url: "",
      linkedin_url: "",
      location: "",
      profile_url: "",
      created_at: null,
      updated_at: null,
      user: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Organizations  FormState
   * ---------------------------------------------------
   *
   */
  const resetOrganizationFormState = () => {
    organizationFormState.value = {
      id: 0,
      name: "",
      slug: "",
      description: "",
      admin_id: null,
      contact_phone_number: "",
      contact_email: "",
      instagram_url: "",
      facebook_url: "",
      twitter_url: "",
      linkedin_url: "",
      location: "",
      profile_url: "",
      created_at: null,
      updated_at: null,
      user: null,
    };
  };

  /**
   * ---------------------------------------------------
   * Get all organizations
   * ---------------------------------------------------
   *
   */
  const getAllOrganizations = async () => {
    try {
      const response = await useApi<IGetAllOrganizations>("/organizations", {
        method: "GET",
      });

      organizationFormState.value = response?.data
      return response?.data;
    } catch (error) {
      console.error("Error getAllOrganizations::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new organization
   * ---------------------------------------------------
   *
   */
  const createOrganization = async () => {
    try {
      const response = await useApi<ICreateOrganizationResponse>(
        "/organizations",
        {
          method: "POST",
          data: organizationFormState.value satisfies ICreateOrganizationRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Organization created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/organizations");
        resetOrganizationFormState();
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not create the organization. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createOrganization::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single organization
   * ---------------------------------------------------
   *
   */
  const getSingleOrganization = async (org_id: string | number) => {
    try {
      const response = await useApi<IGetSingleOrganization>(
        `/organizations/${org_id}`,
        {
          method: "GET",
        }
      );

      if (response?.success) {
        organizationFormState.value = response?.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleOrganization::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single organization
   * ---------------------------------------------------
   *
   */
  const updateSingleOrganization = async (org_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateOrganizationResponse>(
        `/organizations/${org_id}`,
        {
          method: "PUT",
          data: organizationFormState.value satisfies IUpdateOrganizationRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Organization updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/organizations");
        resetOrganizationFormState();
        isEditingOrganization.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description: "Could not update the organization. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleOrganization::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single organization
   * ---------------------------------------------------
   *
   */
  const deleteSingleOrganization = async (org_id: number) => {
    try {
      const deleteOrganizationResponse = await useApi<IDeleteOrganizationResponse>(
        `/organizations/${org_id}`,
        {
          method: "DELETE",
        }
      );

      if (deleteOrganizationResponse?.success === true) {
        notification["success"]({
          description: "Organization deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteOrganizationResponse.data?.code === "E_ROW_NOT_FOUND") {
        notification["warning"]({
          description: deleteOrganizationResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      } else if (deleteOrganizationResponse.data?.code === "ER_ROW_IS_REFERENCED_2") {
        notification["warning"]({
          description: deleteOrganizationResponse.data?.message,
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleOrganization::: ", error);
    }
  };

  return {
    organizations,
    organizationFormState,
    isEditingOrganization,
    getAllOrganizations,
    createOrganization,
    getSingleOrganization,
    updateSingleOrganization,
    deleteSingleOrganization,
    resetOrganizationFormState,
  };
}
