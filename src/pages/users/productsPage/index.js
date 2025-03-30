import { memo } from "react"
import Breadcrumb from "../theme/breadcrumb";
import "./style.scss";
import { Link } from "react-router-dom";
import { categories } from "../theme/header";
import { ROUTERS } from "utils/router";
import img1Feat from "assets/users/image/featured/Sakamoto.jpg";
import img2Feat from "assets/users/image/featured/nhagiakim.jpg";
import img3Feat from "assets/users/image/featured/conan.jpg";
import img4Feat from "assets/users/image/featured/nikolatesla.jpg";
import img5Feat from "assets/users/image/featured/ketromsach.jpg";
import img6Feat from "assets/users/image/featured/thuchoem.jpg";
import img7Feat from "assets/users/image/featured/Atackontitan.jpg";
import img8Feat from "assets/users/image/featured/goctoiansaumoicaunoi.jpg";
import { ProductCard } from "component";
const ProductsPage = () => {

    const sorts = [
        "Giá Thấp Đến Cao",
        "Giá Cao Đến Thấp",
        "Cũ Đến Mới",
        "Mới Đến Cũ",
        "Đang Giảm Giá",
        "Bán Chạy Nhất",
    ]
    const products = [
        {
            img: img1Feat,
            name: "Truyện Sakamoto",
            price: 42750
        },
        {
            img: img2Feat,
            name: "Nhà Giả Kim",
            price: 63200
        },
        {
            img: img3Feat,
            name: "Truyện Conan",
            price: 22500
        },
        {
            img: img4Feat,
            name: "Nikola Tesla Tự Truyện",
            price: 108000
        },
        {
            img: img5Feat,
            name: "Kẻ Trộm Sách",
            price: 186750
        },
        {
            img: img6Feat,
            name: "Kẻ Trộm Sách",
            price: 186750
        },
        {
            img: img7Feat,
            name: "Truyện Attack on Titan",
            price: 45600
        },
        {
            img: img8Feat,
            name: "Góc Tối Ẩn Sau Mỗi Câu Nói",
            price: 104250
        }
    ]

    return <>
        <Breadcrumb name="Danh Sách Sản Phẩm" />
        <div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-12 col-sm-12 col-xs-12">
                    <div className="sidebar">
                        <div className="sidebar_item">
                            <h2>Tìm Kiếm</h2>
                            <input type="text" />
                        </div>
                        <div className="sildebar_item">
                            <h2>Mức Giá</h2>
                            <div className="price_range_wrap">
                                <div>
                                    <p>Từ:</p>
                                    <input type="number" min={0} />
                                </div>
                                <div>
                                    <p>Đến:</p>
                                    <input type="number" min={0} />
                                </div>
                            </div>
                        </div>
                        <div className="sidebar_item">
                            <h2>Sắp Xếp</h2>
                            <div className="tags">
                                {sorts.map((item, key) => (
                                    <div className={`tag ${key === 0 ? "active" : ""}`} key={key}>
                                        {item}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="sidebar_item">
                            <h2>Thể Loại Khác</h2>
                            <ul>
                                {categories.map((name, key) => (
                                    <li key={key}>
                                        <Link to={ROUTERS.USER.PRODUCTS}>{name}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="col-lg-9 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                        {
                            products.map((item, key) => (  
                                    <div className="col-lg-4 col-md-4 col-sm-6 col-xs-12" key={key}>
                                        <ProductCard name={item.name} img={item.img} price={item.price} />
                                    </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    </>;
};

export default memo(ProductsPage);