export type Phase = 'curtain' | 'invitation';

export interface WeddingConfig {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  dateParts: string[];           // ['10', 'Sept', '2027']
  venueName: string;
  venueAddress: string[];
  venueCity: string;
  busPickup: string;
  busPickupTime: string;
  busReturnTime: string;
  bankHolder: string;
  bankIban: string;
  bankReference: string;
}

export interface CountdownTime {
  d: number; h: number; m: number; s: number;
}

export interface MenuItem {
  course: string;
  name: string;
  description: string;
}