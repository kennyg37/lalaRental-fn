import {
  ListingCategory,
  ListingLocation,
  ListingOffer,
  ListingTag,
  ListingType,
} from "../interfaces/enums";

export const types = [
 ListingType.Apartment,
 ListingType.House,
 ListingType.Condo,
 ListingType.Townhouse,
 ListingType.Studio,
 ListingType.Duplex,
 ListingType.Villa,
 ListingType.Penthouse,
 ListingType.Hotel,
];

export const languages = [
 ListingLocation.Urban,
 ListingLocation.Rural,
 ListingLocation.Beachfront,
 ListingLocation.Mountain,
 ListingLocation.Suburban,
];

export const tags = [
 ListingTag.Featured,
 ListingTag.Premium,
 ListingTag.NewListing,
 ListingTag.PriceDrop,
 ListingTag.RecentlyReduced,
 ListingTag.HotDeal,
 ListingTag.Premium,
];

export const offers = [
 ListingOffer.Discount,
 ListingOffer.EarlyBird,
 ListingOffer.SpecialOffer,
 ListingOffer.LimitedTime,
];

export const categories = [
  "All",
 ListingCategory.Sale,
 ListingCategory.Rent,
 ListingCategory.Lease,
];
export { ListingCategory };

