export interface IMaterial {
  _id?: string;
  shopID: string;
  name: string;
  purchasePrice: number;
  sellPrice: number;
  unitOfMeasurement?: string;
  inStock?: number;
  onSale?: boolean;
}
