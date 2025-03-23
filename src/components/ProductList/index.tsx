import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { useEffect, useState } from "react";
import { allProducts, deleteProduct } from "../../redux/productsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Button, Input, Modal, notification, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IProduct } from "../../types";
import { setModalContent, showAndHide } from "../../redux/modalSlice";
import { useMediaQuery } from "react-responsive";
import { breakpoints } from "../../utils/responsive";

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();

    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>(searchTerm);

    const { items, loading } = useSelector((state: RootState) => state.products);
    const [api, contextHolder] = notification.useNotification();

    useEffect(() => {
        dispatch(allProducts())
    }, [dispatch])

    const updateModalTrigger = (data: IProduct) => {
        dispatch(setModalContent(data))
        dispatch(showAndHide(true))
    }

    const handleDelete = async () => {
        if (!selectedProductId) return;

        try {
            await dispatch(deleteProduct(selectedProductId)).unwrap();
            hideDeleteModal();
            api.success({
                message: '',
                description: 'Ürün başarıyla silindi!'
            });
        } catch (error) {
            console.log('Ürün silinirken bir hata oluştu!');
            api.error({
                message: '',
                description: 'Ürün silinirken bir hata oluştu!'
            });
        }
    }

    const showDeleteModal = (productId: number) => {
        setSelectedProductId(productId);
        setIsShowDeleteModal(true)
    }

    const hideDeleteModal = () => {
        setIsShowDeleteModal(false);
        setSelectedProductId(null);
    }

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);

        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm]);

    const filteredItems = items.filter(item =>
        item.productName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
    const isMobile = useMediaQuery({ maxWidth: breakpoints.xl });

    const columns: ColumnsType<IProduct> = [
        {
            title: "Ürün Adı",
            dataIndex: "productName",
            key: "productName",
            align: "center",
            sorter: (a, b) => a.productName.localeCompare(b.productName),
            sortDirections: ['ascend', 'descend'],
            ellipsis: true
        },
        {
            title: "Ürün Resmi",
            dataIndex: "productImage",
            key: "productImage",
            align: "center",
            render: (img: string) => img ? <img className="tableProductImage" src={img} alt="urun-fotografi" /> : <span className="noPhotoInfo">-</span>
        },
        {
            title: "Ürün Fiyatı",
            dataIndex: "productPrice",
            key: "productPrice",
            align: "center",
            sorter: (a, b) => a.productPrice - b.productPrice,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: "Stok Durum",
            dataIndex: "stockInformation",
            key: "stockInformation",
            align: "center",
            render: (stockInformation: boolean) => (
                <span className={stockInformation ? 'in-stock' : 'out-of-stock'}>
                    {stockInformation ? 'Stokta' : 'Stokta Değil'}
                </span>
            ),
        },
        {
            title: "Stok Adedi",
            dataIndex: "stockQuantity",
            key: "stockQuantity",
            align: "center",
            sorter: (a, b) => a.stockQuantity - b.stockQuantity,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: "Ürün Ağırlığı",
            dataIndex: "productWeight",
            key: "productWeight",
            align: "center",
            sorter: (a, b) => a.productWeight - b.productWeight,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'İşlemler',
            key: 'actions',
            align: "center",
            render: (_, item) => (
                <Space size={isMobile ? "small" : "middle"} direction={isMobile ? "vertical" : "horizontal"}>
                    <Button
                        type="primary"
                        onClick={() => {
                            updateModalTrigger(item)
                        }}>
                        Güncelle
                    </Button>
                    <Button type="primary" danger onClick={() => showDeleteModal(item.id)}>
                        Sil
                    </Button>
                </Space>
            ),
        },
    ]


    return (
        <>
            {contextHolder}
            <div className="productListContainer">
                <Input
                    className="searchInput"
                    placeholder="Ürün adı ile ara..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <Table
                    columns={columns}
                    dataSource={filteredItems}
                    loading={loading}
                    size="large"
                    rowClassName={() => 'table-row'}
                    scroll={{ x: 992 }}
                />
                <Modal
                    open={isShowDeleteModal}
                    title="Bu işlemi yapmak istediğinize emin misiniz?"
                    onOk={handleDelete}
                    onCancel={hideDeleteModal}
                    confirmLoading={loading}
                >
                </Modal>
            </div>
        </>
    )
}
export default ProductList
