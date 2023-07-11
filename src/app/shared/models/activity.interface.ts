export interface Activity {
  id: number | string;
  title: string;
  slug: string;
  location: string;
  country: string;
  countryCode: string;
  date: string;
  price: number;
  currency: string;
  description: string;
  capacity: number;
  quorum: number;
  ageCategory: AgeCategory;
  state: ActivityState;
  userId: number | string;
}

export const DEFAULT_ACTIVITY: Activity = {
  id: 0,
  title: '',
  slug: '',
  location: '',
  country: '',
  countryCode: '',
  date: '',
  price: 0,
  currency: '',
  description: '',
  capacity: 0,
  quorum: 0,
  ageCategory: 'any',
  state: 'draft',
  userId: 0,
};

export type AgeCategory = 'adult' | 'child' | 'any';
export type ActivityState = 'draft' | 'published' | 'cancelled' | 'finished';
