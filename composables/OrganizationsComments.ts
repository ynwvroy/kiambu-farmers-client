export function useOrganizationsComments() {
  const router = useRouter();

  const organizationsComments = ref<IGetAllOrganizationsComments>();

  const isEditingOrganizationsComments = useState<boolean>(
    "is-editing-org-comment",
    () => false
  );

  /**
   * ---------------------------------------------------
   * Organizations Comments FormState
   * ---------------------------------------------------
   *
   */
  const organizationCommentsFormState = useState<IOrganizationCommentFormState>(
    "organization-comment",
    () => ({
      id: 0,
      name: "",
      email: "",
      comment: "",
      rating: 0,
      organization_id: 0,
      is_anonymous: 0,
      created_at: null,
      updated_at: null,
      organization: null,
    })
  );

  /**
   * ---------------------------------------------------
   * Reset Organizations Comments FormState
   * ---------------------------------------------------
   *
   */
  const resetOrganizationCommentsFormState = () => {
    organizationCommentsFormState.value = {
      id: 0,
      name: "",
      email: "",
      comment: "",
      rating: 0,
      organization_id: 0,
      is_anonymous: 0,
      created_at: null,
      updated_at: null,
      organization: null,
    };
  };
  /**
   * ---------------------------------------------------
   * Get all organizations comments
   * ---------------------------------------------------
   *
   */
  const getAllOrganizationsComments = async () => {
    try {
      const response = await useApi<IGetAllOrganizationsComments>(
        "/organizations-comments",
        {
          method: "GET",
        }
      );

      organizationCommentsFormState.value = response?.data
      return response?.data;
    } catch (error) {
      console.error("Error getAllOrganizationsComments::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Create new organization comment
   * ---------------------------------------------------
   *
   */
  const createOrganizationComment = async () => {
    try {
      const response = await useApi<ICreateOrganizationCommentResponse>(
        "/organizations-comments",
        {
          method: "POST",
          data: organizationCommentsFormState.value satisfies ICreateOrganizationCommentRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Organization\'s comment created successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/organizations-comments");
        resetOrganizationCommentsFormState();
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not create the organization's comment. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error createOrganizationComment::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Get single organization comment
   * ---------------------------------------------------
   *
   */
  const getSingleOrganizationComment = async (org_comment_id: string) => {
    try {
      const response = await useApi<IGetSingleOrganizationComment>(
        `/organizations-comments/${org_comment_id}`,
        {
          method: "GET",
        }
      );

      if (response?.success === true) {
        organizationCommentsFormState.value = response.data;
        return response?.data;
      }
    } catch (error) {
      console.error("Error getSingleOrganizationComment::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Update single organization comment
   * ---------------------------------------------------
   *
   */
  const updateSingleOrganizationComment = async (org_comment_id: number | undefined) => {
    try {
      const response = await useApi<IUpdateOrganizationCommentResponse>(
        `/organizations-comments/${org_comment_id}`,
        {
          method: "PUT",
          data: organizationCommentsFormState.value satisfies IUpdateOrganizationCommentRequest,
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Organization comment updated successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        router.push("/organizations-comments");
        resetOrganizationCommentsFormState();
        isEditingOrganizationsComments.value = false;
        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not update the organization comment. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error updateSingleOrganizationComment::: ", error);
    }
  };

  /**
   * ---------------------------------------------------
   * Delete single organization comment
   * ---------------------------------------------------
   *
   */
  const deleteSingleOrganizationComment = async (org_comment_id: number) => {
    try {
      const response = await useApi<IDeleteOrganizationCommentResponse>(
        `/organizations-comments/${org_comment_id}`,
        {
          method: "DELETE",
        }
      );
      if (response?.success) {
        notification["success"]({
          description: "Organization comment deleted successfully.",
          message: "Success",
          placement: "bottomRight",
          duration: 8,
        });

        return response?.data;
      } else {
        notification["error"]({
          description:
            "Could not delete the organization comment. Please try again.",
          message: "Failed",
          placement: "bottomRight",
          duration: 8,
        });
      }
    } catch (error) {
      console.error("Error deleteSingleOrganizationComment::: ", error);
    }
  };

  return {
    organizationsComments,
    organizationCommentsFormState,
    isEditingOrganizationsComments,
    getAllOrganizationsComments,
    createOrganizationComment,
    getSingleOrganizationComment,
    updateSingleOrganizationComment,
    deleteSingleOrganizationComment,
    resetOrganizationCommentsFormState,
  };
}
