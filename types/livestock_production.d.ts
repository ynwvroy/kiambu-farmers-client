declare interface ILivestockProductionFormState {
  id?: number;
  livestock_id: number;
  date_recorded: Date;
  production_type: string;
  quantity: number;
  market_price: number;
  profit_total: string;
  comments: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllLivestockProduction {
  success: boolean;
  message: string;
  data: ILivestockProductionFormState[];
}

declare interface IGetSingleLivestockProduction {
  success: boolean;
  message: string;
  data: ILivestockProductionFormState;
}

declare interface ICreateLivestockProductionRequest extends ILivestockProductionFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateLivestockProductionResponse {
  success: boolean;
  message: string;
  data: ILivestockProductionFormState;
}

declare interface IUpdateLivestockProductionRequest extends ILivestockProductionFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateLivestockProductionResponse {
  success: boolean;
  message: string;
  data: ILivestockProductionFormState;
}

declare interface IDeleteLivestockProductionResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
