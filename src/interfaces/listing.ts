import { ListingOffer } from "./enums";

export interface IListing {
  tags: string[];
  offers: ListingOffer;
  _id: string; 
  title: string;
  description: string;
  price: number;
  category: "Apartment" | "House" | "Villa" | "Studio" | "Room";
  location: string;
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
  }
  image: string[]; 
  availabilityStatus: boolean;
  createdAt: Date; 
  updatedAt: Date; 
}

export interface ICreateListing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  location: string;
  hostId: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  } 
  image: string[]; 
  availabilityStatus: boolean;
  tags: string[];
  offers: ListingOffer;
  createdAt: Date;
  updatedAt: Date;
}