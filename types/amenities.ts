import { Property } from "./property";

export interface Amenities {
  id: number;
  property: Property | number;
  airConditioning: boolean;
  barbeque: boolean;
  dryer: boolean;
  gym: boolean;
  laundry: boolean;
  lawn: boolean;
  microwave: boolean;
  outdoorShower: boolean;
  refrigerator: boolean;
  sauna: boolean;
  swimmingPool: boolean;
  tvCable: boolean;
  washer: boolean;
  wifi: boolean;
  windowCoverings: boolean;
}
