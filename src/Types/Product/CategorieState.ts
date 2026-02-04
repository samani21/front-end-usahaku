export interface CategorieForm {
    name: string;
    image?: File | null;
    imagePreviewUrl: string;
}

export interface Errors {
    name: string;
    imagePreviewUrl: string;
}

// --- STATE AWAL ---

export const initialCategorieState: CategorieForm = {
    name: '',
    imagePreviewUrl: '',
};

export const initialErrors: Errors = {
    name: '',
    imagePreviewUrl: '',
};


export interface ResCategorie {
    name: string,
    id: number,
    image: string;
    count?: number;
}