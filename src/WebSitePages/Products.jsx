import React, { useContext, useEffect, useRef, useState } from "react";
import { ProductId } from "../Components/Navbar/ProductContext";
import style from "../WebSitePages/Products.module.css";
import Loader from "../Components/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../Store/cartSlice.js";
import { ACTIVE_USER, selectUser } from "../Store/userSlice.js";
import ReactPaginate from "react-paginate";
import {
  filterByCategory,
  selectFilteredProducts,
  sortByPrice,
  sortByRatings,
} from "../Store/filters.js";
import useFetchProducts from "../Store/useFetchProducts.js";
import { SET_PRODUCTS } from "../Store/productSlice.js";

const Products = () => {
  // <======== Variable Declaration ========>
  let dispatch = useDispatch();
  let { showLoader, isLoading, setisLoading } = useContext(ProductId);
  let [products, setProducts] = useState([]);
  let category = useRef("");
  let sortByVal = useRef("");

  // <======== Fetching Data ========>
  let getData = async () => {
    showLoader(1.5);
    let data = await useFetchProducts();
    dispatch(SET_PRODUCTS(data));
    setProducts(data);
  };
  useEffect(() => {
    getData();
    return;
  }, []);

  // <======== Pagination ========>
  let itemsPerPage = 12;
  let [itemOffset, setItemOffset] = useState(0);
  let endOffset = itemOffset + itemsPerPage;
  let [currentItems, setCurrentItems] = useState([]);
  let [pageCount, setPageCount] = useState(0);
  let handlePageClick = (event) => {
    showLoader(1);
    let newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  let resetFilter = () => {
    showLoader(1);
    let data = products.slice(itemOffset, endOffset);
    let count = Math.ceil(products.length / itemsPerPage);
    setPageCount(count);
    setCurrentItems(data);
    let handlePageClick = (event) => {
      showLoader(1);
      let newOffset = (event.selected * itemsPerPage) % products.length;
      setItemOffset(newOffset);
    };
  };

  // <======== Filters ========>
  //Filter by category
  let handleCategory = (cat) => {
    sortByVal.current.value = "empty";
    dispatch(
      filterByCategory({
        category: cat,
        data: products,
      })
    );
  };

  let filtered = useSelector(selectFilteredProducts);
  useEffect(() => {
    showLoader(1);
    if (
      category.current.value != "empty" ||
      sortByVal.current.value != "empty"
    ) {
      let data = filtered.slice(itemOffset, endOffset);
      let count = Math.ceil(filtered.length / itemsPerPage);
      setPageCount(count);
      setCurrentItems(data);
      handlePageClick = (event) => {
        showLoader(1);
        let newOffset = (event.selected * itemsPerPage) % filtered.length;
        setItemOffset(newOffset);
      };
    }
    if (
      category.current.value == "empty" &&
      sortByVal.current.value == "empty"
    ) {
      resetFilter();
    }
  }, [products, filtered, itemOffset]);

  //Filter by Sort By Price
  let sortByFilter = (event) => {
    category.current.value = "empty";
    showLoader(1);
    if (event.target.value == "low2high")
      dispatch(sortByPrice({ ch: 1, data: products }));
    else if (event.target.value == "high2low")
      dispatch(sortByPrice({ ch: -1, data: products }));
    // else if (event.target.value == "rating") dispatch(sortByRatings(products));
    else dispatch(sortByPrice({ ch: 0, data: products }));
  };

  // Clear all filters
  let clearFilter = () => {
    category.current.value = "empty";
    sortByVal.current.value = "empty";
    resetFilter();
  };

  return (
    <>
      <h1 className="my-3">Product Page</h1>
      <div id={style.Container} className="row py-3 px-4">
        <div className="col-3 ps-0 pe-3">
          <div
            id={style.filterContainer}
            style={{ backgroundColor: "#ffffff" }}
          >
            <h4 className="p-3 mb-0">Filters</h4>
            <hr className="m-0" />
            <div id="categoryContainer" className="p-3">
              <label htmlFor="category" className="mb-2 fw-semibold fs-6">
                CATOGORIES
              </label>
              <select
                name="category"
                className="form-select mb-2"
                ref={category}
                defaultValue="empty"
                onChange={(e) => handleCategory(e.target.value)}
              >
                <option value="empty">Choose category</option>
                <option value="mens">Mens</option>
                <option value="clothes">Cloths</option>
                <option value="electronics">Electronics</option>
              </select>
            </div>
            <hr className="m-0" />
            <div className="p-3 text-center">
              <button
                className="btn btn-danger clearFilterBtn"
                onClick={clearFilter}
              >
                Clear all filters
              </button>
            </div>
            <hr className="m-0" />
          </div>
        </div>
        <div
          className="col-9 d-flex align-items-center justify-content-center flex-column"
          style={{ backgroundColor: "#ffffff", padding: "20px 20px 50px 20px" }}
        >
          <div
            id="sortByContainer"
            className="d-flex justify-content-end align-items-center w-100 mb-4"
          >
            <label htmlFor="sortBy" className="fw-bold fs-6">
              Sort By
            </label>
            <select
              name="sortBy"
              id="sortBy"
              className="form-select ms-3 w-25"
              defaultValue="empty"
              ref={sortByVal}
              onChange={(e) => sortByFilter(e)}
            >
              <option value="empty">Choose Option</option>
              <option value="high2low">Price: High to Low</option>
              <option value="low2high">Price: Low to High</option>
              {/* <option value="rating">Customer Rating</option> */}
            </select>
          </div>
          {currentItems.length > 0 && (
            <div id={style.productContainer}>
              {currentItems.map((p, inx) => {
                return (
                  <div className="card" key={inx} id={style.card}>
                    <img
                      src={Object.values(p.productPic[0])[0]}
                      className="card-img-top"
                      alt={`${p.productName}`}
                      style={{
                        width: "150px",
                        height: "150px",
                        marginBottom: "30px",
                      }}
                    />
                    <div className="card-body" id={style.cardBody}>
                      <h5 className="card-title mb-2">
                        {p.productName.substring(0, 30)}
                      </h5>
                      <p className="card-text fw-semibold mb-2">{`Category: ${p.category}`}</p>
                      <div id="lowerCartBody">
                        <p className="card-text fw-bold mb-2 fs-5">{`Price: ₹${parseInt(
                          p.productPrice
                        ).toFixed(2)}`}</p>
                        <button
                          className="btn btn-primary"
                          id={style.add2Cart}
                          onClick={() => dispatch(addToCart(p))}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {currentItems.length == 0 && isLoading == false && (
            <h2 className="text-center text-danger w-100">
              No product founded
            </h2>
          )}
        </div>
      </div>

      <div className="d-flex justify-content-center mt-5 mb-4">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          activeClassName="page-item"
          activeLinkClassName="page-link"
          previousClassName="page-item"
          nextClassName="page-item"
          previousLinkClassName="page-link"
          nextLinkClassName="page-link"
        />
      </div>
    </>
  );
};

export default Products;
