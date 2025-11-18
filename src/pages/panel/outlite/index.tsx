import React, { useState } from 'react'
import MainLayout from '../Layout/MainLayout'
import { MapPin, Save, Upload } from 'lucide-react'
import { motion } from "framer-motion";
import { Avatar, AvatarImage, Button, Card, CardContent, Input, Label, Textarea } from '@/Components/ui/Outlite';

const OutlitePage = () => {
    const [addresses, setAddresses] = useState([{ id: Date.now(), value: "" }]);


    const addAddress = () => {
        setAddresses([...addresses, { id: Date.now(), value: "" }]);
    };


    const updateAddress = (id: number, val: string) => {
        setAddresses(addresses.map(a => (a.id === id ? { ...a, value: val } : a)));
    };


    const removeAddress = (id: number) => {
        if (addresses.length === 1) return;
        setAddresses(addresses.filter(a => a.id !== id));
    };
    return (
        <MainLayout>
            <div className="w-full mx-auto space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold text-zinc-800">Profil Bisnis</h1>
                    <Button className="flex items-center gap-2"><Save size={16} /> Simpan</Button>
                </div>

                {/* Banner */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="overflow-hidden rounded-2xl shadow-sm">
                        <div className="h-48 bg-zinc-300 relative">
                            <Button className="absolute bottom-3 right-3 flex items-center gap-2" >
                                <Upload size={16} /> Ganti Banner
                            </Button>
                        </div>
                    </Card>
                </motion.div>

                {/* Profile & Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <Card className="rounded-2xl p-6 shadow-sm">
                        <CardContent className="space-y-6 p-0">
                            {/* Logo */}
                            <div className="flex items-center gap-6">
                                <Avatar className="w-24 h-24 border-2 border-white shadow-md">
                                    <AvatarImage src="https://via.placeholder.com/200" />
                                </Avatar>
                                <Button variant="outline" className="flex items-center gap-2">
                                    <Upload size={16} /> Ganti Logo
                                </Button>
                            </div>

                            {/* Form */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium">Nama Bisnis</Label>
                                    <Input placeholder="Contoh: Toko Bunda" />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium">Slug / URL</Label>
                                    <div className="flex items-center">
                                        <span className="bg-zinc-200 px-3 py-2 rounded-l-md border border-zinc-300 text-sm text-zinc-600">usahaku.com/</span>
                                        <Input className="rounded-l-none" placeholder="tokobunda" />
                                    </div>
                                </div>

                                <div className="col-span-1 md:col-span-2 flex flex-col gap-2">
                                    <Label className="text-sm font-medium">Deskripsi</Label>
                                    <Textarea placeholder="Deskripsi singkat tentang bisnis..." rows={4} />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium">Kategori</Label>
                                    <select className="border border-zinc-300 rounded-md p-2 text-sm bg-white">
                                        <option>produk</option>
                                        <option>jasa</option>
                                        <option>campuran</option>
                                    </select>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <Label className="text-sm font-medium">Status Verifikasi</Label>
                                    <Input disabled value="Belum Terverifikasi" className="text-red-600 font-semibold" />
                                </div>

                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Address & Map */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Card className="rounded-2xl p-6 shadow-sm space-y-4">
                        <h2 className="text-lg font-semibold text-zinc-700 flex items-center gap-2"><MapPin size={18} /> Alamat & Lokasi</h2>


                        {/* Multiple Address List */}
                        <div className="space-y-4">
                            {addresses.map((addr) => (
                                <div key={addr.id} className="flex flex-col gap-2 p-4 border border-zinc-200 rounded-xl bg-zinc-50">
                                    <Label>Alamat</Label>
                                    <Textarea
                                        value={addr.value}
                                        onChange={(e) => updateAddress(addr.id, e.target.value)}
                                        placeholder="Jl. Contoh No. 123, Jakarta"
                                    />
                                    <div className="flex justify-end">
                                        <Button variant="outlineRed" className="text-red-600 border-red-300" onClick={() => removeAddress(addr.id)}>Hapus</Button>
                                    </div>
                                </div>
                            ))}


                            <Button variant="outline" className="w-full" onClick={addAddress}>+ Tambah Alamat</Button>
                        </div>


                        <CardContent className="w-full h-40 bg-zinc-300 rounded-md flex items-center justify-center text-zinc-600 text-sm">
                            (Map Preview)
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </MainLayout>
    )
}

export default OutlitePage