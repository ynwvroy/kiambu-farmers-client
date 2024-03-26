declare interface ICropFormState {
  id?: number;
  name: string;
  variety: string;
  planted_date: Date;
  harvest_date: Date;
  actual_yield: number;
  farmer_id: string | number;
  amount_profit: string;
  comments: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllCrops {
  success: boolean;
  message: string;
  data: ICropFormState[];
}

declare interface IGetSingleCrop {
  success: boolean;
  message: string;
  data: ICropFormState;
}

declare interface ICreateCropRequest extends ICropFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateCropResponse {
  success: boolean;
  message: string;
  data: ICropFormState;
}

declare interface IUpdateCropRequest extends ICropFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateCropResponse {
  success: boolean;
  message: string;
  data: ICropFormState;
}

declare interface IDeleteCropResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
