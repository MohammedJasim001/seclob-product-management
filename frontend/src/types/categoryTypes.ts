export interface SubCategory {
  _id: string;
  category: string;
  name: string;
}

export interface Category {
  _id: string;
  name: string;
  subCategories: [SubCategory];
}
