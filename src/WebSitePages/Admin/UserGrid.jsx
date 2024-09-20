import React, { useEffect, useState } from "react";
import style from "../Admin/UserGrid.module.css";
import { Card } from "react-bootstrap";
import users from "../../JSON_Data/usersList.js";
import { IoMdCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import ReactPaginate from "react-paginate";

const UserGrid = () => {
  //Varialble Declaration
  let userList = users.slice(0, users.length);
  const [itemOffset, setItemOffset] = useState(0);
  let itemsPerPage = 9;
  let endOffset = itemOffset + itemsPerPage;
  let pageCount = Math.ceil(userList.length / itemsPerPage);
  let [currentItems, setCurrentItems] = useState([
    ...userList.slice(itemOffset, endOffset),
  ]);
  let [currentPage, setCurrentPage] = useState(1);

  //Pagination
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % userList.length;
    setCurrentPage(parseInt(event.selected + 1));
    setItemOffset(newOffset);
    // setTimeout(() => {
    //   viewWrapper.current.scrollTo({
    //     top: "130",
    //     left: "0",
    //     behavior: "smooth",
    //   });
    // }, 300);
  };

  useEffect(() => {
    currentItems = userList.slice(itemOffset, endOffset);
    setCurrentItems(currentItems);
  }, [itemOffset]);

  useEffect(
    () => console.log(`Current Page: ${currentPage}/${pageCount}`),
    [currentPage]
  );

  return (
    <>
      <div style={{ padding: "24px" }}>
        <div className="userGridHead">
          <span>Users List ({users.length})</span>
          <ul>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <div className={style.userGrid}>
          {currentItems.map((u) => {
            return (
              <Card className={`${style.userCard} shadow`}>
                <Card.Img src={u.picture.large} className={style.userCardImg} />
                <Card.Body className={style.userCardBody}>
                  <Card.Title>
                    {`${u.name.title} ${u.name.first} ${u.name.last}`.substring(
                      0,
                      20
                    )}
                  </Card.Title>
                  <Card.Text>
                    <ul className={style.userContactInfo}>
                      <li>
                        <IoMdCall
                          style={{ fontSize: "18px", marginRight: "10px" }}
                        />
                        <span>{u.phone}</span>
                      </li>
                      <li>
                        <IoMdMail
                          style={{ fontSize: "18px", marginRight: "10px" }}
                        />
                        <span>
                          {u.email.split("@")[0].substring(0, 15)}
                          {"@"}
                          {u.email.split("@")[1]}
                        </span>
                      </li>
                      <li>
                        <FaLocationDot
                          style={{ fontSize: "18px", marginRight: "10px" }}
                        />
                        <span>{u.nat}</span>
                      </li>
                    </ul>
                    <div
                      className="d-flex justify-content-center"
                      style={{ gap: "10px" }}
                    >
                      <button className="btn btn-primary w-50">Edit</button>
                      <button className="btn btn-danger w-50">Delete</button>
                    </div>
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
            pageRangeDisplayed={3}
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
    </>
  );
};

export default UserGrid;
