import type { IProducts } from "./productTypes";

export interface User {
  name: string;
  email: string;
  password: string;
  wishlist: IProducts[];
}
