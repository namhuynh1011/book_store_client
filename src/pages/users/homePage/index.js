import imgCat1 from "../../../assets/users/images/categories/truyen.jpg";
import imgCat2 from "../../../assets/users/images/categories/giaokhoa.jpg";
import imgCat3 from "../../../assets/users/images/categories/lichsu.jpg";
import imgCat4 from "../../../assets/users/images/categories/tieusu.jpg";
import imgCat5 from "../../../assets/users/images/categories/vanhoc.jpg";

// import banner
import img1Feat from "assets/users/images/featured/Sakamoto.jpg";
import img2Feat from "assets/users/images/featured/ketromsach.jpg";

import { useGetCategoriesUS, useGetProductUS } from "api/homePage";
import { ProductCard } from "component";
import { memo } from "react";
import Carousel from "react-multi-carousel";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "./style.scss";
import { AiOutlineShoppingCart } from "react-icons/ai";

const HomePage = () => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const { data: categories } = useGetCategoriesUS();

  const { data: products } = useGetProductUS();

  const renderFeaturedProducts = () => {
    let tabList = [];
    const tabPanels = [];

    tabList.push(
      categories?.map((category) => (
        <Tab key={category.id}>{category.name}</Tab>
      ))
    );

    categories?.forEach((category) => {
      tabPanels.push(
        products
          ?.filter((product) => product.category_id === category.id)
          .map((product) => (
            <div
              className="col-lg-3 col-md-4 col-sm-6 col-xs-12"
              key={product.id}
            >
              <ProductCard product={product} />
            </div>
          ))
      );
    });

    return (
      <Tabs defaultChecked={0}>
        <TabList>{tabList}</TabList>
        {tabPanels.map((item, index) => {
          return (
            <TabPanel key={index}>
              <div className="row">{item}</div>
            </TabPanel>
          );
        })}
      </Tabs>
    );
  };

  const sliderItems = [
    {
      bgImg: imgCat1,
      name: "Truyện Tranh",
    },
    {
      bgImg: imgCat2,
      name: "Sách Giáo Khoa",
    },
    {
      bgImg: imgCat3,
      name: "Sách Lịch Sử",
    },
    {
      bgImg: imgCat4,
      name: "Sách Tiểu Sử",
    },
    {
      bgImg: imgCat5,
      name: "Sách Văn Học",
    },
  ];

  return (
    <>
      {/* Categories Begin */}
      <div className="container container_categories_slider">
        <Carousel responsive={responsive} className="categories_slider">
          {sliderItems.map((item, key) => (
            <div className="categories_slider_item" key={key}>
              <img
                src={item.bgImg}
                alt={item.name}
                className="category-image"
              />
              <p>{item.name}</p>
            </div>
          ))}
        </Carousel>
      </div>
      {/*categories end*/}
      {/*Featured begin*/}
      <div className="container">
        <div className="featured">
          <div className="section_title">
            <h2>Sản Phẩm Nổi Bật</h2>
          </div>
          {renderFeaturedProducts()}
        </div>
      </div>
      {/*Featured end*/}
      {/*Banner begin*/}
      <div className="container">
        <div className="banner">
          <div className="banner_item">
            <div className="banner_content">
              <h3>Truyện hay</h3>
              <p>
                100% xuất bản
                <br />
                chính gốc.
              </p>
              <button className="buy_now">
                <AiOutlineShoppingCart className="icon" />
                MUA NGAY
              </button>
            </div>
            <div className="banner_pic">
              <img src={img1Feat} alt="Trái cây tươi" />
            </div>
          </div>
          <div className="banner_item">
            <div className="banner_content">
              <h3>Tiểu Thuyết</h3>
              <p>
                Ý nghĩa
                <br />
                sâu sắc .
              </p>
              <button className="buy_now">
                <AiOutlineShoppingCart className="icon" />
                MUA NGAY
              </button>
            </div>
            <div className="banner_pic">
              <img src={img2Feat} alt="Sữa trái cây" />
            </div>
          </div>
        </div>
      </div>

      {/* Banner End */}
    </>
  );
};

export default memo(HomePage);
