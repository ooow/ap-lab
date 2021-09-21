export interface Product {
  name: string;
  description: string;
  picture: string;
  counts: {
    location: string;
    quantityAvailable: string;
  }[];
}
