// utils/Post.ts (Perbaikan: Tambahkan AxiosRequestConfig)
import { apiClient } from "./apiClient";
import { AxiosRequestConfig } from "axios"; // 👈 Import tipe ini

export async function Post<T, D>(
    path: string,
    data: D,
    config?: AxiosRequestConfig // 👈 Tambahkan parameter config opsional
): Promise<T> {
    try {
        // Lewatkan config ke apiClient.post
        const response = await apiClient.post<T>(path, data, config);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            `Gagal mengirim data ke ${path}`
        );
    }
}