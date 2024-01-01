declare interface IOrganizationFormState {
  id?: number;
  name: string;
  slug: string;
  description: string;
  admin_id: null | number;
  contact_phone_number: string;
  contact_email: string;
  instagram_url: string;
  facebook_url: string;
  twitter_url: string;
  linkedin_url: string;
  location: string;
  profile_url: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  user?: IGetSingleUserResponse | null;
}

declare interface IGetSingleOrganization {
  success: boolean;
  message: string;
  data: IOrganizationFormState;
}

declare interface IGetAllOrganizations {
  success: boolean;
  message: string;
  data: IOrganizationFormState[];
}

declare interface ICreateOrganizationRequest extends IOrganizationFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateOrganizationResponse {
  success: boolean;
  message: string;
  data: IOrganizationFormState;
}

declare interface IUpdateOrganizationRequest extends IOrganizationFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateOrganizationResponse {
  success: boolean;
  message: string;
  data: IOrganizationFormState;
}

declare interface IDeleteOrganizationResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
