import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import ReactPaginate from "react-paginate";
import data from "../../JSON_Data/ProductsList";
import style from "../Admin/ViewProducts_2.module.css";
import AdminFooter from "./AdminFooter";
import { Accordion, Badge, Card } from "react-bootstrap";
import { MdModeEdit } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { nanoid } from "@reduxjs/toolkit";
import ReactSlider from "react-slider";

const ViewProducts_2 = () => {
  //Varialble Declaration
  let products = data.slice(0, data.length);
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 6;
  let endOffset = itemOffset + itemsPerPage;
  let pageCount = Math.ceil(products.length / itemsPerPage);
  let [currentItems, setCurrentItems] = useState([
    ...products.slice(itemOffset, endOffset),
  ]);
  let [currentPage, setCurrentPage] = useState(1);
  let viewWrapper = useRef(null);
  let categories = [
    "Television",
    "Mobile",
    "Headphones",
    "Computes",
    "Cameras",
    "iPad & Tablets",
  ];

  //Pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setCurrentPage(parseInt(event.selected + 1));
    setItemOffset(newOffset);
    setTimeout(() => {
      viewWrapper.current.scrollTo({
        top: "130",
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

  //Edit
  let handelEdit = (e) => {
    console.log(e.currentTarget.parentElement.id);
    //Write Functionality here
  };

  //Delete
  let handelDelete = (e) => {
    console.log(e.currentTarget.parentElement.id);
    //Write Functionality here
  };

  return (
    <>
      <div id={style.viewWrapper} ref={viewWrapper}>
        <div style={{ padding: "24px" }}>
          {/* <========================= Header ========================> */}
          <div className="d-flex justify-content-between mb-3 text-black">
            <span className="fw-bold">VIEW PRODUCT</span>
            <span style={{ color: "#505D69" }}>
              Ecommerce &nbsp;
              <i
                className="fa-solid fa-greater-than"
                style={{ fontSize: "12px" }}
              />{" "}
              &nbsp;View Products
            </span>
          </div>

          {/* <========================= Main Section ========================> */}
          <div id="viewProdctsMain">
            <div className="row">
              <div className="col-3">
                {/* <========================= Filters Section ========================> */}
                <div id={style.filterSection}>
                  <div className={style.filterContainer}>
                    <h3 className="fs-5 mb-0">Filters</h3>
                  </div>
                  <hr className="m-0 p-0" />

                  {/* <========================= Category Filter ========================> */}
                  <div className={style.filterContainer}>
                    <label
                      htmlFor="selCategory"
                      className="form-label fs-6 fw-semibold"
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
                              className="fa-solid fa-star"
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
                              className="fa-solid fa-star"
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
                              className="fa-solid fa-star"
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
                              className="fa-solid fa-star"
                              style={{ color: "#FCB92C", fontSize: "10px" }}
                            />
                          </label>
                        </Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                  </div>
                </div>
                {/* <========================= End of Filters Section ========================> */}
              </div>

              <div className="col-9">
                {/* <========================= Products Section ========================> */}
                <div id={style.viewSection}>
                  <div className="mb-3 d-flex justify-content-between align-items-center">
                    <span className="fs-5 fw-semibold">Products</span>
                    <div id={style.searchBox}>
                      <i
                        className="fa-solid fa-magnifying-glass"
                        id={style.searchIcon}
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search here..."
                        style={{ paddingLeft: "40px" }}
                      />
                    </div>
                  </div>

                  {/* <========================= Sort By Filter ========================> */}
                  <div className="mb-3 d-flex align-items-center">
                    <label
                      htmlFor="sortByFilter"
                      className="form-label mb-0 me-2 fw-semibold"
                    >
                      Sort By :
                    </label>
                    <select
                      id="sortByFilter"
                      className="form-select w-25 sortByFilter"
                    >
                      <option value="low2high">Select</option>
                      <option value="low2high">Popularity</option>
                      <option value="low2high">Newest</option>
                      <option value="low2high">Price Low to High</option>
                      <option value="low2high">Price High to Low</option>
                    </select>
                  </div>

                  {/* <========================= Products Grid ========================> */}
                  <div className="mb-4" id={style.productGrid}>
                    {currentItems.map((p, inx) => {
                      return (
                        <Card
                          style={{
                            width: "auto",
                            borderRadius: "0px",
                          }}
                          key={`product${inx}`}
                        >
                          <div
                            className="actionBtn w-100 d-flex justify-content-between p-2 position-absolute"
                            id="p.id"
                          >
                            {/* Edit Button */}
                            <label
                              htmlFor="edit"
                              className="form-label rounded bg-primary mb-0 d-flex justify-content-center align-items-center"
                              style={{
                                cursor: "pointer",
                                padding: "6px",
                                width: "35px",
                                height: "35px",
                              }}
                              onClick={handelEdit}
                            >
                              <MdModeEdit
                                id="edit"
                                style={{ fontSize: "22px", color: "white" }}
                              />
                            </label>

                            {/* Delete Button */}
                            <label
                              htmlFor="delete"
                              className="form-label rounded bg-danger mb-0 d-flex justify-content-center align-items-center"
                              style={{
                                cursor: "pointer",
                                padding: "6px",
                                width: "35px",
                                height: "35px",
                              }}
                              onClick={handelDelete}
                            >
                              <FaTrashAlt
                                id="delete"
                                style={{ fontSize: "22px", color: "white" }}
                              />
                            </label>
                          </div>
                          <Card.Img
                            variant="top"
                            src={p.image[0]}
                            style={{
                              width: "160px",
                              height: "180px",
                              margin: "auto",
                              padding: "16px",
                            }}
                            className="img-fluid"
                          />
                          <Card.Body>
                            <Card.Title className="text-center mb-2">
                              <span>{`${p.title.substring(0, 15)}...`}</span>
                            </Card.Title>
                            <Card.Text>
                              <p className="text-center mb-2">
                                {`Product Id :`} <br /> {`${nanoid()}`}
                              </p>
                              <p className="text-center text-primary mb-2">{`Category : ${p.category}`}</p>
                              <p className="text-center mb-2">{`Brand : ${p.brand}`}</p>
                              <p className="text-center text-success mb-2">
                                {`Stock : ${p.stock}`}
                              </p>
                              <p className="text-center text-danger fw-bold mb-2">
                                {`Price : $${p.price}`}
                              </p>
                            </Card.Text>
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

                  {/* <========================= End of Product Section ========================> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <========================= Footer ========================> */}
        <AdminFooter />
      </div>
    </>
  );
};

export default ViewProducts_2;
