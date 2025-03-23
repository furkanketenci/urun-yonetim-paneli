import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { useEffect, useState } from "react";
import { allProducts, deleteProduct } from "../../redux/productsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Button, Modal, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IProduct } from "../../types";
import { setModalContent, showAndHide } from "../../redux/modalSlice";

const ProductList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [isShowDeleteModal, setIsShowDeleteModal] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
    const { items, loading } = useSelector((state: RootState) => state.products);

    useEffect(() => {
        dispatch(allProducts())
    }, [dispatch])

    const updateModalTrigger = (data: any) => {
        dispatch(setModalContent(data))
        dispatch(showAndHide(true))
    }

    const handleDelete = async () => {
        if (!selectedProductId) return;

        try {
            await dispatch(deleteProduct(selectedProductId)).unwrap();
            hideDeleteModal();
        } catch (error) {
            console.log('Ürün silinirken bir hata oluştu');
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

    const columns: ColumnsType<IProduct> = [
        {
            title: "Ürün Adı",
            dataIndex: "productName",
            key: "productName",
            align: "center",
            sorter: (a, b) => a.productName.localeCompare(b.productName),
            sortDirections: ['ascend', 'descend'],
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
                <Space size="middle">
                    <Button
                        type="primary"
                        onClick={() => {
                            updateModalTrigger(item)
                            showDeleteModal(item.id)
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
        <div className="productListContainer">
            <Table
                columns={columns}
                dataSource={items}
                loading={loading}
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
    )
}
export default ProductList
