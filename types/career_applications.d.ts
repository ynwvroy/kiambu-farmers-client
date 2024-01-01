declare interface ICareerApplicationFormState {
  id?: number;
  full_name: string;
  email: string;
  phone_number: string;
  role_application: string | null;
  linkedin_url: string;
  resume_url: string;
  status: string;
  response_status: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllCareerApplications {
  success: boolean;
  message: string;
  data: ICareerApplicationFormState[];
}

declare interface IGetSingleCareerApplication {
  success: boolean;
  message: string;
  data: ICareerApplicationFormState;
}

declare interface ICreateCareerApplicationRequest
  extends ICareerApplicationFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateCareerApplicationResponse {
  success: boolean;
  message: string;
  data: ICareerApplicationFormState;
}

declare interface IUpdateCareerApplicationRequest
  extends ICareerApplicationFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateCareerApplicationResponse {
  success: boolean;
  message: string;
  data: ICareerApplicationFormState;
}

declare interface IDeleteCareerApplicationResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
