// utils/Post.ts
import { apiClient } from "./apiClient";

export async function Post<T, D>(path: string, data: D): Promise<T> {
    try {
        const response = await apiClient.post<T>(path, data);
        return response.data;
    } catch (error: any) {
        throw new Error(
            error.response?.data?.message ||
            error.message ||
            `Gagal mengirim data ke ${path}`
        );
    }
}