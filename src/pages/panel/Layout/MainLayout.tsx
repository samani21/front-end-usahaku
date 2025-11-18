
import Loading from '@/Components/component/Loading';
import Header from '@/Components/Panel/Layout/Header';
import SidebarComponent from '@/Components/Panel/Layout/SidebarComponent';
import { getToken } from '@/store/authStore';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const token = getToken();
    const router = useRouter();
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [isMobileActionMenuOpen, setIsMobileActionMenuOpen] = useState<boolean>(false);
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState<boolean>(false);
    const pathname = usePathname();
    // "/panel/product/list"
    const [loading, setLoading] = useState<boolean>(false);
    const segments = pathname.split("/").filter(Boolean);
    // ["panel","product","list"]
    const lastOne = segments.slice(-1);

    const breadcrumb = segments.map((seg, index) => {
        if (index === 0) return "Home"; // panel → Home
        return seg.charAt(0).toUpperCase() + seg.slice(1);
    });

    // --- FUNGSI BARU UNTUK APLIKASI ---
    const closeMobileActionMenu = () => setIsMobileActionMenuOpen(false);

    // Fungsi placeholder untuk aksi Notifikasi
    const handleNotificationClick = () => {
        console.log("Aksi Notifikasi: Memuat halaman notifikasi...");
        closeMobileActionMenu();
        // Logika sebenarnya di sini (misalnya: navigasi ke halaman Notifikasi)
    };

    // Fungsi placeholder untuk aksi Profile
    const handleProfileClick = () => {
        console.log("Aksi Profil: Memuat halaman profil pengguna...");
        closeMobileActionMenu();
        // Logika sebenarnya di sini (misalnya: navigasi ke halaman Profil)
    };


    // --- AKHIR FUNGSI BARU ---


    // Menutup menu aksi mobile saat di luar area menu (untuk mobile)
    useEffect(() => {
        const handleOutsideClick = (event: any) => {
            if (isMobileActionMenuOpen) {
                // Menggunakan ref yang lebih sesuai untuk elemen React, 
                // tetapi karena menggunakan id/DOM manipulation di useEffect ini (yang tidak disarankan di React),
                // kita harus berhati-hati. Namun, pendekatan DOM ini dipertahankan karena adanya id pada elemen.
                const mobileActionBtn = document.getElementById('mobile-action-btn');
                const menu = document.getElementById('mobile-action-menu');

                if (mobileActionBtn && menu) {
                    const isClickInsideButton = mobileActionBtn.contains(event.target);
                    const isClickInsideMenu = menu.contains(event.target);

                    // Menutup menu jika TIDAK diklik di tombol atau di dalam menu
                    if (!isClickInsideButton && !isClickInsideMenu) {
                        setIsMobileActionMenuOpen(false);
                    }
                }
            }
        };

        // Tambahkan listener saat menu terbuka
        if (isMobileActionMenuOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        // Cleanup listener
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isMobileActionMenuOpen]); // Hanya jalankan ulang saat isMobileActionMenuOpen berubah

    // Fungsi untuk menutup menu hamburger saat ukuran layar berubah (logika sebelumnya dipertahankan)
    useEffect(() => {
        if (!token) {
            router?.push('/auth/login')
            return
        }
        const handleResize = () => {
            if (window.innerWidth >= 768) { // md: breakpoint
                setIsMobileActionMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    const handleLogout = () => {
        setLoading(true)
        localStorage?.removeItem('token');
        localStorage?.removeItem('user');
        router?.push('/auth/login')
    }
    return (
        <div className="flex h-screen overflow-hidden bg-[#f7f9fc]">
            <SidebarComponent
                isActivityDropdownOpen={isActivityDropdownOpen}
                setIsActivityDropdownOpen={setIsActivityDropdownOpen}
                isSidebarOpen={isSidebarOpen}
                setIsSidebarOpen={setIsSidebarOpen} />
            <div className="flex-1 flex flex-col overflow-hidden bg-[#f7f9fc]">
                <Header
                    setIsSidebarOpen={setIsSidebarOpen}
                    isSidebarOpen={isSidebarOpen}
                    setIsMobileActionMenuOpen={setIsMobileActionMenuOpen}
                    isMobileActionMenuOpen={isMobileActionMenuOpen}
                    closeMobileActionMenu={closeMobileActionMenu}
                    handleNotificationClick={handleNotificationClick}
                    handleProfileClick={handleProfileClick}
                    title={lastOne}
                    handleLogout={handleLogout}
                />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6 md:pt-0">
                    <nav className="text-sm pb-4">
                        <ol className="flex items-center text-gray-600">
                            {breadcrumb.map((p, i) => (
                                <li key={i} className="flex items-center">
                                    <a href="#" className={`${i === breadcrumb.length - 1 ? 'font-medium text-gray-900' : 'hover:text-gray-900'}`}>{p}</a>
                                    {i < breadcrumb.length - 1 && (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mx-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                    {children}
                </main>
            </div>
            {
                loading && <Loading />
            }
        </div>
    )
}

export default MainLayout