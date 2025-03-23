import { Button, Input, Modal, Switch } from "antd"
import "./index.scss";
import { Formik } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/productsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { showAndHide } from "../../redux/modalSlice";

interface IProductAddForm {
    productName: string;
    productImage?: string;
    productPrice: number;
    stockInformation: boolean;
    stockQuantity: number;
    productWeight: number;
}

const AddAndEditProductForm = () => {
    const { modalContent: editingProduct, isShow } = useSelector((state: RootState) => state.modal);

    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: any) => state.products.loading);

    const showModalTrigger = (isShowModal: boolean) => {
        dispatch(showAndHide(isShowModal))
    }

    const onSubmitHandler = (values: IProductAddForm, { resetForm }: any) => {
        if (editingProduct) {
            dispatch(updateProduct({
                ...editingProduct,
                productName: values.productName,
                productImage: values.productImage || '',
                productPrice: values.productPrice,
                productWeight: values.productWeight,
                stockInformation: values.stockInformation,
                stockQuantity: values.stockQuantity
            })).unwrap().then(() => {
                resetForm();
                showModalTrigger(false);
            }).catch((error) => {
                console.log("Ürün güncellenirken hata oluştu : ", error)
            })
        } else {
            dispatch(addProduct({
                productName: values.productName,
                productImage: values.productImage || '',
                productPrice: values.productPrice,
                productWeight: values.productWeight,
                stockInformation: values.stockInformation,
                stockQuantity: values.stockQuantity
            })).unwrap().then(() => {
                resetForm();
                showModalTrigger(false);
            }).catch((error) => {
                console.log("Ürün eklenirken hata oluştu : ", error)
            })
        }
    }
    return (
        <Modal
            open={isShow}
            onCancel={() => showModalTrigger(false)}
            footer={null}
        >
            <Formik<IProductAddForm>
                initialValues={
                    editingProduct ? {
                        productName: editingProduct.productName,
                        // productImage: editingProduct.productImage,
                        productPrice: editingProduct.productPrice,
                        stockInformation: editingProduct.stockInformation,
                        stockQuantity: editingProduct.stockQuantity,
                        productWeight: editingProduct.productWeight,
                    } : {
                        productName: "",
                        productImage: "",
                        productPrice: 0,
                        stockInformation: true,
                        stockQuantity: 0,
                        productWeight: 0,
                    }
                }
                enableReinitialize
                validationSchema={Yup.object({
                    productName: Yup.string().required("Ürün Adı Zorunlu Alandır!"),
                    productPrice: Yup.number().min(1, "Ürün fiyatı Negatif Değer Olamaz!").required("Ürün Fiyatı Zorunlu Alandır!"),
                    stockInformation: Yup.boolean().required("Stok Durum Bilgisi Zorunlu Alandır!"),
                    stockQuantity: Yup.number().min(0, "Stok Adet Bilgisi Negatif Değer Olamaz!").required("Stok Adet Bilgisi Zorunlu Alandır!"),
                    productWeight: Yup.number().min(1, "Ürün Ağırlık Bilgisi Negatif Değer Olamaz!").required("Ürün Ağırlık Bilgisi Zorunlu Alandır!"),

                })}
                onSubmit={onSubmitHandler}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    resetForm,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <div className="addProductFormContainer">
                            <div className="formSection">
                                <div className="formFieldTitle">Ürün Adı:</div>
                                <Input
                                    type="text"
                                    name="productName"
                                    placeholder="Lütfen Ürün Adı Giriniz"
                                    value={values.productName}
                                    onChange={handleChange}
                                    status={errors.productName && touched.productName ? 'error' : ''}
                                />
                                {errors.productName && touched.productName && (
                                    <div className="errorMessage">{errors.productName}</div>
                                )}
                            </div>
                            <div className="formSection">
                                <div className="formFieldTitle">Ürün Fotoğrafı:</div>
                                <Input
                                    type="text"
                                    placeholder="Lütfen Ürün Fotoğrafı Ekleyiniz"
                                    name="productImage"
                                    onChange={handleChange}
                                    value={values.productImage}
                                    status={errors.productImage && touched.productImage ? 'error' : ''}
                                />
                            </div>
                            <div className="formSection">
                                <div className="formFieldTitle">Ürün Fiyatı:</div>
                                <Input
                                    type="number"
                                    placeholder="Lütfen Ürün Fiyatını Giriniz"
                                    name="productPrice"
                                    value={values.productPrice}
                                    status={errors.productPrice && touched.productPrice ? 'error' : ''}
                                    onChange={handleChange}
                                />
                                {errors.productPrice && touched.productPrice && (
                                    <div className="errorMessage">{errors.productPrice}</div>
                                )}
                            </div>
                            <div className="formSection">
                                <div className="formFieldTitle">Stok Durumu:</div>
                                <Switch
                                    onChange={(checked) =>
                                        handleChange({
                                            target: {
                                                name: 'stockInformation',
                                                value: checked,
                                            },
                                        })
                                    }
                                    id="stockInformation"
                                    checked={values.stockInformation}
                                />
                                {errors.stockInformation && touched.stockInformation && (
                                    <div className="errorMessage">{errors.stockInformation}</div>
                                )}
                            </div>
                            <div className="formSection">
                                <div className="formFieldTitle">Stok Adet Bilgisi:</div>
                                <Input
                                    type="number"
                                    placeholder="Lütfen Stok Adet Bilgisi Giriniz"
                                    name="stockQuantity"
                                    value={values.stockQuantity ?? ""}
                                    onChange={handleChange}
                                    status={errors.stockQuantity && touched.stockQuantity ? 'error' : ''}
                                />
                                {errors.stockQuantity && touched.stockQuantity && (
                                    <div className="errorMessage">{errors.stockQuantity}</div>
                                )}
                            </div>
                            <div className="formSection">
                                <div className="formFieldTitle">Ürün Ağırlık Bilgisi:</div>
                                <Input
                                    name="productWeight"
                                    type="number"
                                    placeholder="Lütfen Ürün Ağırlık Bilgisi Giriniz"
                                    value={values.productWeight}
                                    onChange={handleChange}
                                    status={errors.productWeight && touched.productWeight ? 'error' : ''}
                                />
                                {errors.productWeight && touched.productWeight && (
                                    <div className="errorMessage">{errors.productWeight}</div>
                                )}
                            </div>
                            <div className="formFooter">
                                <Button
                                    className="cancelBtn"
                                    onClick={() => resetForm()}
                                >
                                    Formu Resetle
                                </Button>
                                <Button type="primary" htmlType="submit" disabled={loading}>
                                    {loading ? "Kaydediliyor" : "Kaydet"}
                                </Button>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </Modal>
    )
}

export default AddAndEditProductForm