export interface CategorieForm {
    name: string;
    image?: File | null;
    imagePreviewUrl: string | null;
}

export interface Errors {
    name: string;
}

// --- STATE AWAL ---

export const initialCategorieState: CategorieForm = {
    name: '',
    // image: null,
    imagePreviewUrl: null,
};

export const initialErrors: Errors = {
    name: '',
};


export interface ResCategorie {
    name: string,
    icon: string,
    id: number,
}