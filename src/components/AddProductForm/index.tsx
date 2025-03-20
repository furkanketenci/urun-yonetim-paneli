import { Modal } from "antd"

interface IAddProductForm {
    visibleModal: boolean;
    closeModal: () => void;
    isCompleted: () => void;
}

const AddProductForm: React.FC<IAddProductForm> = ({ visibleModal, closeModal, isCompleted }) => {
    return (
        <Modal
            open={visibleModal}
            onCancel={closeModal}
            onOk={isCompleted}

        >
            Add Product Form
        </Modal>
    )
}

export default AddProductForm