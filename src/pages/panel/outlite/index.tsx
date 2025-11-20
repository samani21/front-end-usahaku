// Refactored BusinessProfile with MapModal integration
import React, { useState } from "react";
import {
    Avatar,
    AvatarImage,
    Button,
    Card,
    CardContent,
    Input,
    Label,
    Textarea,
} from "@/Components/ui/Outlite";

import { Upload, MapPin, Save } from "lucide-react";
import { motion } from "framer-motion";
import MainLayout from "../Layout/MainLayout";
import Modal from "@/Components/component/Modal";
import ModalMaps from "@/Components/Panel/Outlite/ModalMaps";
import MapPreview from "@/Components/Panel/Outlite/MapPreview";
type LocationItem = {
    id: number;
    lat: number;
    lng: number;
    value: string;
    outlite: string;
};
export default function BusinessProfile() {
    const [form, setForm] = useState({
        name: "",
        slug: "",
        description: "",
        category: "produk",
        verified: false,
    });

    const handleChange = (key: any, value: string) => setForm((s) => ({ ...s, [key]: value }));

    const [addresses, setAddresses] = useState<LocationItem[]>([
        { id: 1, outlite: '', value: "", lat: 0, lng: 0 },
    ]);

    console.log('addresses', addresses)
    const addAddress = () =>
        setAddresses((a) => [...a, { id: addresses?.length + 1, outlite: "", value: "", lat: 0, lng: 0 }]);

    const updateAddress = (id: number | null, key: any, val: string | number) =>
        setAddresses((a) => a.map((it) => (it.id === id ? { ...it, [key]: val } : it)));

    const removeAddress = (id: number) => setAddresses((a) => (a.length === 1 ? a : a.filter((it) => it.id !== id)));

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [bannerFile, setBannerFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [bannerPreview, setBannerPreview] = useState<string | null>(null);

    const handleFileToBase64 = (file: File): Promise<string> =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(String(reader.result));
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });

    const onLogoChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLogoFile(file);

        const b64 = await handleFileToBase64(file);
        setLogoPreview(b64);
    };

    const onBannerChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setBannerFile(file);

        const b64 = await handleFileToBase64(file);
        setBannerPreview(b64);
    };
    const [openMapId, setOpenMapId] = useState<number | null>(null);

    const handleSave = () => {
        const formData = new FormData();

        formData.append("name", form.name);
        formData.append("slug", form.slug);
        formData.append("description", form.description);
        formData.append("category", form.category);
        formData.append("verified", String(form.verified));

        addresses.forEach((addr, i) => {
            formData.append(`addresses[${i}][value]`, addr.value);
            formData.append(`addresses[${i}][outlite]`, addr.outlite);
            formData.append(`addresses[${i}][lat]`, String(addr.lat) ?? "");
            formData.append(`addresses[${i}][lng]`, String(addr.lng) ?? "");
        });

        if (logoFile) formData.append("logo", logoFile);
        if (bannerFile) formData.append("banner", bannerFile);

        console.log("--- DATA YANG AKAN DIKIRIM KE BACKEND ---");
        for (let pair of formData.entries()) console.log(pair[0], pair[1]);
        console.log("-----------------------------------------");

        alert("Data FormData berhasil di-log ke console (demo). w/ lat lng");
    };

    return (
        <MainLayout>
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-zinc-800">Profil Bisnis</h1>
                    <Button className="flex items-center gap-2" onClick={handleSave}>
                        <Save size={16} /> Simpan
                    </Button>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="overflow-hidden rounded-2xl shadow-sm">
                        <div className="h-48 bg-zinc-300 relative">
                            {bannerPreview ? (
                                <img src={bannerPreview} className="w-full h-48 object-cover" />
                            ) : (
                                <div className="w-full h-48 bg-zinc-300" />
                            )}

                            <Button className="absolute bottom-3 right-3 flex items-center gap-2">
                                <label htmlFor="banner" className="cursor-pointer flex items-center gap-2">
                                    <Upload size={16} /> Ganti Banner
                                </label>
                            </Button>

                            <input id="banner" type="file" accept="image/*" onChange={onBannerChange} className="hidden" />
                        </div>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="rounded-2xl p-6 shadow-sm">
                        <CardContent className="space-y-6 p-0">
                            <div className="flex items-center gap-6">
                                <Avatar className="w-24 h-24 border-2 border-white shadow-md">
                                    <AvatarImage src={logoPreview || "https://via.placeholder.com/200"} />
                                </Avatar>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <label htmlFor="logo" className="cursor-pointer flex items-center gap-2">
                                        <Upload size={16} /> Ganti Logo
                                    </label>
                                </Button>
                                <input id="logo" type="file" accept="image/*" onChange={onLogoChange} className="hidden" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2">
                                    <Label>Nama Bisnis</Label>
                                    <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} placeholder="Contoh: Toko Bunda" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Slug / URL</Label>
                                    <div className="flex items-center">
                                        <span className="bg-zinc-200 px-3 py-2 rounded-l-md border border-zinc-300 text-sm text-zinc-600">
                                            usahaku.com/
                                        </span>
                                        <Input value={form.slug} onChange={(e) => handleChange("slug", e.target.value)} className="rounded-l-none" placeholder="tokobunda" />
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                                    <Label>Deskripsi</Label>
                                    <Textarea value={form.description} onChange={(e) => handleChange("description", e.target.value)} rows={4} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Kategori</Label>
                                    <select
                                        value={form.category}
                                        onChange={(e) => handleChange("category", e.target.value)}
                                        className="border border-zinc-300 rounded-md p-2 text-sm bg-white"
                                    >
                                        <option value="produk">produk</option>
                                        <option value="jasa">jasa</option>
                                        <option value="campuran">campuran</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label>Status Verifikasi</Label>
                                    <Input disabled value={form.verified ? "Terverifikasi" : "Belum Terverifikasi"} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="rounded-2xl p-6 shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold text-zinc-700 flex items-center gap-2">
                            <MapPin size={18} /> Alamat & Lokasi
                        </h2>

                        <div className="space-y-4">
                            {addresses.map((addr) => (
                                <div key={addr.id} className="flex flex-col gap-2 p-4 border border-zinc-200 rounded-xl bg-zinc-50">
                                    <Label>Nama Outlite</Label>
                                    <Input value={addr.outlite} onChange={(e) => updateAddress(addr.id, "outlite", e.target.value)} />
                                    <Label>Alamat</Label>
                                    <Textarea value={addr.value} onChange={(e) => updateAddress(addr.id, "value", e.target.value)} />
                                    <div className="flex justify-between gap-2">
                                        <Button variant="outline" onClick={() => setOpenMapId(addr.id)} className="flex items-center gap-2">
                                            <MapPin size={16} /> Pilih Lokasi
                                        </Button>

                                        <Button variant="outline" className="text-zinc-700" onClick={() => removeAddress(addr.id)}>
                                            Hapus
                                        </Button>
                                    </div>
                                </div>
                            ))}

                            <Button variant="outline" className="w-full" onClick={addAddress}>
                                + Tambah Alamat
                            </Button>
                        </div>

                        {addresses?.find((a) => a?.lat != 0 && a?.lng != 0) ?
                            <MapPreview addresses={addresses} /> : <CardContent className="w-full h-40 bg-zinc-300 rounded-md flex items-center justify-center text-zinc-600 text-sm">
                                (Map Preview)
                            </CardContent>}
                    </Card>
                </motion.div>
            </div>

            <ModalMaps openMapId={openMapId} setOpenMapId={setOpenMapId} updateAddress={updateAddress} addresses={addresses} />
        </MainLayout>
    );
}