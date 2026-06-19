export type Phase = 'curtain' | 'invitation';

export interface WeddingConfig {
  groomName: string;
  brideName: string;
  weddingDate: Date;
  dateParts: string[]; // ['10', 'Sept', '2027']
  venueName: string;
  venueAddress: string[];
  venueCity: string;
}

export interface CountdownTime {
  d: number;
  h: number;
  m: number;
  s: number;
}
