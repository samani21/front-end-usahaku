// utils/Get.ts
import { getToken } from "@/store/authStore";
import { apiClient } from "./apiClient";


export async function Get<T>(path: string): Promise<T> {
    const token = getToken();
    try {
        const response = await apiClient.get<T>(path);
        // Asumsi data yang relevan berada langsung di response.data
        return response.data;
    } catch (error: any) {
        if (!token) {
            window.location.href = '/auth/login';
        }
        // Melempar error agar bisa di-catch oleh komponen/store pemanggil
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            `Gagal mengambil data dari ${path}`
        );
    }
}