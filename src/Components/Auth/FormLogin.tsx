import React from 'react'

type Props = {}

const FormLogin = (props: Props) => {
    return (

        <form className="space-y-6">
            {/* <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm font-medium" role="alert">
                sdsdsd
            </div> */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                <input type="email" id="login-email" name="email" required
                    placeholder="nama@perusahaan.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--secondary-orange)] focus:border-[var(--secondary-orange)] outline-none transition duration-150" />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
                <input type="password" id="login-password" name="password" required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--secondary-orange)] focus:border-[var(--secondary-orange)] outline-none transition duration-150" />
            </div>

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[var(--secondary-orange)] border-gray-300 rounded focus:ring-[var(--secondary-orange)]" />
                    <label className="ml-2 text-gray-600">Ingat Saya</label>
                </div>
                <a href="#" className="font-medium text-primary-cyan hover:text-sky-600 transition duration-150">Lupa Kata Sandi?</a>
            </div>

            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[var(--secondary-orange)] hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--secondary-orange)] transition duration-300 transform hover:scale-[1.01]">
                Masuk ke NexusFlow
            </button>
        </form>
    )
}

export default FormLogin