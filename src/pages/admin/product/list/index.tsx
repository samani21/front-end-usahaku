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
import ProductFormModalContent from "@/Components/Admin/product/ProductFormModalContent";
import { ResProduct } from "@/Types/Product/ProductState";

interface Column<T> {
    key: keyof T;
    label?: string;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (row: T) => React.ReactNode;
}


export default function ListProductPage() {
    const { showFinalAlert, simulateProcess } = useAlert();
    const [search, setSearch] = useState("");
    const [dateRangeText, setDateRangeText] = useState("");
    const [page, setPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false)
    const [dataUpdate, setDataUpdate] = useState<ResProduct | null>(null)
    const [deleteData, setDeleteData] = useState<ResProduct | null>(null)
    const [products, setProducts] = useState<ResProduct[]>([]);
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

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true)
            const res = await Get<{ success: boolean; data: ResProduct[]; meta: Meta }>(
                `/products${queryString}`
            );

            if (res?.success) {
                setProducts(res.data);
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
        fetchProducts();
    }, [fetchProducts, page]);

    // Komponen (handleFormSubmit) (Perbaikan: Kirim formData asli)

    const handleFormSubmit = async (formData: FormData, id: number | null) => {
        try {
            simulateProcess();

            if (id) {
                const res = await Post(`/products/${id}`, formData);
                if (res) {
                    fetchProducts()
                    setDataUpdate(null)
                    showFinalAlert('success', 'Berhasil', 'Tambah produk berhasil')
                    setIsModalOpen(false);
                }
            } else {
                const res = await Post('/products', formData);
                if (res) {
                    fetchProducts()
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

            const res = await Delete(`/products/${id}`);
            if (res) {
                fetchProducts();
                setDeleteData(null)
                showFinalAlert('success', 'Berhasil', 'Hapus produk berhasil')
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

    const columns: Column<ResProduct>[] = useMemo(
        () => [
            {
                key: "image",
                label: "Image",
                width: "200",
                render: (row) => <img src={row.image} className="w-32 rounded-md" />,
            },
            { key: "name", label: "Nama Produk" },

            {
                key: "description",
                label: "Deskripsi",
                width: "200",
                render: (row) => (
                    <p className="overflow-hidden text-ellipsis line-clamp-3">{row.description}</p>
                ),
            },

            {
                key: "has_variant",
                label: "Varian",
                render: (row) =>
                    row.variants?.map((v, i) => (
                        <b key={i}>
                            {v.name}
                            {row.variants.length !== i + 1 && ", "}
                        </b>
                    )),
            },

            {
                key: "price",
                label: "Harga",
                align: "right",
                width: "150",
                render: (row) => `Rp ${row.price.toLocaleString("id-ID")}`,
            },

            {
                key: "stock",
                label: "Stok",
                render: (row) => row.stock.toLocaleString("id-ID"),
            },
            {
                key: "qrcode",
                label: "qrcode",
                width: "200",
                render: (row) => <img src={row.qrcode} className="w-32 rounded-md" />,
            },
            {
                key: "is_active",
                label: "Status",
                align: "center",
                render: (row: any) => {
                    const statusColor =
                        row.is_active === 1
                            ? "bg-green-100 text-green-800"
                            : row.is_active === 2
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"

                    return (
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}>
                            {row.is_active === 1 ? "Active" : row.is_active === 2 ? "Diblokir" : "Tidak Aktif"}
                        </span>
                    )
                }
            }
        ],
        []
    );

    const handleEdit = (row: ResProduct) => {
        setIsModalOpen(true)
        setDataUpdate(row)
    }
    const handleDelete = (row: ResProduct) => {
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
                    data={products}
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
                    <ProductFormModalContent
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

ListProductPage.getLayout = function getLayout(page: ReactElement) {
    // Di sinilah Halaman dibungkus oleh MainLayout (dan AlertProvider di dalamnya)
    return <MainLayout>{page}</MainLayout>;
};
