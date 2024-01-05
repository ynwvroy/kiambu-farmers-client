declare interface IProductsFormState {
  id?: number;
  name: string;
  description: string;
  stock_quantity: number;
  units_sold: number;
  image_url: string;
  price: number;
  created_by: number | null;
  seller_id: number | null;
  created_at?: Date | null;
  updated_at?: Date | null;
  seller?: IUserFormState | null;
}

declare interface IGetAllProducts {
  success: boolean;
  message: string;
  data: IProductsFormState[];
}

declare interface IGetSingleProducts {
  success: boolean;
  message: string;
  data: IProductsFormState;
}

declare interface ICreateProductsRequest extends IProductsFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateProductsResponse {
  success: boolean;
  message: string;
  data: IProductsFormState;
}

declare interface IUpdateProductsRequest extends IProductsFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateProductsResponse {
  success: boolean;
  message: string;
  data: IProductsFormState;
}

declare interface IDeleteProductsResponse {
  success: boolean;
  message: string;
  data: null;
  code?: string;
}
