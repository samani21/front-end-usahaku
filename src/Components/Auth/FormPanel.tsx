import React, { useState } from 'react'
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';

const FormPanel = () => {
    const [handleAuth, setHandleAuth] = useState<string>('Masuk');
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
                    <button id="tab-login" onClick={() => setHandleAuth("Masuk")}
                        className={`flex-1 py-2 rounded-full text-base font-semibold transition duration-300 ${handleAuth === "Masuk" ? 'text-base bg-[var(--secondary-orange)] text-white shadow-md' : 'bg-transparent text-gray-600 hover:text-gray-900'}`}>
                        Masuk
                    </button>
                    <button id="tab-signup" onClick={() => setHandleAuth("Register")}
                        className={`flex-1 py-2 rounded-full text-base font-semibold transition duration-300 ${handleAuth === "Register" ? 'text-base bg-[var(--primary-cyan)] text-white shadow-md' : 'bg-transparent text-gray-600 hover:text-gray-900'}`}>
                        Daftar
                    </button>
                </div>
                {
                    handleAuth === 'Masuk' ? <FormLogin /> : <FormRegister />
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

            </div>
        </div>

    )
}

export default FormPanel