export interface IVarients {
  ram: string;
  price: number;
  qty: number;
}

export interface IProducts {
  _id?: string;
  title: string;
  subCategory: string;
  description: string;
  images: string[];
  variants: [IVarients];
}
