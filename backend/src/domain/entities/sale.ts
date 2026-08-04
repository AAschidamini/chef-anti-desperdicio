export type SaleStatus = "completed" | "cancelled" | "refunded";

export interface SaleItem {
  productId: string;
  productName: string;
  quantity: number;
  unitPrice: number;
}

export interface Sale {
  id: string;
  createdAt: string;
  customerName: string;
  items: SaleItem[];
  total: number;
  status: SaleStatus;
}
