declare interface ISalesFormState {
  id?: number;
  payment_transaction_id: string | null;
  payment_method: string | null;
  date: string | date | null;
  comments: string;
  total_amount: number;
  farmer_id: number | null;
  product_id: number | null;
  units_sold: number;
  payment_received_date: string | date | null;
  payment_status: string;
  created_at?: Date | null;
  updated_at?: Date | null;
  farmer?: IUserFormState | null;
  product?: IProductsFormState | null;
}

declare interface IGetAllSales {
  success: boolean;
  message: string;
  data: ISalesFormState[];
}

declare interface IGetSingleSales {
  success: boolean;
  message: string;
  data: ISalesFormState;
}

declare interface ICreateSalesRequest extends ISalesFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateSalesResponse {
  success: boolean;
  message: string;
  data: ISalesFormState;
}

declare interface IUpdateSalesRequest extends ISalesFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateSalesResponse {
  success: boolean;
  message: string;
  data: ISalesFormState;
}

declare interface IDeleteSalesResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
