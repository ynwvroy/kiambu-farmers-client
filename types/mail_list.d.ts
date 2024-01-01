declare interface IMailListFormState {
  id?: number;
  type: string;
  email: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllMailList {
  success: boolean;
  message: string;
  data: IMailListFormState[];
}

declare interface IGetSingleMailList {
  success: boolean;
  message: string;
  data: IMailListFormState;
}

declare interface ICreateMailListRequest extends IMailListFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateMailListResponse {
  success: boolean;
  message: string;
  data: IMailListFormState;
}

declare interface IUpdateMailListRequest extends IMailListFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateMailListResponse {
  success: boolean;
  message: string;
  data: IMailListFormState;
}

declare interface IDeleteMailListResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
