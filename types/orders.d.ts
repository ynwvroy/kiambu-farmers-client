declare interface IOrdersFormState {
  id?: number;
  buyer_id: number | null;
  seller_id: number | null;
  product_id: number | null;
  quantity: number;
  total_price: number;
  status: string;
  payment_method: string;
  payment_transaction_id: number;
  comments: string;
  delivery_address: string;
  tracking_number: number;
  created_at?: Date | null;
  updated_at?: Date | null;
  buyer?: IUserFormState | null;
  seller?: IUserFormState | null;
  product?: IProductsFormState | null;
}

declare interface IGetAllOrders {
  success: boolean;
  message: string;
  data: IOrdersFormState[];
}

declare interface IGetSingleOrders {
  success: boolean;
  message: string;
  data: IOrdersFormState;
}

declare interface ICreateOrdersRequest extends IOrdersFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateOrdersResponse {
  success: boolean;
  message: string;
  data: IOrdersFormState;
}

declare interface IUpdateOrdersRequest extends IOrdersFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateOrdersResponse {
  success: boolean;
  message: string;
  data: IOrdersFormState;
}

declare interface IDeleteOrdersResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
