import { CheckCheck, ChevronLeft } from 'lucide-react';
import { useRouter } from 'next/router';
import React from 'react'

type Props = {
    identity: string;
    clearError: () => void;
}

const ForgetStepsOne = ({ identity, clearError }: Props) => {
    const route = useRouter();
    const isEmail = (value: string) => value?.includes('@');
    return (
        <div className="max-w-sm mx-auto text-center">
            <div className="flex items-center">
                <CheckCheck className="w-10 h-10 text-[#308e32] mx-auto mb-4 rounded-full bg-gray-300 p-1" />
            </div>
            {/* <h3 className="text-xl font-bold text-gray-800 mb-2">
                    Lupa Kata Sandi? (Langkah 1/2)
                </h3> */}
            <p className="text-gray-600 mb-6">
                Kami telah mengirimkan <b>tautan reset kata sandi</b> ke {isEmail(identity) ? "Email" : "Whatsapp"} Anda yang terdaftar.
                Silakan periksa kotak masuk Anda dan ikuti petunjuk untuk mengatur ulang kata sandi.

                Jika Anda tidak melihat pesan dalam beberapa menit, cek juga folder Spam atau Pesan Masuk Lainnya.
            </p>
            <button
                type="submit"
                className="w-full py-3 px-4 rounded-xl text-white font-bold bg-[var(--secondary-orange)] hover:bg-orange-500 transition shadow-md"
            >
                Buka aplikasi {isEmail(identity) ? "Email" : "Whatsapp"}
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

export default ForgetStepsOne