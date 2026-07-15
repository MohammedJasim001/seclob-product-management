export interface IVarients {
  ram: string;
  price: string;
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
