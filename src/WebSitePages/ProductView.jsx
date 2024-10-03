import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import style from "./ProductView.module.css";
import data from "../JSON_Data/ProductsList.js";
import { useOutletContext } from "react-router-dom";
import smartWatch from "../assets/off1.png";
import smartPhone from "../assets/off2.png";
import { FaRegHandPointRight } from "react-icons/fa";
import p1 from "../assets/si1.png";
import p2 from "../assets/si2.png";
import p3 from "../assets/si3.png";
import { FiZoomIn } from "react-icons/fi";
import Carousel from "react-bootstrap/Carousel";

const ProductView = () => {
  // <=============================== Variable Declaration ===============================>

  let products = data.slice(0, data.length);
  let prdOtherImages = useRef(null);
  let [atvImg, setActiveImg] = useState(0);
  let [carouselTime, setCarsTime] = useState(1000);
  let imgArray = [p1, p2, p3];

  // <=============================== Image Magnify on Mouse Hover ===============================>

  let mouseMove = (e) => {
    let [prdImg] = document.getElementsByName(`IMG-${atvImg}`);
    let lens = document.querySelector(`.${style.magnifyLens}`);
    let magImg = document.querySelector(`.${style.magnifiedImg}`);
    let prdImgCox = prdImg.getBoundingClientRect();
    document.querySelector(`.${style.hoverZoomHint}`).style.display = "none";
    lens.classList.add(`${style.atv}`);
    magImg.classList.add(`${style.atv}`);
    let x = e.pageX - prdImgCox.left - lens.offsetWidth / 2;
    let y = e.pageY - prdImgCox.top - lens.offsetHeight / 2;
    let maxX = prdImgCox.width - lens.offsetWidth;
    let maxY = prdImgCox.height - lens.offsetHeight;
    let cx = magImg.offsetWidth / lens.offsetWidth;
    let cy = magImg.offsetHeight / lens.offsetHeight;

    if (x > maxX) x = maxX;
    if (x < 0) x = 0;
    if (y > maxY) y = maxY;
    if (y < 0) y = 0;

    lens.style.cssText = `top:${y}px; left:${x}px`;
    magImg.style.cssText = `background: #ffffff
      url("${prdImg.src}") no-repeat`;
    magImg.style.backgroundPosition = ` -${x * cx}px -${y * cy}px`;
    magImg.style.backgroundSize = `${prdImgCox.width * cx}px ${
      prdImgCox.height * cy
    }px`;
  };

  let hideLense = (e) => {
    let lens = document.querySelector(`.${style.magnifyLens}`);
    let magImg = document.querySelector(`.${style.magnifiedImg}`);
    document.querySelector(`.${style.hoverZoomHint}`).style.display = "flex";
    lens.classList.remove(`${style.atv}`);
    magImg.classList.remove(`${style.atv}`);
  };

  // Change Active Images

  // useEffect(() => {
  //   Array.from(prdOtherImages.current.children).map((i) => {
  //     i.addEventListener("click", (e) => {
  //       document
  //         .querySelector(`#${style.productImgActive}`)
  //         .setAttribute("src", `${e.target.src}`);
  //     });
  //   });
  // }, []);

  useEffect(() => {
    console.log(`ActiveImg: ${atvImg}`);
  }, [atvImg]);

  return (
    <div className={style.productViewWrapper}>
      {/* <================================= Title of Page =================================>   */}
      <div className={style.productTitle}>
        <h2 className="mb-4" style={{ fontSize: "25px" }}>
          <span className="fs-1">Product</span> Single Page
        </h2>
        <p className="mb-0 fw-semibold">
          HOME&nbsp; {">"} &nbsp;SINGLE PRODUCT 1
        </p>
      </div>

      {/* <================================= Products View section =================================>   */}
      <div className="row" id={style.productView}>
        {/* Product Images  */}
        <div className="col-5">
          <div className="productImgFrame">
            <div
              className={`${style.productImgBox} d-flex justify-content-center`}
              onMouseLeave={hideLense}
            >
              <Carousel
                className="w-100"
                controls={false}
                indicators={false}
                interval={carouselTime}
                pause={"hover"}
                onSelect={(e) => setActiveImg(e)}
              >
                {imgArray.map((i, inx) => {
                  return (
                    <Carousel.Item key={inx}>
                      <img
                        src={i}
                        className={style.productImgActive}
                        onMouseMove={mouseMove}
                        name={`IMG-${inx}`}
                      />
                    </Carousel.Item>
                  );
                })}
              </Carousel>
              {/* <img
                src={p2}
                id={style.productImgActive}
                onMouseMove={mouseMove}
                className="w-100"
              /> */}

              <div
                className={style.magnifyLens}
                onMouseMove={mouseMove}
                onMouseLeave={hideLense}
              ></div>
              <div className={style.hoverZoomHint}>
                <FiZoomIn />
                <span>Hover Over To Zoom</span>
              </div>
            </div>
            <div
              className="d-flex justify-content-center mt-2"
              ref={prdOtherImages}
            >
              <img src={p1} className={style.productImg} />
              <img src={p2} className={style.productImg} />
              <img src={p3} className={style.productImg} />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="col-7 position-relative">
          <h3 className="productTitle">
            Redmi 9 Prime (Space Blue, 64 GB) (4 GB RAM)
          </h3>
          <p>$360.00 Free delivery</p>
          <p>Cash on Delivery Eligible.</p>
          <p>Shipping Speed to Delivery.</p>
          <p>EMIs from $100/month.</p>
          <p>Bank Offer Extra 5% off* with Axis Bank Buzz Credit Card</p>
          <hr className="" />
          <div className="productDesc">
            <p>
              <FaRegHandPointRight />
              &nbsp; 1 Year Manufacturer Warranty
            </p>
            <ul className="ps-3">
              <li>
                Handset, Power Adapter, USB Type-C Cable, SIM Eject Tool, Simple
                Protective Cover, Warranty Card, User Guide
              </li>
              <li>Full HD+ IPS Display</li>
              <li>13MP Rear Camera | 8MP Front Camera</li>
              <li>5020 mAh</li>
              <li>2340 x 1080 Pixels</li>
            </ul>
          </div>
          <hr className="" />
          <p>
            <FaRegHandPointRight />
            &nbsp; Net banking & Credit/ Debit/ ATM card
          </p>
          <button className="btn btn-primary add2CartBtn">ADD TO CART</button>

          {/* Magnified Images Div */}
          <div className={style.magnifiedImg}></div>
        </div>
      </div>

      {/* <================================= Product Offers =================================>   */}
      <div className="row g-5 m-0" id={style.offerWrapper}>
        <div className="col-6 mt-0 px-4">
          <a href="#">
            <div className={`row ${style.offer}`}>
              <div className="col-6 d-flex flex-column justify-content-center">
                <span style={{ fontSize: "18px" }}>
                  New Collections, New Trendy
                </span>
                <p className="fs-2 fw-bold">Smart Watches</p>
                <span style={{ fontSize: "18px" }}>
                  Sale up to 25% off all in store
                </span>
              </div>
              <div className="col-6">
                <img src={smartWatch} alt="Smart Watch" className="img-fluid" />
              </div>
            </div>
          </a>
        </div>
        <div className="col-6 mt-0 px-4">
          <a href="#">
            <div className={`row ${style.offer}`}>
              <div className="col-6 d-flex flex-column justify-content-center">
                <span style={{ fontSize: "18px" }}>
                  Top Brands, lowest Prices
                </span>
                <p className="fs-2 fw-bold">Smart Phones</p>
                <span style={{ fontSize: "18px" }}>
                  Free shipping order over $100
                </span>
              </div>
              <div className="col-6">
                <img src={smartPhone} alt="Smart Watch" className="img-fluid" />
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
