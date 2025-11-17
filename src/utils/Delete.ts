// utils/Delete.ts
import { apiClient } from "./apiClient";

export async function Delete<T = any>(path: string): Promise<T> {
  try {
    const response = await apiClient.delete<T>(path);
    // Mengembalikan data respons. Tipe default adalah 'any' atau bisa diganti sesuai respons backend.
    return response.data; 
  } catch (error: any) {
    // Melempar error agar bisa di-catch oleh komponen/store pemanggil
    throw new Error(
      error.response?.data?.message ||
      error.message ||
      `Gagal menghapus data dari ${path}`
    );
  }
}