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
            <div className="productsTitle">PRODUCTS</div>
            <div className="productsButtonWrapper">
                <Button
                    onClick={toggleAddProductForm}
                    className="productsBtn"
                >
                    Add New Product
                </Button>

                {isShowAddProductForm &&
                    <AddProductForm
                        visibleModal={isShowAddProductForm}
                        closeModal={toggleAddProductForm}
                        isCompleted={toggleAddProductForm}
                    />
                }
            </div>
        </div>
    )
}

export default Products