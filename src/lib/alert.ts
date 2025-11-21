export interface AlertProps {
    title: string;
    message: string;
    // Tambahkan prop untuk fungsi penutup, wajib untuk Success dan Error
    onClose?: () => void;
}

// Interface untuk objek alert yang disimpan di state (tanpa ID)
export interface CurrentAlert {
    type: 'success' | 'error' | 'loading';
    title: string;
    message: string;
}