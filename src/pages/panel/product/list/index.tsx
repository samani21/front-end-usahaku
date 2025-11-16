import React, { useState, useMemo, useEffect } from 'react'
import MainLayout from '../../Layout/MainLayout'
import FilterComponent from '@/Components/CRUD/FilterComponent'
import DataTable from '@/Components/CRUD/DataTable'
import ProductFormModalContent from '@/Components/Panel/product/ProductFormModalContent';
interface RowData {
    id: string;
    client: string;
    date: string;
    amount: number;
    status: string;
}

interface Column<T> {
    key: keyof T;
    label: string;
    align?: "left" | "center" | "right";
    render?: (row: T) => React.ReactNode;
}

const ListProductPage: React.FC = () => {
    const [dateRangeText, setDateRangeText] = useState('')
    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const data = useMemo(
        () =>
            Array.from({ length: 120 }).map((_, i) => ({
                id: `TRX${String(i + 1).padStart(3, '0')}`,
                client: `Klien ${i + 1}`,
                date: `2025-11-${String((i % 28) + 1).padStart(2, '0')}`,
                amount: (i + 1) * 5000,
                status:
                    i % 3 === 0 ? 'Berhasil' :
                        i % 3 === 1 ? 'Tertunda' : 'Gagal',
            })),
        []
    )

    // Apply search
    const filteredData = data.filter((item) =>
        item.client.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase())
    )

    const total = filteredData.length

    const currentData = filteredData.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    )

    useEffect(() => {
        window.document.documentElement.classList.remove('dark');
        localStorage.removeItem('theme');
    }, []);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleFormSubmit = (formData: FormData) => {
        console.log("Data Produk Siap Dikirim ke API (Simulasi Pengiriman):");

        for (let pair of formData.entries()) {
            if (pair[1] instanceof File) {
                console.log(`[FILE] ${pair[0]}: ${pair[1].name} (${pair[1].type})`);
            } else {
                console.log(`${pair[0]}: ${pair[1]}`);
            }
        }

        console.log("--- SIMULASI SELESAI ---");
        console.log("Formulir berhasil dikirim! Data FormData ada di konsol. Modal ditutup.");
        setIsModalOpen(false);
    };
    const handleReset = () => {
        setSearch('')
        setDateRangeText('')
    }

    // ============================
    // 📌 TABLE COLUMNS
    // ============================
    const columns: Column<RowData>[] = [
        { key: "id", label: "ID Transaksi" },
        { key: "client", label: "Nama Klien" },
        { key: "date", label: "Tanggal" },
        {
            key: "amount",
            label: "Jumlah",
            align: "right",
            render: (row: any) =>
                `Rp ${row.amount.toLocaleString("id-ID")}`,
        },
        {
            key: "status",
            label: "Status",
            align: "center",
            render: (row: any) => {
                const statusColor =
                    row.status === "Berhasil"
                        ? "bg-green-100 text-green-800"
                        : row.status === "Tertunda"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"

                return (
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                        {row.status}
                    </span>
                )
            }
        }
    ]

    return (
        <MainLayout>

            {/* FILTER SECTION */}
            <FilterComponent
                search={search}
                setSearch={setSearch}
                dateRangeText={dateRangeText}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setPage={setPage}
                handleReset={handleReset}
                setDateRangeText={setDateRangeText}
                setIsModalOpenForm={setIsModalOpen}
            />

            {/* TABLE */}
            <div className="mt-6">
                <DataTable
                    data={currentData}
                    columns={columns}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    total={total}
                    onPageChange={(p) => setPage(p)}
                    onEdit={(row) => console.log("Edit:", row)}
                    onDelete={(row) => console.log("Delete:", row)}
                />
            </div>
            <ProductFormModalContent
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
            />

        </MainLayout>
    )
}

export default ListProductPage
