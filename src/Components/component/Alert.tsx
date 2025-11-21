import { AlertProps } from "@/lib/alert";
import { CheckCircle, Loader, X, XCircle } from "lucide-react";
import React from "react";

export const LoadingAlert: React.FC<AlertProps> = ({ title, message }) => {
    return (
        <div
            role="status"
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-xl transition-all duration-500 ease-out transform translate-y-0 opacity-100 flex items-start space-x-3 w-80 mb-4 animate-pulse"
        >
            {/* Loader icon dengan animasi spin */}
            <Loader className="h-6 w-6 text-blue-600 flex-shrink-0 mt-0.5 animate-spin" />
            <div className="flex-grow">
                <h3 className="text-base font-semibold text-blue-800">{title}</h3>
                <p className="text-sm text-blue-700 mt-0.5">{message}</p>
            </div>
            {/* Tidak ada tombol tutup di sini */}
        </div>
    );
};

export const SuccessAlert: React.FC<AlertProps> = ({ title, message, onClose }) => {
    // Komponen ini tidak mengelola isVisible internal, agar parent bisa mengontrolnya
    return (
        <div
            role="alert"
            className="p-4 bg-teal-50 border border-teal-200 rounded-lg shadow-xl transition-all duration-500 ease-out transform translate-y-0 opacity-100 flex items-start space-x-3 w-80 mb-4"
        >
            <CheckCircle className="h-6 w-6 text-teal-600 flex-shrink-0 mt-0.5" />
            <div className="flex-grow">
                <h3 className="text-base font-semibold text-teal-800">{title}</h3>
                <p className="text-sm text-teal-700 mt-0.5">{message}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-auto p-1 rounded-full text-teal-500 hover:bg-teal-200 transition-colors"
                    aria-label="Tutup notifikasi"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};

export const ErrorAlert: React.FC<AlertProps> = ({ title, message, onClose }) => {
    // Komponen ini tidak mengelola isVisible internal, agar parent bisa mengontrolnya
    return (
        <div
            role="alert"
            className="p-4 bg-red-50 border border-red-200 rounded-lg shadow-xl transition-all duration-500 ease-out transform translate-y-0 opacity-100 flex items-start space-x-3 w-80 mb-4"
        >
            <XCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-grow">
                <h3 className="text-base font-semibold text-red-800">{title}</h3>
                <p className="text-sm text-red-700 mt-0.5">{message}</p>
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="ml-auto p-1 rounded-full text-red-500 hover:bg-red-200 transition-colors"
                    aria-label="Tutup notifikasi"
                >
                    <X className="h-4 w-4" />
                </button>
            )}
        </div>
    );
};