import { ResCategorie } from "./Product/CategorieState";
import { ResProduct } from "./Product/ProductState";

export interface ResHeader {
    theme: number;
    id: number;
    color: string;
    logo?: string;
    frame?: 'light' | 'dark';
    type_frame?: "circle" | "square" | "none";
    span_one?: string;
    span_two?: string;
}

export interface queue {
    theme: number;
    color: string;
    span_one?: string;
    span_two?: string;
}

export interface categorie {
    theme: number;
    color: string;
}
export interface product {
    theme: number;
    color: string;
}

export interface ResHero {
    theme: number;
    id: number;
    color: string;
    image?: string;
    title?: string;
    subtitle?: string;
    desc?: string;
    cta?: string;
}

export interface Catalog {
    header: ResHeader;
    hero: ResHero;
    queue: queue;
    categorie: categorie;
    categories: ResCategorie[];
    product: product;
    products: ResProduct[];
}