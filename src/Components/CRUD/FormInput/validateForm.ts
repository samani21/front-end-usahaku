import { Errors, initialErrors, ProductForm, VariantErrors } from "@/lib/Types/Product/ProductState";

export const validateForm = (data: ProductForm): { isValid: boolean; errors: Errors } => {
    const errors: Errors = JSON.parse(JSON.stringify(initialErrors)); // Deep copy
    let isValid = true;

    // 1. Validasi Produk Dasar
    if (!data.name.trim()) { errors.name = 'Nama produk wajib diisi.'; isValid = false; }
    if (!data.description.trim()) { errors.description = 'Deskripsi wajib diisi.'; isValid = false; }

    const price = parseFloat(data.price as string);
    if (data.price === '') {
        errors.price = 'Harga wajib diisi.'; isValid = false;
    } else if (isNaN(price) || price < 0) {
        errors.price = 'Harga harus angka positif.'; isValid = false;
    }

    const stock = parseFloat(data.stock as string);
    if (data.stock === '') {
        errors.stock = 'Stok wajib diisi.'; isValid = false;
    } else if (isNaN(stock) || stock < 0) {
        errors.stock = 'Stok harus angka positif.'; isValid = false;
    }

    // 2. Validasi Varian
    if (data.has_variant === 1) {
        errors.variants = data.variants.map((variant, index) => {
            const variantErrors: VariantErrors = { name: '', price: '', stock: '' };

            if (!variant.name.trim()) {
                variantErrors.name = 'Nama varian wajib diisi.'; isValid = false;
            }

            const vPrice = parseFloat(variant.price as string);
            if (variant.price === '') {
                variantErrors.price = 'Harga varian wajib diisi.'; isValid = false;
            } else if (isNaN(vPrice) || vPrice < 0) {
                variantErrors.price = 'Harga harus angka positif.'; isValid = false;
            }

            const vStock = parseFloat(variant.stock as string);
            if (variant.stock === '') {
                variantErrors.stock = 'Stok varian wajib diisi.'; isValid = false;
            } else if (isNaN(vStock) || vStock < 0) {
                variantErrors.stock = 'Stok harus angka positif.'; isValid = false;
            }

            return variantErrors;
        });
    }

    return { isValid, errors };
};
