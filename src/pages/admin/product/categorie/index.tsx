import React, { useState, useMemo, useEffect, useCallback, ReactElement } from "react";
import MainLayout from "../../Layout/MainLayout";
import FilterComponent from "@/Components/CRUD/FilterComponent";
import DataTable from "@/Components/CRUD/DataTable";
import { Get } from "@/utils/Get";
import { Meta } from "@/Types/Public";
import ModalDelete from "@/Components/CRUD/ModalDelete";
import { Post } from "@/utils/Post";
import { useAlert } from "@/Context/AlertContext";
import { Delete } from "@/utils/Delete";
import CategorieFormModalContent from "@/Components/Admin/product/CategorieFormModalContent";
import { ResCategorie } from "@/Types/Product/CategorieState";

interface Column<T> {
    key: keyof T;
    label?: string;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (row: T) => React.ReactNode;
}


export default function CategoriePage() {
    const { showFinalAlert, simulateProcess } = useAlert();
    const [search, setSearch] = useState("");
    const [dateRangeText, setDateRangeText] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [dataUpdate, setDataUpdate] = useState<ResCategorie | null>(null)
    const [deleteData, setDeleteData] = useState<ResCategorie | null>(null)
    const [categorie, setCategorie] = useState<ResCategorie[]>([]);
    const [error, setError] = useState<string>('');
    const [meta, setMeta] = useState<Meta>({
        last_page: 1,
        limit: 10,
        page: 1,
        total: 0,
    });
    const [debouncedSearch, setDebouncedSearch] = useState('');
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search);
        }, 800);

        return () => clearTimeout(handler);

    }, [search]);

    const parsedDate = useMemo(() => {
        if (!dateRangeText.includes(" - ")) return { start_date: "", end_date: "" };

        const [start, end] = dateRangeText.split(" - ");

        return {
            start_date: new Date(start).toISOString().slice(0, 10),
            end_date: new Date(end).toISOString().slice(0, 10),
        };
    }, [dateRangeText]);


    const queryString = useMemo(() => {
        let pages = 0
        if (debouncedSearch?.trim() != '') {
            pages = 1
            setPage(1)
        }
        const params = {
            page: pages > 0 ? pages : page,
            limit: itemsPerPage,
            search: debouncedSearch,
            start_date: parsedDate.start_date || "",
            end_date: parsedDate.end_date || "",
        };

        return (
            "?" +
            Object.entries(params)
                .map(([key, value]) => `${key}=${encodeURIComponent(value ?? "")}`)
                .join("&")
        );
    }, [parsedDate, page, debouncedSearch, itemsPerPage]);

    const fetchCategorie = useCallback(async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: ResCategorie[]; meta: Meta }>(
                `/categorie${queryString}`
            );

            if (res?.success) {
                setCategorie(res.data);
                setMeta(res.meta);
                setLoading(false)
            }
        } catch (err: any) {
            setError(err?.message)
            setLoading(false)
        }
        setLoading(false)
    }, [queryString]);

    useEffect(() => {
        fetchCategorie();
    }, [fetchCategorie, page]);

    // Komponen (handleFormSubmit) (Perbaikan: Kirim formData asli)

    const handleFormSubmit = async (formData: FormData, id: number | null) => {
        try {
            simulateProcess();

            if (id) {
                const res = await Post(`/categorie/${id}`, formData);
                if (res) {
                    fetchCategorie()
                    setDataUpdate(null)
                    showFinalAlert('success', 'Berhasil', 'Tambah produk berhasil')
                    setIsModalOpen(false);
                }
            } else {
                const res = await Post('/categorie', formData);
                if (res) {
                    fetchCategorie()
                    showFinalAlert('success', 'Berhasil', 'Tambah produk berhasil')
                    setIsModalOpen(false);
                }
            }
        } catch (err: any) {
            showFinalAlert(
                'error',
                'Gagal Koneksi!',
                err.message
            );
            console.log(err.message || "Gagal mengambil data");
        }
    };
    const onDelete = async (id: number | null) => {
        try {
            simulateProcess();

            const res = await Delete(`/categorie/${id}`);
            if (res) {
                fetchCategorie();
                setDeleteData(null)
                showFinalAlert('success', 'Berhasil', 'Hapus kategori berhasil')
                setIsModalOpen(false);
            }
        } catch (err: any) {
            showFinalAlert(
                'error',
                'Gagal!',
                err.message
            );
            console.log(err.message || "Gagal mengambil data");
        }
    };

    const handleResetFilter = () => {
        setSearch("");
        setDateRangeText("");
    };

    const columns: Column<ResCategorie>[] = useMemo(
        () => [
            {
                key: "image",
                label: "Image",
                width: "200",
                render: (row) => row?.image && <img src={row.image} className="w-32 rounded-md" />,
            },
            { key: "name", label: "Nama Kategori" },
        ],
        []
    );

    const handleEdit = (row: ResCategorie) => {
        setIsModalOpen(true)
        setDataUpdate(row)
    }
    const handleDelete = (row: ResCategorie) => {
        setIsModalOpen(true)
        setDeleteData(row)
    }

    return (
        <div>
            <FilterComponent
                search={search}
                setSearch={setSearch}
                dateRangeText={dateRangeText}
                setDateRangeText={setDateRangeText}
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                setPage={setPage}
                handleReset={handleResetFilter}
                setIsModalOpenForm={setIsModalOpen}
            />

            <div className="mt-6">
                <DataTable
                    data={categorie}
                    columns={columns}
                    page={page}
                    itemsPerPage={itemsPerPage}
                    total={meta.total}
                    onPageChange={(p) => setPage(p)}
                    onEdit={(row) => handleEdit(row)}
                    onDelete={(row) => handleDelete(row)}
                    loading={loading}
                    error={error}
                />
            </div>
            {
                deleteData ?
                    <ModalDelete
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false)
                            setDeleteData(null)
                        }}
                        deleteData={deleteData}
                        handleDelete={onDelete} /> :
                    <CategorieFormModalContent
                        isOpen={isModalOpen}
                        onClose={() => {
                            setIsModalOpen(false)
                            setDataUpdate(null)
                        }}
                        onSubmit={handleFormSubmit}
                        dataUpdate={dataUpdate}
                    />
            }
        </div>
    );
};

CategoriePage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};
