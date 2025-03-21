import { useDispatch, useSelector } from "react-redux";
import "./index.scss";
import { useEffect } from "react";
import { allProducts } from "../../redux/productsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { Button, Space, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { IProduct } from "../../types";

const ProductList = () => {
    const { items, loading } = useSelector((state: RootState) => state.products);

    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(allProducts())
    }, [dispatch])

    console.log("items", items)

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
            render: () => (
                <Space size="middle">
                    <Button type="primary">
                        Güncelle
                    </Button>
                    <Button type="primary" danger>
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
        </div>
    )
}
export default ProductList
