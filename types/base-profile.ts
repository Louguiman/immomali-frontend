export interface SocialLink {
  name: string;
  liveLink: string;
}

export interface BaseProfile {
  img?: string;
  type?: string;
  ratings?: number;
  noOfListings?: number;
  position?: string;
  license?: string;
  taxNumber?: string;
  office?: string;
  mobile?: string;
  fax?: string;
  email?: string;
  phone?: string;
  language?: string;
  companyName?: string;
  address?: string;
  aboutMe?: string;
  socialList?: SocialLink[];
}
