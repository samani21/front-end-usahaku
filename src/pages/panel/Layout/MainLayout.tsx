
import Header from '@/Components/Panel/Layout/Header';
import SidebarComponent from '@/Components/Panel/Layout/SidebarComponent';
import React, { useEffect, useState } from 'react'

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
    const [isMobileActionMenuOpen, setIsMobileActionMenuOpen] = useState<boolean>(false);
    const [isActivityDropdownOpen, setIsActivityDropdownOpen] = useState<boolean>(false);
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

    // Fungsi placeholder untuk aksi Logout
    const handleLogoutClick = () => {
        console.log("Aksi Keluar: Melakukan proses logout...");
        closeMobileActionMenu();
        // Logika sebenarnya di sini (misalnya: memanggil API Logout)
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
        const handleResize = () => {
            if (window.innerWidth >= 768) { // md: breakpoint
                setIsMobileActionMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                    handleLogoutClick={handleLogoutClick} />

                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}

export default MainLayout