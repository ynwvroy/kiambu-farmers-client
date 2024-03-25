declare interface IProductCategoryFormState {
  id?: number;
  name: string;
  description: string;
  slug: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

declare interface IGetAllProductCategories {
  success: boolean;
  message: string;
  data: IProductCategoryFormState[];
}

declare interface IGetSingleProductCategory {
  success: boolean;
  message: string;
  data: IProductCategoryFormState;
}

declare interface ICreateProductCategoryRequest extends IProductCategoryFormState {
  // Additional properties specific to the request, if any
}

declare interface ICreateProductCategoryResponse {
  success: boolean;
  message: string;
  data: IProductCategoryFormState;
}

declare interface IUpdateProductCategoryRequest extends IProductCategoryFormState {
  // Additional properties specific to the request, if any
}

declare interface IUpdateProductCategoryResponse {
  success: boolean;
  message: string;
  data: IProductCategoryFormState;
}

declare interface IDeleteProductCategoryResponse {
  success: boolean;
  message: string;
  code?: string;
  data: null;
}

