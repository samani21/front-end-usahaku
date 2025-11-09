import { useRouter } from 'next/router';
import React, { useState } from 'react'
type Props = {
    login: (data: any) => Promise<boolean>;
}
const FormLogin = ({ login }: Props) => {
    const route = useRouter();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const success = await login(form);
        if (success) {
            route?.push('/')
        }
    };
    return (

        <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Alamat Email</label>
                <input type="email" id="login-email" name="email" required
                    placeholder="nama@perusahaan.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--secondary-orange)] focus:border-[var(--secondary-orange)] outline-none transition duration-150" onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kata Sandi</label>
                <input type="password" id="login-password" name="password" required
                    placeholder="••••••••"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--secondary-orange)] focus:border-[var(--secondary-orange)] outline-none transition duration-150" onChange={(e) => setForm({ ...form, password: e.target.value })} />
            </div>

            <div className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                    <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-[var(--secondary-orange)] border-gray-300 rounded focus:ring-[var(--secondary-orange)]" />
                    <label className="ml-2 text-gray-600">Ingat Saya</label>
                </div>
                <p onClick={() => route?.push('/auth/forgot-password')} className="cursor-pointer font-medium text-primary-cyan hover:text-sky-600 transition duration-150">Lupa Kata Sandi?</p>
            </div>

            <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg text-lg font-bold text-white bg-[var(--secondary-orange)] hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--secondary-orange)] transition duration-300 transform hover:scale-[1.01]">
                Masuk ke UsahaKu
            </button>
        </form>
    )
}

export default FormLogin