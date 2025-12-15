// dummyThemeMap.ts
import { DUMMY_CATEGORIES_FOUR, DUMMY_HERO_FOUR, DUMMY_HISTORY_FOUR, DUMMY_PRODUCTS_FOUR } from './ProductFour';
import { DUMMY_CATEGORIES_FIVE, DUMMY_HERO_FIVE, DUMMY_HISTORY_FIVE, DUMMY_PRODUCTS_FIVE } from './ProductFive';
import { DUMMY_CATEGORIES_ONE, DUMMY_HERO_ONE, DUMMY_HISTORY_ONE, DUMMY_PRODUCTS_ONE } from './ProductOne';
import { DUMMY_CATEGORIES_THREE, DUMMY_HERO_THREE, DUMMY_HISTORY_THREE, DUMMY_PRODUCTS_THREE } from './ProductThree';
import { DUMMY_CATEGORIES_TWO, DUMMY_HERO_TWO, DUMMY_HISTORY_TWO, DUMMY_PRODUCTS_TWO } from './ProductTwo';
import { DUMMY_CATEGORIES_SEVENT, DUMMY_HERO_SEVENT, DUMMY_HISTORY_SEVENT, DUMMY_PRODUCTS_SEVENT } from './ProductSevent';
import { DUMMY_CATEGORIES_EIGHT, DUMMY_HERO_EIGHT, DUMMY_HISTORY_EIGHT, DUMMY_PRODUCTS_EIGHT } from './ProductEight';
import { DUMMY_CATEGORIES_NINE, DUMMY_HERO_NINE, DUMMY_HISTORY_NINE, DUMMY_PRODUCTS_NINE } from './ProductNine';
import { DUMMY_CATEGORIES_TEN, DUMMY_HERO_TEN, DUMMY_HISTORY_TEN, DUMMY_PRODUCTS_TEN } from './ProductTen';
import { DUMMY_CATEGORIES_ELEVEN, DUMMY_HERO_ELEVEN, DUMMY_HISTORY_ELEVEN, DUMMY_PRODUCTS_ELEVEN } from './ProductEleven';
import { Product, OrderItem, Category } from './useProductCatalog';
import { Hero } from '@/lib/Types/Theme/theme';
import { DUMMY_CATEGORIES_SIX, DUMMY_HERO_SIX, DUMMY_HISTORY_SIX, DUMMY_PRODUCTS_SIX } from './ProductSix';

type DummyThemeData = {
    products: Product[];
    history: OrderItem[];
    hero: Hero | null;
    categories: Category[];
};

export const DUMMY_THEME_MAP: Record<number, DummyThemeData> = {
    1: {
        products: DUMMY_PRODUCTS_ONE,
        history: DUMMY_HISTORY_ONE,
        hero: DUMMY_HERO_ONE,
        categories: DUMMY_CATEGORIES_ONE,
    },
    2: {
        products: DUMMY_PRODUCTS_TWO,
        history: DUMMY_HISTORY_TWO,
        hero: DUMMY_HERO_TWO,
        categories: DUMMY_CATEGORIES_TWO,
    },
    3: {
        products: DUMMY_PRODUCTS_THREE,
        history: DUMMY_HISTORY_THREE,
        hero: DUMMY_HERO_THREE,
        categories: DUMMY_CATEGORIES_THREE,
    },
    4: {
        products: DUMMY_PRODUCTS_FOUR,
        history: DUMMY_HISTORY_FOUR,
        hero: DUMMY_HERO_FOUR,
        categories: DUMMY_CATEGORIES_FOUR,
    },
    5: {
        products: DUMMY_PRODUCTS_FIVE,
        history: DUMMY_HISTORY_FIVE,
        hero: DUMMY_HERO_FIVE,
        categories: DUMMY_CATEGORIES_FIVE,
    },
    6: {
        products: DUMMY_PRODUCTS_SIX,
        history: DUMMY_HISTORY_SIX,
        hero: DUMMY_HERO_SIX,
        categories: DUMMY_CATEGORIES_SIX,
    },
    7: {
        products: DUMMY_PRODUCTS_SEVENT,
        history: DUMMY_HISTORY_SEVENT,
        hero: DUMMY_HERO_SEVENT,
        categories: DUMMY_CATEGORIES_SEVENT,
    },
    8: {
        products: DUMMY_PRODUCTS_EIGHT,
        history: DUMMY_HISTORY_EIGHT,
        hero: DUMMY_HERO_EIGHT,
        categories: DUMMY_CATEGORIES_EIGHT,
    },
    9: {
        products: DUMMY_PRODUCTS_NINE,
        history: DUMMY_HISTORY_NINE,
        hero: DUMMY_HERO_NINE,
        categories: DUMMY_CATEGORIES_NINE,
    },
    10: {
        products: DUMMY_PRODUCTS_TEN,
        history: DUMMY_HISTORY_TEN,
        hero: DUMMY_HERO_TEN,
        categories: DUMMY_CATEGORIES_TEN,
    },
    11: {
        products: DUMMY_PRODUCTS_ELEVEN,
        history: DUMMY_HISTORY_ELEVEN,
        hero: DUMMY_HERO_ELEVEN,
        categories: DUMMY_CATEGORIES_ELEVEN,
    },
    12: {
        products: DUMMY_PRODUCTS_ELEVEN,
        history: DUMMY_HISTORY_ELEVEN,
        hero: DUMMY_HERO_ELEVEN,
        categories: DUMMY_CATEGORIES_ELEVEN,
    },
    // theme lain tinggal tambah
};

export const DEFAULT_DUMMY_THEME: DummyThemeData = {
    products: DUMMY_PRODUCTS_ONE,
    history: DUMMY_HISTORY_ONE,
    hero: DUMMY_HERO_ONE,
    categories: DUMMY_CATEGORIES_ONE,
};