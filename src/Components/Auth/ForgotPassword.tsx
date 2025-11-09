import { useAuthStore } from '@/store/authStore'
import { AlertTriangle, ChevronLeft, MailCheck, X } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import ForgotStepsOne from './ForgotStepsOne'
import ForgotStepsTwo from './ForgotStepsTwo'
import ForgotStepsThree from './ForgotStepsThree'

const ForgotPassword = () => {
    const { error, clearError, forgotPassword, checkForgotPassword, resetPassword } = useAuthStore();
    const route = useRouter()
    const [identity, setIdentity] = useState("");
    const [steps, setSteps] = useState<number>(0);
    console.log('steps', steps);
    const searchParams = useSearchParams();
    const step = searchParams.get("step");
    const akun = searchParams.get("akun");
    const [isValid, setIsValid] = useState<boolean>(true)
    const [account, setAccount] = useState<string>('');

    useEffect(() => {
        if (akun && step === '2') {
            setSteps(Number(step))
            setAccount(akun)
            checkAccount()
        }
    }, [step]);

    const checkAccount = async () => {
        const params = "?akun=" + akun
        const account = await checkForgotPassword(params);
        if (account) {
            setIsValid(true)
            route.replace("/auth/forgot-password");
        } else {
            setIsValid(false)
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        let formattedIdentity = identity.trim()

        // Jika input hanya angka atau mengandung tanda +, berarti nomor HP
        if (/^[0-9+]+$/.test(formattedIdentity)) {
            // Jika dimulai dengan 0 -> ubah ke 62
            if (formattedIdentity.startsWith("0")) {
                formattedIdentity = "62" + formattedIdentity.slice(1)
            }
            // Jika dimulai dengan +62 -> ubah ke 62
            else if (formattedIdentity.startsWith("+62")) {
                formattedIdentity = formattedIdentity.replace("+62", "62")
            }
            // Jika sudah dimulai dengan 62 -> biarkan
            else if (!formattedIdentity.startsWith("62")) {
                // Jika misalnya dimulai dengan 812 (tanpa apapun)
                formattedIdentity = "62" + formattedIdentity
            }
        }

        const data = {
            'contact': formattedIdentity,
        }
        const success = await forgotPassword(data)
        if (success) {
            setSteps(1)
        }
    }



    if (steps === 1) {
        return (
            <ForgotStepsOne identity={identity} clearError={clearError} />
        )
    }
    if (steps === 2) {
        return (
            <ForgotStepsTwo clearError={clearError} isValid={isValid} error={error} setSteps={setSteps} account={account} resetPassword={resetPassword} />
        )
    }

    if (steps === 3) {
        return (
            <ForgotStepsThree />
        )
    }
    return (
        <div className="max-w-sm mx-auto text-center">
            <div className="flex items-center">
                <MailCheck className="w-10 h-10 text-[var(--secondary-orange)] mx-auto mb-4" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">
                Lupa Kata Sandi? (Langkah 1/2)
            </h3>
            <p className="text-gray-600 mb-6">
                Masukkan alamat Email atau Nomor WhatsApp Anda yang terdaftar untuk menerima instruksi reset kata sandi.
            </p>
            {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-medium space-y-1 flex item-center justify-between mb-4" role="alert">
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
                onSubmit={handleSubmit}
            >
                <input
                    type="text"
                    id="identity-input"
                    required
                    value={identity}
                    onChange={(e) => setIdentity(e.target.value)}
                    placeholder="Email atau No. WhatsApp"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--secondary-orange)] focus:border-[var(--secondary-orange)] outline-none transition duration-150"
                />
                <button
                    type="submit"
                    className="w-full py-3 px-4 rounded-xl text-white font-bold bg-[var(--secondary-orange)] hover:bg-orange-500 transition shadow-md"
                >
                    Lanjutkan
                </button>
            </form>
            <div className="mt-4 flex w-full cursor-pointer justify-center items-center text-sm text-gray-500 hover:text-gray-700 transition" onClick={() => {
                route?.push('/auth/login')
                clearError()
            }}>
                <ChevronLeft /> Kembali ke Halaman Masuk
            </div>
        </div>
    )
}

export default ForgotPassword
