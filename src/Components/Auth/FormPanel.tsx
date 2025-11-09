import React, { useEffect, useState } from 'react'
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import { getUserInfo, useAuthStore } from '@/store/authStore';
import Loading from '../component/Loading';
import { AlertTriangle, KeyRound, X } from 'lucide-react';
import Modal from '../component/Modal';
import { OtpInput } from 'reactjs-otp-input';
import { useRouter } from 'next/router';

const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

const FormPanel = () => {
    const router = useRouter();
    const [otp, setOtp] = useState('');
    const [handleAuth, setHandleAuth] = useState<string>('Masuk');
    const { register, loading, error, clearError, resendOtp, verifyOtp } = useAuthStore();
    const user = getUserInfo();
    const [openModal, setOpenModal] = useState<boolean>(false);
    const [counter, setCounter] = useState(20);
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (counter > 0) {
            timer = setTimeout(() => setCounter(counter - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [counter]);
    const handleResend = async () => {


    };
    useEffect(() => {
        if (user && user?.is_active === 0) {
            setOpenModal(true)
        }
    }, [user]);

    useEffect(() => {
        if (otp?.length === 6) {
            handleVerifyOtp()
        }
    }, [otp])

    const handleVerifyOtp = async () => {
        const data = {
            whatsapp: user?.whatsapp,
            otp: otp
        }
        const success = await verifyOtp(data);
        if (success) {
            setOpenModal(false)
            router?.push('/')
        }
    }
    const handleResendOtp = async () => {
        const data = {
            whatsapp: user?.whatsapp
        }
        const success = await resendOtp(data);
        if (success) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setCounter(20);
        }
    }

    const formatContactMasked = (contact: string) => {
        if (isEmail(contact)) {
            const [name, domain] = contact?.split('@');
            const maskedName = name.length > 2
                ? name.slice(0, 2) + '*'.repeat(name.length - 2)
                : name[0] + '*';
            return maskedName + '@' + domain;
        } else {
            if (contact?.length < 3) return contact;
            const lastThree = contact?.slice(-3);
            return '****_****_*' + lastThree;
        }
    };

    const isEmail = (value: string) => value?.includes('@');

    return (
        <div className="w-full lg:w-3/5 flex items-center justify-center bg-white p-6 sm:p-12">
            <div className="w-full max-w-lg">

                <div className="text-center lg:text-left mb-8 lg:hidden">
                    <a href="#" className="text-3xl font-extrabold flex items-center justify-center">
                        <span className="text-[var(--primary-cyan)]">Usaha</span><span className="text-[var(--secondary-orange)]">Ku</span>
                    </a>
                </div>

                {
                    handleAuth === "Masuk" ? <h1 id="form-title" className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 text-center lg:text-left">
                        Masuk ke UsahaKu
                    </h1> : <h1 id="form-title" className="text-3xl sm:text-4xl font-bold mb-8 text-gray-900 text-center lg:text-left">
                        Buat Akun UsahaKu Baru
                    </h1>

                }
                <div className="flex space-x-2 mb-8 p-1 bg-gray-100 rounded-full w-full max-w-xs mx-auto lg:mx-0">
                    <button id="tab-login" onClick={() => {
                        setHandleAuth("Masuk");
                        clearError()
                    }}
                        className={`flex-1 py-2 rounded-full text-base font-semibold transition duration-300 ${handleAuth === "Masuk" ? 'text-base bg-[var(--secondary-orange)] text-white shadow-md' : 'bg-transparent text-gray-600 hover:text-gray-900'}`}>
                        Masuk
                    </button>
                    <button id="tab-signup" onClick={() => {
                        setHandleAuth("Register");
                        clearError()
                    }}
                        className={`flex-1 py-2 rounded-full text-base font-semibold transition duration-300 ${handleAuth === "Register" ? 'text-base bg-[var(--primary-cyan)] text-white shadow-md' : 'bg-transparent text-gray-600 hover:text-gray-900'}`}>
                        Daftar
                    </button>
                </div>

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

                {
                    handleAuth === 'Masuk' ? <FormLogin /> : <FormRegister register={register} />
                }
                <div className="relative mt-8">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Atau masuk/daftar dengan</span>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <button className="w-full flex items-center gap-4 justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150">
                        <img src={'/icon/google.svg'} />
                        Lanjutkan dengan Google
                    </button>
                </div>
                {loading && <Loading />}
                <Modal open={openModal}>
                    <div className="text-center ">
                        <KeyRound className="w-10 h-10 text-[var(--primary-cyan)] mx-auto mb-4" />
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">Aktivasi Akun</h3>
                        <p className="text-gray-600 mb-2">
                            Pendaftaran Anda berhasil! Untuk mengaktifkan akun, kami telah mengirimkan kode verifikasi 6 digit ke alamat Email dan Whatsapp Anda: <span className="font-semibold text-gray-900"></span>.
                        </p>
                        <div className='grid'>
                            <b>{formatContactMasked(user?.email)}</b>
                            <b>{formatContactMasked(user?.whatsapp)}</b>
                        </div>
                        <OtpInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            isInputNum
                            shouldAutoFocus
                            inputStyle={styles.otpInput}
                            containerStyle={styles.otpContainer}
                        />
                        <div className='px-4 pt-8'>
                            {error && <p className="text-center text-red-500 text-sm mb-4 mt-[-20px]">{error}</p>}
                        </div>

                        <div className='text-center text-[#444444] mt-3' style={{ letterSpacing: "-0.04em" }}>
                            {!counter ? (
                                <p className="text-sm text-gray-500 mt-4" onClick={handleResend}>
                                    Belum menerima kode? <span onClick={handleResendOtp} id="resend-otp-link" className="font-medium text-[var(--secondary-orange)] hover:text-orange-600">Kirim ulang kode verifikasi</span>
                                </p>
                            ) : (
                                <span className='font-[500] text-[14px]'>
                                    Kirim ulang dalam <strong className='text-[17px] font-bold'>{formatTime(counter)}</strong>
                                </span>
                            )}
                            <br />
                            {/* <span className='font-bold text-[14px]'>Gunakan metode verifikasi lain</span>. */}
                        </div>
                    </div>
                </Modal>
            </div>
        </div>

    )
}

const styles = {
    otpContainer: {
        justifyContent: 'center',
        marginTop: '30px',
    },
    otpInput: {
        border: `2px solid #00CFFF`,
        width: '3rem',
        height: '3rem',
        fontSize: '1.5rem',
        margin: '0 0.25rem',
        borderRadius: '10px',
        outline: 'none'
    },
};

export default FormPanel