import { AlertTriangle, ChevronLeft, Eye, EyeOff, Lock, LucideMessageCircleWarning, X } from 'lucide-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

type Props = {
    isValid: boolean;
    clearError: () => void;
    error: string | null;
    setSteps: (value: number) => void;
    account: string;
    resetPassword: (data: any) => Promise<boolean>;
}

const ForgotStepsTwo = ({ isValid, clearError, error, setSteps, account, resetPassword }: Props) => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        whatsapp: "",
        password: "",
        confirmPassword: "",
    });
    const [errorPassword, setErrorPassword] = useState<string>("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const handleSubmitResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setErrorPassword("Kata sandi tidak cocok. Silakan periksa kembali.");
            return;
        }
        const data = {
            'akun': account,
            'password': form.confirmPassword
        }
        const resetAccount = await resetPassword(data);
        if (resetAccount) {
            setSteps(3);
        }
        setErrorPassword("");
    };
    const route = useRouter();
    return (
        isValid ? <div className="max-w-sm mx-auto text-center">
            <div className="flex items-center">
                <Lock className="w-10 h-10 text-[var(--secondary-orange)] mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                Lupa Kata Sandi? (Langkah 2/2)
            </h3>
            <p className="text-gray-600 mb-6">
                Masukkan kata sandi baru Anda. Pastikan kata sandi kuat dan minimal 8 karakter.
            </p>
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-medium space-y-1 flex item-center justify-between" role="alert">
                    <div className='flex items-center gap-4'>
                        <AlertTriangle className='text-red-600 w-5' />
                        {error}
                    </div>
                    <button
                        className="text-red-600 cursor-pointer"
                        onClick={() => clearError()}
                    >
                        <X />
                    </button>
                </div>
            )}
            <form
                id="forgot-password-form-step1"
                className="space-y-4"
                onSubmit={handleSubmitResetPassword}
            >
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        required
                        placeholder="Minimal 8 karakter"
                        className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--secondary-orange)] focus:border-[var(--secondary-orange)] outline-none transition duration-150"
                        onChange={(e) => setForm({ ...form, password: e.target.value })}
                    />
                    <button
                        type="button"
                        className="cursor-pointer absolute right-3 top-4 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>

                {/* Konfirmasi Password */}
                <div className="relative">
                    <input
                        type={showConfirm ? "text" : "password"}
                        required
                        placeholder="Ulangi kata sandi Anda"
                        className={`w-full px-4 py-3 pr-10 border rounded-xl focus:ring-2 outline-none transition duration-150 ${error
                            ? "border-red-500 focus:ring-red-400 focus:border-red-400"
                            : "border-gray-300 focus:ring-[var(--secondary-orange)] focus:border-[var(--secondary-orange)]"
                            }`}
                        onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                    />
                    <button
                        type="button"
                        className="cursor-pointer absolute right-3 top-4 text-gray-500 hover:text-gray-700"
                        onClick={() => setShowConfirm(!showConfirm)}
                    >
                        {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                    {errorPassword && <p className="text-red-500 text-sm mt-1">{errorPassword}</p>}
                </div>
                <button
                    type="submit"
                    className="w-full cursor-pointer py-3 px-4 rounded-xl text-white font-bold bg-[var(--secondary-orange)] hover:bg-orange-500 transition shadow-md"
                >
                    Ganti Password
                </button>
            </form>
            <div className="mt-4 flex w-full cursor-pointer justify-center items-center text-sm text-gray-500 hover:text-gray-700 transition" onClick={() => {
                route?.push('/auth/login')
                clearError()
            }}>
                <ChevronLeft /> Kembali ke Halaman Masuk
            </div>
        </div> : <div className="max-w-sm mx-auto text-center">
            <div className="flex items-center">
                <LucideMessageCircleWarning className="w-10 h-10 text-red-500 mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                Lupa Kata Sandi? (Langkah 2/2)
            </h3>
            <p className="text-gray-600 mb-6">
                Tautan reset kata sandi ini sudah digunakan atau tidak lagi berlaku.
                Kemungkinan Anda telah mengubah kata sandi sebelumnya atau tautan sudah kedaluwarsa.

                Untuk mengatur ulang kata sandi kembali, silakan lakukan permintaan reset baru melalui halaman berikut:
            </p>

            <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-white font-bold bg-[var(--secondary-orange)] hover:bg-orange-500 transition shadow-md"
                onClick={() => {
                    route?.push('/auth/login')
                    clearError()
                }}
            >
                Ajukan reset password lagi
            </button>
            <div className="mt-4 flex w-full cursor-pointer justify-center items-center text-sm text-gray-500 hover:text-gray-700 transition" onClick={() => {
                route?.push('/auth/login')
                clearError()
            }}>
                <ChevronLeft /> Kembali ke Halaman Masuk
            </div>
        </div>

    )
}

export default ForgotStepsTwo