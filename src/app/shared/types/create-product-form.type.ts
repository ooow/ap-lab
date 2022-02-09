export type CreateProductFormType = {
  name: string;
  picture: string;
  description: string;
  counts?:{
    location:string;
    quantityAvailable:number;
    price:number;
  }[]
};
