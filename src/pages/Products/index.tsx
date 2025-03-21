import { Button } from "antd"
import "./index.scss"
import { useState } from "react";
import AddProductForm from "../../components/AddProductForm";

const Products = () => {
    const [isShowAddProductForm, setIsShowAddProductForm] = useState(false);

    const toggleAddProductForm = () => {
        setIsShowAddProductForm(!isShowAddProductForm)
    }

    return (
        <div className="productsContainer">
            <div className="productsTitle">ÜRÜNLER</div>
            <div className="productsButtonWrapper">
                <Button
                    onClick={toggleAddProductForm}
                    className="productsBtn"
                >
                    Yeni Ürün Ekle
                </Button>

                {isShowAddProductForm &&
                    <AddProductForm
                        visibleModal={isShowAddProductForm}
                        closeModal={toggleAddProductForm}
                    />
                }
            </div>
        </div>
    )
}

export default Products