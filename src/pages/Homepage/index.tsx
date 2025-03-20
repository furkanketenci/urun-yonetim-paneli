import { Button } from "antd";
import "./index.scss"
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();

    const redirectFunc = () => {
        navigate("/products")
    }

    return (
        <div className="homepageContainer">
            <div className="homepageText">
                Welcome to the Product Management Panel!
            </div>
            <div className="homepageSubText">In this panel, users can add new products, list existing products, update their status, and delete products whenever they wish.
            </div>
            <Button
                type="text"
                className="homepageBtn"
                onClick={redirectFunc}
            >
                Click here to get started!
            </Button>
        </div>
    )
}

export default Homepage