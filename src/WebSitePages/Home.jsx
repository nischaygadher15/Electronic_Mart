import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_USER, selectUser } from "../Store/userSlice";
import style from "../WebSitePages/Home.module.css";
import products from "../JSON_Data/ProductsList.js";
import ReactPaginate from "react-paginate";
import { addToCart } from "../Store/cartSlice.js";
import { Button, Modal, NavLink } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../assets/Carousel_Images/c_banner1.png";
import banner2 from "../assets/Carousel_Images/c_banner2.png";
import banner3 from "../assets/Carousel_Images/c_banner3.png";
import banner4 from "../assets/Carousel_Images/c_banner4.png";

const Home = () => {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div className={style.homeWrapper}>
      <div className="homeCorousels" data-bs-theme="dark">
        <Carousel indicators={false} className={style.cars}>
          <Carousel.Item>
            <img
              className={`d-block w-100 ${style.carouselImg}`}
              src={banner1}
              alt="First slide"
            />
            <Carousel.Caption bsPrefix={style.carCaption}>
              <p style={{ fontSize: "16px", margin: "0px" }}>
                Get flat&nbsp;
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                  10%
                </span>
                &nbsp; Cashback
              </p>
              <h2
                style={{
                  fontSize: "50px",
                  fontWeight: "400",
                  margin: "30px 0px",
                }}
              >
                EXCITING DEALS ON <br /> TELEVISIONS
              </h2>

              <NavLink to="/product" className={style.shopNow}>
                SHOP NOW
              </NavLink>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={`d-block w-100 ${style.carouselImg}`}
              src={banner2}
              alt="First slide"
            />
            <Carousel.Caption bsPrefix={style.carCaption}>
              <p style={{ fontSize: "16px", margin: "0px" }}>
                Get flat&nbsp;
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                  10%
                </span>
                &nbsp; Cashback
              </p>
              <h2
                style={{
                  fontSize: "50px",
                  fontWeight: "400",
                  margin: "30px 0px",
                }}
              >
                EXCITING DEALS ON <br /> TELEVISIONS
              </h2>

              <NavLink to="/product" className={style.shopNow}>
                SHOP NOW
              </NavLink>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={`d-block w-100 ${style.carouselImg}`}
              src={banner3}
              alt="First slide"
            />
            <Carousel.Caption bsPrefix={style.carCaption}>
              <p style={{ fontSize: "16px", margin: "0px" }}>
                Get flat&nbsp;
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                  10%
                </span>
                &nbsp; Cashback
              </p>
              <h2
                style={{
                  fontSize: "50px",
                  fontWeight: "400",
                  margin: "30px 0px",
                }}
              >
                EXCITING DEALS ON <br /> TELEVISIONS
              </h2>

              <NavLink to="/product" className={style.shopNow}>
                SHOP NOW
              </NavLink>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className={`d-block w-100 ${style.carouselImg}`}
              src={banner4}
              alt="First slide"
            />
            <Carousel.Caption bsPrefix={style.carCaption}>
              <p style={{ fontSize: "16px", margin: "0px" }}>
                Get flat&nbsp;
                <span style={{ fontSize: "30px", fontWeight: "bold" }}>
                  10%
                </span>
                &nbsp; Cashback
              </p>
              <h2
                style={{
                  fontSize: "50px",
                  fontWeight: "400",
                  margin: "30px 0px",
                }}
              >
                EXCITING DEALS ON <br /> TELEVISIONS
              </h2>

              <NavLink to="/product" className={style.shopNow}>
                SHOP NOW
              </NavLink>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    </div>
  );
};

export default Home;
