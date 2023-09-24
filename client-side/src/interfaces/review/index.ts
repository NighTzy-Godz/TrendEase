export interface ReviewSubmitData {
  orderId: string;
  content: string;
  rating: number;
}
export interface ReviewFilterData {
  id: number;
  name: string;
  value: boolean;
}
