export interface IReview {
  _id: string;
  userId: string;
  bookId: string;
  rating: number;
  comment: string;
  likes?: number;
  dislikes?: number;
  createdAt: Date;
  updatedAt: Date;
}
