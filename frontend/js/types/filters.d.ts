export type Filters = {
  genres: string[];
  staff: string[];
  companies: string[];
  malScore: { min: number; max: number };
  members: { min: number; max: number };
  date: string;
  status: string;
  type: string;
  length: string;
};