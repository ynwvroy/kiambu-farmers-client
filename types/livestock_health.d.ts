declare interface ILivestockHealthFormState {
  id?: number;
  livestock_id: number;
  date_recorded: Date;
  input_type: string;
  quantity_applied: string;
  application_method: string;
  cost: number;
  comments: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllLivestockHealth {
  success: boolean;
  message: string;
  data: ILivestockHealthFormState[];
}

declare interface IGetSingleLivestockHealth {
  success: boolean;
  message: string;
  data: ILivestockHealthFormState;
}

declare interface ICreateLivestockHealthRequest extends ILivestockHealthFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateLivestockHealthResponse {
  success: boolean;
  message: string;
  data: ILivestockHealthFormState;
}

declare interface IUpdateLivestockHealthRequest extends ILivestockHealthFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateLivestockHealthResponse {
  success: boolean;
  message: string;
  data: ILivestockHealthFormState;
}

declare interface IDeleteLivestockHealthResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
