declare interface ICropHealthFormState {
  id?: number;
  crop_id: number;
  date_recorded: Date;
  input_type: string;
  quantity_applied: string;
  application_method: string;
  cost: number;
  comments: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllCropHealth {
  success: boolean;
  message: string;
  data: ICropHealthFormState[];
}

declare interface IGetSingleCropHealth {
  success: boolean;
  message: string;
  data: ICropHealthFormState;
}

declare interface ICreateCropHealthRequest extends ICropHealthFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateCropHealthResponse {
  success: boolean;
  message: string;
  data: ICropHealthFormState;
}

declare interface IUpdateCropHealthRequest extends ICropHealthFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateCropHealthResponse {
  success: boolean;
  message: string;
  data: ICropHealthFormState;
}

declare interface IDeleteCropHealthResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
