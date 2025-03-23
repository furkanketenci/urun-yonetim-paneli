import { Button } from "antd"
import "./index.scss"
import AddAndEditProductForm from "../../components/AddAndEditProductForm";
import { useDispatch } from "react-redux";
import { showAndHide } from "../../redux/modalSlice";
import ProductList from "../../components/ProductList";

const Products = () => {
    const dispatch = useDispatch();

    const showModalTrigger = (isShowModal: boolean) => {
        dispatch(showAndHide(isShowModal))
    }

    return (
        <div className="productsContainer">
            <div className="productsTitle">ÜRÜNLER</div>
            <div className="productsButtonWrapper">
                <Button
                    onClick={() => showModalTrigger(true)}
                    className="productsBtn"
                    type="primary"
                >
                    Yeni Ürün Ekle
                </Button>

                <AddAndEditProductForm />
            </div>
            <ProductList />
        </div>
    )
}

export default Products