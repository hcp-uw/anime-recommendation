import { malCategories } from '../constants';

export type MalCategoryId = keyof typeof malCategories;
export type MalCategoryName = typeof malCategories[MalCategoryId];