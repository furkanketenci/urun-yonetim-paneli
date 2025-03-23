import { Button, Input, Modal, notification, Switch } from "antd"
import "./index.scss";
import { Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { addProduct, updateProduct } from "../../redux/productsSlice";
import { AppDispatch, RootState } from "../../redux/store";
import { showAndHide } from "../../redux/modalSlice";

interface IProductForm {
    productName: string;
    productImage?: string;
    productPrice: number;
    stockInformation: boolean;
    stockQuantity: number;
    productWeight: number;
}

const AddAndEditProductForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { modalContent: editingProduct, isShow } = useSelector((state: RootState) => state.modal);
    const loading = useSelector((state: RootState) => state.products.loading);


    const [api, contextHolder] = notification.useNotification();

    const showModalTrigger = (isShowModal: boolean) => {
        dispatch(showAndHide(isShowModal))
    }

    const onSubmitHandler = (values: IProductForm, { resetForm }: FormikHelpers<IProductForm>) => {
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
                api.success({
                    message: '',
                    description: 'Ürün başarıyla güncellendi!'
                });
            }).catch((error) => {
                console.log("Ürün güncellenirken hata oluştu : ", error)
                api.error({
                    message: '',
                    description: 'Ürün güncellenirken bir hata oluştu!'
                });
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
                api.success({
                    message: '',
                    description: 'Ürün başarıyla eklendi!'
                });
            }).catch((error) => {
                console.log("Ürün eklenirken hata oluştu : ", error)
                api.error({
                    message: '',
                    description: 'Ürün eklenirken bir hata oluştu!'
                });
            })
        }
    }
    return (
        <>
            {contextHolder}
            <Modal
                open={isShow}
                onCancel={() => showModalTrigger(false)}
                footer={null}
            >
                <Formik<IProductForm>
                    initialValues={
                        editingProduct ? {
                            productName: editingProduct.productName,
                            productImage: editingProduct.productImage,
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
                        productImage: Yup.string()
                            .trim()
                            .matches(
                                /https/i,
                                "URL 'https' içermelidir"
                            )
                            .matches(
                                /(webp|jpeg|jpg|png|gif)/i,
                                "URL webp, jpeg, jpg, png veya gif formatında olmalıdır"
                            )
                            .nullable(),
                        productPrice: Yup.number().min(1, "Ürün fiyatı 1'den Küçük Olamaz!").required("Ürün Fiyatı Zorunlu Alandır!"),
                        stockInformation: Yup.boolean().required("Stok Durum Bilgisi Zorunlu Alandır!"),
                        stockQuantity: Yup.number()
                            .when("stockInformation", {
                                is: true,
                                then: (schema) => schema.min(1, "Stok Adet Bilgisi En Az 1 Olmalıdır!").required("Stok Adet Bilgisi Zorunlu Alandır!"),
                                otherwise: (schema) => schema.min(0, "Stok Adedi 0'dan Küçük Olamaz!").max(0, "Stok Olmadığından Dolayı Stok Adedi 0 olmalıdır.").required("Stok Adet Bilgisi Zorunlu Alandır!"),
                            })
                            .required("Stok Adet Bilgisi Zorunlu Alandır!"),
                        productWeight: Yup.number().min(1, "Ürün Ağırlık Bilgisi 1'den Küçük Olamaz!").required("Ürün Ağırlık Bilgisi Zorunlu Alandır!"),

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
                                    {errors.productImage && touched.productImage && (
                                        <div className="errorMessage">{errors.productImage}</div>
                                    )}
                                </div>

                                <div className="formSection">
                                    <div className="formFieldTitle">Ürün Fiyatı:</div>
                                    <Input
                                        type="number"
                                        placeholder="Lütfen Ürün Fiyatını Giriniz"
                                        name="productPrice"
                                        value={values.productPrice || undefined}
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
                                        value={values.stockQuantity || undefined}
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
                                        value={values.productWeight || undefined}
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
        </>
    )
}

export default AddAndEditProductForm