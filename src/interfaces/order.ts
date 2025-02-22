export interface IOrder {
  _id: string;
  ownerId: string;
  buyerId: string;
  bookId: string;
  quantity: number;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}
