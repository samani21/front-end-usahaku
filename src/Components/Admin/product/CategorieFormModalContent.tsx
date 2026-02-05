import FormInput from '@/Components/CRUD/FormInput/FormInput';
import ImagePreview from '@/Components/CRUD/FormInput/ImagePreview';
import { validateForm } from '@/Components/CRUD/FormInput/validateForm';
import { CategorieForm, Errors, initialCategorieState, initialErrors, ResCategorie } from '@/Types/Product/CategorieState';
import { getCroppedImg } from '@/utils/cropImage';
import { AlertTriangle, Check, ImageIcon, NotebookPen, Plus, Save, Scissors, XCircle } from 'lucide-react';
import React, { ChangeEvent, FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import Cropper from 'react-easy-crop';

type Props = {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (formData: FormData, id: number | null) => void;
    dataUpdate?: ResCategorie | null;
}

const CategorieFormModalContent = ({ isOpen, onClose, onSubmit, dataUpdate }: Props) => {
    const [CategorieData, setCategorieData] = useState<CategorieForm>(initialCategorieState);
    const [errors, setErrors] = useState<Errors>(initialErrors);

    const [imageToCrop, setImageToCrop] = useState<string | null>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [isCropping, setIsCropping] = useState(false);

    const resetForm = useCallback(() => {
        if (CategorieData.imagePreviewUrl) URL.revokeObjectURL(CategorieData.imagePreviewUrl);
        setCategorieData(initialCategorieState);
        setErrors(initialErrors);
        setImageToCrop(null);
        setIsCropping(false);
    }, [CategorieData.imagePreviewUrl]);

    const validationError = useMemo(() => {
        const errors = {
            name: "",
            imagePreviewUrl: "",
        };

        if (!CategorieData?.name?.trim()) {
            errors.name = "Masukkan nama kategori";
        }

        if (!CategorieData?.imagePreviewUrl?.trim()) {
            errors.imagePreviewUrl = "Masukkan gambar kategori";
        }

        // kalau tidak ada error, return null
        if (!errors.name && !errors.imagePreviewUrl) {
            return null;
        }

        return errors;
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
                imagePreviewUrl: dataUpdate?.image ?? '',
            })
        }
    }, [dataUpdate])



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
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImageToCrop(reader.result as string);
                setIsCropping(true); // Buka UI cropper
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = useCallback((_area: any, areaPixels: any) => {
        setCroppedAreaPixels(areaPixels);
    }, []);

    const handleApplyCrop = async () => {
        try {
            if (imageToCrop && croppedAreaPixels) {
                const croppedBlob = await getCroppedImg(imageToCrop, croppedAreaPixels);
                const croppedFile = new File([croppedBlob], "category_image.jpg", { type: 'image/jpeg' });
                const newPreviewUrl = URL.createObjectURL(croppedBlob);

                setCategorieData(prev => {
                    if (prev.imagePreviewUrl) URL.revokeObjectURL(prev.imagePreviewUrl);
                    return {
                        ...prev,
                        image: croppedFile,
                        imagePreviewUrl: newPreviewUrl,
                    };
                });
                setIsCropping(false);
                setImageToCrop(null);
            }
        } catch (e) {
            console.error(e);
        }
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
    if (!isOpen) return null;
    return (
        // Struktur Modal Backdrop
        <div className="fixed inset-0 z-70 overflow-y-auto bg-gray-900/70 backdrop-blur-xs flex items-center justify-center p-4 transition-opacity duration-300">
            <div
                className="bg-white rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] w-full max-w-xl max-h-[95vh] overflow-y-auto transform transition-transform duration-300 scale-100 opacity-100 modal-no-scrollbar">

                {isCropping && imageToCrop && (
                    <div className="absolute inset-0 z-[100] bg-zinc-900 flex flex-col">
                        <div className="p-4 bg-zinc-800 text-white flex justify-between items-center">
                            <span className="flex items-center gap-2"><Scissors size={18} /> Potong Gambar</span>
                            <div className="flex gap-2">
                                <button onClick={() => setIsCropping(false)} className="px-3 py-1 bg-gray-600 rounded">Batal</button>
                                <button onClick={handleApplyCrop} className="px-3 py-1 bg-blue-600 rounded flex items-center gap-1">
                                    <Check size={16} /> Gunakan
                                </button>
                            </div>
                        </div>
                        <div className="relative flex-1 bg-zinc-900">
                            <Cropper
                                image={imageToCrop}
                                crop={crop}
                                zoom={zoom}
                                aspect={1 / 1} // Atur aspek ratio (1:1 untuk kotak)
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className="p-6 bg-zinc-800">
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => setZoom(Number(e.target.value))}
                                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                            />
                            <p className="text-center text-white text-xs mt-2">Geser untuk Zoom</p>
                        </div>
                    </div>
                )}
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
                                label="Nama Kategori"
                                type="text"
                                name="name"
                                value={CategorieData.name}
                                onChange={handleCategorieChange}
                                error={errors.name}
                                required
                            />
                            <div className="flex flex-col space-y-1">
                                <label className="text-sm font-medium text-gray-800 flex items-center">
                                    <ImageIcon size={16} className="mr-1 text-zinc-500" /> Gambar Kategori
                                </label>
                                <input
                                    id="image"
                                    type="file"
                                    onChange={handleFileChange}
                                    className={`w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-zinc-200 file:text-zinc-800 hover:file:bg-zinc-300 transition duration-150`}
                                    accept="image/*"
                                />
                                <ImagePreview imageUrl={CategorieData.imagePreviewUrl} fileName={CategorieData.image?.name} />
                                {errors.imagePreviewUrl && (
                                    <p className="text-xs text-red-500 flex items-center mt-1">
                                        <AlertTriangle size={14} className="mr-1" /> {errors.imagePreviewUrl}
                                    </p>
                                )}
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