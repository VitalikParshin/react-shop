export interface ILayout {
  price: number;
  openFilters: boolean;
}

export interface ICurrentDataProduct {
  subProductId: string;
  colorId: number;
}

export interface IProduct {
  id: string;
  name: string;
  shortDescription: string;
  description: string;
  brand: IBrand;
  category: ICategory;
  images: [IImage];
  imagesWithColor: [IImageWithColor];
  subProducts: [ISubProduct];
  attributes: [IAttribute];
}

export interface IBrand {
  id: string;
  name: string;
}

export interface ICategory {
  id: string;
  name: string;
}

export interface IImage {
  id: number;
  src: string;
  width: number;
  height: number;
  color: string;
  isTitle: boolean;
}

export interface IImageWithColor {
  id: number;
  src: string;
  height: number;
  width: number;
  color: string;
  isTitle: boolean;
}

export interface ISubProduct {
  id: string;
  article: string;
  price: number;
  oldPrice: number;
  discount: string;
  attributes: [IAttribute];
}

export interface IAttribute {
  name: string;
  values: [IValue];
}

export interface IValue {
  id: number;
  name: string;
  value: string;
  description: string;
}
