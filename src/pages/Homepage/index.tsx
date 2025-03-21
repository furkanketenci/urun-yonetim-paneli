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
                Ürün Yönetim Paneline Hoş Geldiniz!
            </div>
            <div className="homepageSubText">Kullanıcılar bu panelde diledikleri zaman yeni ürün ekleyebilir, mevcut ürünlerini listeleyebilir, durumlarını güncelleyebilir ve ürünleri silebilir.
            </div>
            <Button
                type="text"
                className="homepageBtn"
                onClick={redirectFunc}
            >
                Başlamak için buraya tıklayın!
            </Button>
        </div>
    )
}

export default Homepage