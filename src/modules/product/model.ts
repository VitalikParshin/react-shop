export interface ILayout {
  price: number;
  openFilters: boolean;
}

export interface ISubProduct {
  id: number;
}

export interface IProduct {
  id: number;
  name: string;
  images: any;
  subProducts: [ISubProduct];
}
