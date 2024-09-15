import React, {
  forwardRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_USER, selectUser } from "../Store/userSlice";
import style from "../WebSitePages/Home.module.css";
import products from "../JSON_Data/ProductsList.js";
import ReactPaginate from "react-paginate";
import { addToCart } from "../Store/cartSlice.js";
import {
  Accordion,
  Badge,
  Button,
  Card,
  Modal,
  NavLink,
} from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import banner1 from "../assets/Carousel_Images/c_banner1.png";
import banner2 from "../assets/Carousel_Images/c_banner2.png";
import banner3 from "../assets/Carousel_Images/c_banner3.png";
import banner4 from "../assets/Carousel_Images/c_banner4.png";
import data from "../JSON_Data/ProductsList.js";
import { nanoid } from "@reduxjs/toolkit";
import { useOutletContext } from "react-router-dom";
import ReactSlider from "react-slider";

const Home = () => {
  //Varialble Declaration
  let home = useRef(0);
  let AppWrapper = useOutletContext();
  const [index, setIndex] = useState(0);
  let products = data.slice(0, data.length);
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 12;
  let endOffset = itemOffset + itemsPerPage;
  let pageCount = Math.ceil(products.length / itemsPerPage);
  let [currentItems, setCurrentItems] = useState([
    ...products.slice(itemOffset, endOffset),
  ]);
  let [currentPage, setCurrentPage] = useState(1);
  let categories = [
    "Television",
    "Mobile",
    "Headphones",
    "Computes",
    "Cameras",
    "iPad & Tablets",
  ];

  //Home Carosel
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  //Pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setCurrentPage(parseInt(event.selected + 1));
    setItemOffset(newOffset);
    console.log(AppWrapper);
    setTimeout(() => {
      AppWrapper.current.scrollTo({
        top: "500",
        left: "0",
        behavior: "smooth",
      });
    }, 300);
  };

  useEffect(() => {
    currentItems = products.slice(itemOffset, endOffset);
    setCurrentItems(currentItems);
  }, [itemOffset]);

  useEffect(
    () => console.log(`Current Page: ${currentPage}/${pageCount}`),
    [currentPage]
  );

  return (
    <div className={style.homeWrapper} ref={home}>
      {/* <================================= Home Corousel =================================>   */}
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
      <div className={style.productsArea}>
        <h2
          className="text-center fs-1"
          style={{ paddingTop: "50px", color: "#060606" }}
        >
          <span className="fw-normal">Our</span> New Products
        </h2>
        <div className="row g-4" style={{ padding: "50px 0px" }}>
          <div className="col-3">
            {/* <========================= Filters Section ========================> */}
            <div id={style.filterSection}>
              <div className={style.filterContainer}>
                <h3 className="fs-4 mb-0">Filters</h3>
              </div>
              <hr className="m-0 p-0" />

              {/* <========================= Category Filter ========================> */}
              <div className={style.filterContainer}>
                <label
                  htmlFor="selCategory"
                  className="form-label"
                  style={{
                    fontSize: "18px",
                    fontWeight: "500",
                    marginBottom: "24px",
                  }}
                >
                  Categories
                </label>
                <select id="selCategory" className="form-select">
                  <option value="empty">Select Category</option>
                  {categories.map((c, inx) => {
                    return (
                      <>
                        <option key={inx} value={c.toLocaleLowerCase()}>
                          {c}
                        </option>
                      </>
                    );
                  })}
                </select>
              </div>
              <hr className="m-0 p-0" />

              {/* <========================= Price Filter ========================> */}
              <div className={style.filterContainer}>
                <div className="priceFilter">
                  <p
                    style={{
                      fontSize: "18px",
                      fontWeight: "500",
                      marginBottom: "24px",
                    }}
                  >
                    Price Range
                  </p>
                  <ReactSlider
                    className="horizontal-slider"
                    thumbClassName="example-thumb"
                    trackClassName="example-track"
                    defaultValue={[2000, 8000]}
                    ariaLabel={["minVal", "maxVal"]}
                    renderThumb={(props, state) => (
                      <div {...props}>
                        <h6>
                          <Badge bsPrefix={style.priceSliderLabel}>
                            &#8377;&nbsp;{state.valueNow}
                          </Badge>
                        </h6>
                      </div>
                    )}
                    pearling
                    min={0}
                    max={10000}
                    minDistance={1000}
                    onChange={(value, inx) => {
                      console.log(`Value: ${value}, Thumb: ${inx}`);
                    }}
                  />
                </div>
              </div>
              <hr className="m-0 p-0" />

              {/* <========================= Discount Filter ========================> */}
              <div className={style.filterContainer}>
                <Accordion className={style.MyAccordian}>
                  <Accordion.Item defaultActiveKey="0">
                    <Accordion.Header id={style.accHeader}>
                      Discount
                    </Accordion.Header>
                    <Accordion.Body className={style.myBody}>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="discountFilterVal"
                        />{" "}
                        50% or more
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="discountFilterVal"
                        />{" "}
                        40% or more
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="discountFilterVal"
                        />{" "}
                        30% or more
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="discountFilterVal"
                        />{" "}
                        20% or more
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="discountFilterVal"
                        />{" "}
                        10% or more
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="discountFilterVal"
                        />{" "}
                        Less than 10%
                      </label>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <hr className="m-0 p-0" />

              {/* <========================= Size Filter ========================> */}
              <div className={style.filterContainer}>
                <Accordion className={style.MyAccordian}>
                  <Accordion.Item defaultActiveKey="0">
                    <Accordion.Header id={style.accHeader}>
                      Size
                    </Accordion.Header>
                    <Accordion.Body className={style.myBody}>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="sizeFilterVal"
                        />{" "}
                        X-Large
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="sizeFilterVal"
                        />{" "}
                        Large
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="sizeFilterVal"
                        />{" "}
                        Medium
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="sizeFilterVal"
                        />{" "}
                        Small
                      </label>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <hr className="m-0 p-0" />

              {/* <========================= Customer Rating Filter ========================> */}
              <div className={style.filterContainer}>
                <Accordion className={style.MyAccordian}>
                  <Accordion.Item defaultActiveKey="0">
                    <Accordion.Header id={style.accHeader}>
                      Customer Rating
                    </Accordion.Header>
                    <Accordion.Body className={style.myBody}>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="cusRateFilterVal"
                        />{" "}
                        4&nbsp;
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "#FCB92C", fontSize: "10px" }}
                        />
                        &nbsp;&&nbsp; Above
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="cusRateFilterVal"
                        />{" "}
                        3&nbsp;
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "#FCB92C", fontSize: "10px" }}
                        />
                        &nbsp;&&nbsp; Above
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="cusRateFilterVal"
                        />{" "}
                        2&nbsp;
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "#FCB92C", fontSize: "10px" }}
                        />
                        &nbsp;&&nbsp; Above
                      </label>
                      <label className="d-flex align-items-center mb-2">
                        <input
                          type="radio"
                          className="me-1"
                          name="cusRateFilterVal"
                        />{" "}
                        1&nbsp;
                        <i
                          class="fa-solid fa-star"
                          style={{ color: "#FCB92C", fontSize: "10px" }}
                        />
                      </label>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
          <div className="col-9">
            <div id={style.mainArea}>
              {/* <========================= Products Grid ========================> */}
              <div className="mb-5" id={style.productGrid}>
                {currentItems.map((p, inx) => {
                  return (
                    <Card
                      style={{
                        padding: "16px 0",
                        position: "relative",
                        overflow: "hidden",
                      }}
                      key={`product${inx}`}
                    >
                      <Card.Img
                        variant="top"
                        src={p.image[0]}
                        style={{
                          width: "180px",
                          height: "200px",
                          margin: "auto",
                          padding: "20px 16px",
                        }}
                        className={`img-fluid ${style.cardImg}`}
                      />
                      <button className={`btn ${style.quickViewBtn}`}>
                        Quick View
                      </button>
                      <Card.Body>
                        <Card.Title className="text-center mb-2">
                          <span>{`${p.title.substring(0, 15)}...`}</span>
                        </Card.Title>
                        <Card.Text>
                          <p className="text-center text-danger fw-bold mb-2">
                            {`Price : $${p.price}`}
                          </p>
                        </Card.Text>
                        <div className="add2Cart text-center">
                          <button className={`btn ${style.add2Cart}`}>
                            ADD TO CART
                          </button>
                        </div>
                      </Card.Body>
                    </Card>
                  );
                })}
              </div>

              {/* <========================= Pagination ========================> */}
              <div className="pagination d-flex justify-content-between align-items-center">
                <span>
                  Page {currentPage} Of {pageCount}
                </span>
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={5}
                  pageCount={pageCount}
                  previousLabel="<"
                  renderOnZeroPageCount={null}
                  id={style.mypaginate}
                  pageClassName={style.liTag}
                  containerClassName={style.containerPg}
                  pageLinkClassName={style.aClass}
                  activeClassName={style.activeliTag}
                  activeLinkClassName={style.activeAClass}
                  previousClassName={style.prevBtnLi}
                  nextClassName={style.nextBtnLi}
                  previousLinkClassName={style.prevBtnA}
                  nextLinkClassName={style.nextBtnA}
                  disabledClassName={style.disabledBtn}
                  disabledLinkClassName={style.disabledLink}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
