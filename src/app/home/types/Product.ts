export interface Product {
  productId?: number;
  name: string;
  price: number;
  fragility: boolean;
  weight: number;
  dimensions: number;
  deliveryDate:Date;
  status?: string;
}
