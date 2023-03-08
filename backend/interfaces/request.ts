import { CategoryEnum, TypeEnum } from "../enum";

export interface RequestParams {
  page: number;
  category: CategoryEnum;
  search?: string;
}

export interface filters {
  type?: TypeEnum;
  category?: CategoryEnum;
  title?: { $regex: RegExp };
  id?: { $in: string[] };
  _id?: { $in: string[] };
}
