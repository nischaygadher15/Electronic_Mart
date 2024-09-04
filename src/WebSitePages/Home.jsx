import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_USER, selectUser } from "../Store/userSlice";
import style from "../WebSitePages/Home.module.css";
import products from "../JSON_Data/ProductsList.js";
import ReactPaginate from "react-paginate";
import { addToCart } from "../Store/cartSlice.js";

const Home = () => {
  let dispatch = useDispatch();
  let activeUser = useSelector(selectUser);

  // Pagination
  const itemsPerPage = 12;
  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  return (
    <div>
      {/* <Header /> */}
      <h1>Home Page</h1>
      <h5>{JSON.stringify(activeUser)}</h5>
    </div>
  );
};

export default Home;
