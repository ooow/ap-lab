export type CreateProductFormType = {
  name: string;
  picture: string;
  description: string;
  counts:
    | null
    | {
        location: string;
        quantityAvailable: number;
        price: number;
      }[];
};
