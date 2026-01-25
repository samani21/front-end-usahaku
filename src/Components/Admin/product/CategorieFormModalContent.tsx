import FormInput from '@/Components/CRUD/FormInput/FormInput';
import ImagePreview from '@/Components/CRUD/FormInput/ImagePreview';
import { validateForm } from '@/Components/CRUD/FormInput/validateForm';
import { CategorieForm, Errors, initialCategorieState, initialErrors, ResCategorie } from '@/Types/Product/CategorieState';
import { ImageIcon, NotebookPen, Plus, Save, XCircle } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react'

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData, id: number | null) => void;
    dataUpdate?: ResCategorie | null;
}

const CategorieFormModalContent = ({ isOpen, onClose, onSubmit, dataUpdate }: Props) => {
    const [CategorieData, setCategorieData] = useState<CategorieForm>(initialCategorieState);
    const [errors, setErrors] = useState<Errors>(initialErrors);
    const resetForm = useCallback(() => {
        // Membersihkan URL pratinjau utama
        if (CategorieData.imagePreviewUrl) URL.revokeObjectURL(CategorieData.imagePreviewUrl);
        // Membersihkan URL pratinjau varian
        setCategorieData(initialCategorieState);
        setErrors(initialErrors);
    }, [CategorieData.imagePreviewUrl]);

    const validationError = useMemo(() => {
        if (!CategorieData?.name?.trim()) {
            return {
                name: "Masukkan nama kategori",
            };
        }

        return null;
    }, [CategorieData]);

    // Efek untuk membersihkan URL saat modal ditutup
    useEffect(() => {
        if (!isOpen) {
            resetForm();
        }
    }, [isOpen, resetForm]);

    useEffect(() => {
        if (dataUpdate) {

            setCategorieData({
                name: dataUpdate?.name,
                image: null,
                imagePreviewUrl: dataUpdate?.icon,
            })
        }
    }, [dataUpdate])

    if (!isOpen) return null;

    // Penanganan Input Dasar (text/number/textarea)
    const handleCategorieChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        let newValue: string | number = value;
        if (type === 'number') {
            // Simpan sebagai string kosong jika input kosong
            newValue = value === '' ? '' : value;
        }

        setCategorieData(prev => ({
            ...prev,
            [name]: newValue,
        }));

        // HANYA hapus error untuk bidang ini
        setErrors(prev => ({
            ...prev,
            [name as keyof Errors]: '',
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        let newPreviewUrl: string | null = null;

        setCategorieData(prev => {
            // Hapus URL pratinjau lama jika ada
            if (prev.imagePreviewUrl) URL.revokeObjectURL(prev.imagePreviewUrl);

            if (file) {
                newPreviewUrl = URL.createObjectURL(file);
            }

            const newState: CategorieForm = {
                ...prev,
                image: file,
                imagePreviewUrl: newPreviewUrl,
            };
            return newState;
        });
    };


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validationError) {
            setErrors(validationError); // ✅ setState di event
            return;
        }

        setErrors(initialErrors);
        // Lanjutkan jika valid: Konversi ke FormData
        const formData = new FormData();

        // Tambahkan field produk dasar
        formData.append('name', CategorieData.name);
        // Tambahkan gambar utama (jika ada)
        if (CategorieData.image) {
            formData.append('image', CategorieData.image, CategorieData.image.name);
        }


        onSubmit(formData, dataUpdate?.id ?? null);
    };
    // const isSaveDisabled = CategorieData?.name ? true : false;

    return (
        // Struktur Modal Backdrop
        <div className="fixed inset-0 z-70 overflow-y-auto bg-gray-900/70 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-300">
            <div
                className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-xl max-h-[95vh] overflow-y-auto transform transition-transform duration-300 scale-100 opacity-100 modal-no-scrollbar">
                {/* Header Modal - Menggunakan warna Zinc tua */}
                {
                    dataUpdate ?
                        <div className="sticky top-0 bg-yellow-700 p-5 rounded-t-xl shadow-lg flex justify-between items-center z-10">
                            <div className="flex items-center space-x-3">
                                <NotebookPen size={28} className="text-white" />
                                <h2 className="text-2xl font-bold text-white">Formulir Edit Kategori</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-zinc-200 hover:text-white transition duration-200 p-1 rounded-full hover:bg-yellow-800 cursor-pointer"
                                aria-label="Tutup Modal"
                            >
                                <XCircle size={28} />
                            </button>
                        </div> :
                        <div className="sticky top-0 bg-zinc-700 p-5 rounded-t-xl shadow-lg flex justify-between items-center z-10">
                            <div className="flex items-center space-x-3">
                                <Plus size={28} className="text-white" />
                                <h2 className="text-2xl font-bold text-white">Formulir Kategori Baru</h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="text-zinc-200 hover:text-white transition duration-200 p-1 rounded-full hover:bg-zinc-800 cursor-pointer"
                                aria-label="Tutup Modal"
                            >
                                <XCircle size={28} />
                            </button>
                        </div>
                }
                {/* Form Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                    {/* Bagian Informasi Produk Dasar */}
                    <section className="space-y-4">
                        <h3 className="text-xl font-bold text-zinc-700 border-b-2 border-zinc-300 pb-2 flex items-center">
                            Informasi Utama
                        </h3>
                        <div className="grid grid-cols-1 gap-6 p-4 bg-gray-50 rounded-xl shadow-inner">

                            <FormInput
                                label="Nama Produk"
                                type="text"
                                name="name"
                                value={CategorieData.name}
                                onChange={handleCategorieChange}
                                error={errors.name}
                                required
                            />
                            {/* Input Gambar Utama + Pratinjau */}
                            <div className="flex flex-col space-y-1">
                                <label htmlFor="image" className="text-sm font-medium text-gray-800 flex items-center">
                                    <ImageIcon size={16} className="mr-1 text-zinc-500" /> Gambar Utama (Opsional)
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={handleFileChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300 transition duration-150"
                                    accept="image/*"
                                />
                                <ImagePreview imageUrl={CategorieData.imagePreviewUrl} fileName={CategorieData.image?.name} />
                            </div>

                        </div>
                    </section>

                    {/* Footer Form / Tombol Submit */}
                    <div className="sticky bottom-0 p-4 bg-white border-t border-gray-200 flex justify-end space-x-4 z-10 rounded-b-xl">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex items-center cursor-pointer space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-200">
                            <XCircle size={20} />
                            <span>Batal</span>
                        </button>
                        <button
                            type="submit"
                            className="flex items-center cursor-pointer space-x-2 px-8 py-3 bg-zinc-700 text-white font-extrabold rounded-lg shadow-xl shadow-zinc-500/50 hover:bg-zinc-800 transition duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:shadow-none"
                        >
                            <Save size={20} />
                            <span>Simpan</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CategorieFormModalContent