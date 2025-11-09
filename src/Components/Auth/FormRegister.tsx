import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react'; // pastikan sudah install lucide-react

type Props = {
    register: (data: any) => Promise<boolean>;
};

const FormRegister = ({ register }: Props) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        whatsapp: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Kata sandi tidak cocok. Silakan periksa kembali.");
            return;
        }
        const success = await register(form);
        setError("");
    };
    const handleWhatsappChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ""); // hapus semua non-angka
        setForm({ ...form, whatsapp: value });
    };
    return (
        <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Nama */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                <input
                    type="text"
                    required
                    placeholder="Masukkan nama"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-cyan)] focus:border-[var(--primary-cyan)] outline-none transition duration-150"
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
            </div>

            {/* Email */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                <input
                    type="email"
                    required
                    placeholder="nama@perusahaan.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-cyan)] focus:border-[var(--primary-cyan)] outline-none transition duration-150"
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
            </div>

            {/* Whatsapp */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Whatsapp</label>
                <div className="flex items-center border border-gray-300 rounded-xl focus-within:ring-2 focus-within:ring-[var(--primary-cyan)] focus-within:border-[var(--primary-cyan)] transition duration-150">
                    <span className="pl-4 pr-2 text-gray-500">+62</span>
                    <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        required
                        placeholder="81234567890"
                        value={form.whatsapp}
                        onChange={handleWhatsappChange}
                        className="w-full px-2 py-3 rounded-r-xl outline-none"
                    />
                </div>
            </div>

            {/* Password */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Buat Kata Sandi</label>
                <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Minimal 8 karakter"
                    className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-cyan)] focus:border-[var(--primary-cyan)] outline-none transition duration-150"
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                    type="button"
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>

            {/* Konfirmasi Password */}
            <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
                <input
                    type={showConfirm ? "text" : "password"}
                    required
                    placeholder="Ulangi kata sandi Anda"
                    className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 outline-none transition duration-150 ${error
                        ? "border-red-500 focus:ring-red-400 focus:border-red-400"
                        : "border-gray-300 focus:ring-[var(--primary-cyan)] focus:border-[var(--primary-cyan)]"
                        }`}
                    onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
                <button
                    type="button"
                    className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
                    onClick={() => setShowConfirm(!showConfirm)}
                >
                    {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            </div>

            {/* Terms */}
            <div className="flex items-start">
                <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="h-4 w-4 text-[var(--primary-cyan)] border-gray-300 rounded focus:ring-[var(--primary-cyan)]"
                />
                <label className="ml-2 text-sm text-gray-600">
                    Saya setuju dengan{" "}
                    <a href="#" className="font-medium text-[var(--primary-cyan)] hover:text-sky-600">
                        Syarat & Ketentuan
                    </a>
                </label>
            </div>

            {/* Tombol Submit */}
            <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[var(--primary-cyan)] hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-cyan)] transition duration-300 transform hover:scale-[1.01]"
            >
                Daftar Akun Baru
            </button>
        </form>
    );
};

export default FormRegister;
