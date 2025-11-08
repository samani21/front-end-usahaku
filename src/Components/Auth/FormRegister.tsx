import React from 'react'

const FormRegister = () => {
    return (
        <form className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                <input type="email" id="signup-email" name="email" required
                    placeholder="nama@perusahaan.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-cyan)] focus:border-[var(--primary-cyan)] outline-none transition duration-150" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buat Kata Sandi</label>
                <input type="password" id="signup-password" name="password" required
                    placeholder="Minimal 8 karakter"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-cyan)] focus:border-[var(--primary-cyan)] outline-none transition duration-150" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Konfirmasi Kata Sandi</label>
                <input type="password" id="signup-confirm-password" name="confirm-password" required
                    placeholder="Ulangi kata sandi Anda"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--primary-cyan)] focus:border-[var(--primary-cyan)] outline-none transition duration-150" />
            </div>

            <div className="flex items-start">
                <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 text-[var(--primary-cyan)] border-gray-300 rounded focus:ring-[var(--primary-cyan)]" />
                <label className="ml-2 text-sm text-gray-600">
                    Saya setuju dengan <a href="#" className="font-medium text-[var(--primary-cyan)] hover:text-sky-600">Syarat & Ketentuan</a>
                </label>
            </div>

            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[var(--primary-cyan)] hover:bg-sky-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--primary-cyan)] transition duration-300 transform hover:scale-[1.01]">
                Daftar Akun Baru
            </button>
        </form>
    )
}

export default FormRegister