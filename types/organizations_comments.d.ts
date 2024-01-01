declare interface IOrganizationCommentFormState {
  id?: number;
  name: string;
  email: string;
  comment: string;
  rating: number;
  organization_id: number;
  is_anonymous: number;
  created_at?: Date | null;
  updated_at?: Date | null;
  organization?: IOrganizationFormState | null;
}

declare interface IGetAllOrganizationsComments {
  success: boolean;
  message: string;
  data: IOrganizationCommentFormState[];
}

declare interface IGetSingleOrganizationComment {
  success: boolean;
  message: string;
  data: IOrganizationCommentFormState;
}

declare interface ICreateOrganizationCommentRequest
  extends IOrganizationCommentFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateOrganizationCommentResponse {
  success: boolean;
  message: string;
  data: IOrganizationCommentFormState;
}

declare interface IUpdateOrganizationCommentRequest
  extends IOrganizationCommentFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateOrganizationCommentResponse {
  success: boolean;
  message: string;
  data: IOrganizationCommentFormState;
}

declare interface IDeleteOrganizationCommentResponse {
  success: boolean;
  message: string;
  data: null;
}
