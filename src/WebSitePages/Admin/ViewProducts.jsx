import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../Admin/ViewProducts.module.css";
import { FaPen } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import useFetchProducts from "../../Store/useFetchProducts";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, SET_PRODUCTS } from "../../Store/productSlice";
import { Link, useNavigate } from "react-router-dom";
import { ProductId } from "../../Components/Navbar/ProductContext";
import { deleteObject, ref } from "firebase/storage";
import { db, storage } from "../../Firebase/firebaseConfig";
import { toast } from "react-toastify";
import { deleteDoc, doc } from "firebase/firestore";

const ViewProducts = () => {
  let { showLoader, isLoading, setisLoading } = useContext(ProductId);
  let [products, setProducts] = useState([]);
  let dispatch = useDispatch();

  // Fetching Data
  let getData = async () => {
    setisLoading(true);
    let data = await useFetchProducts();
    dispatch(SET_PRODUCTS(data));
    setisLoading(false);
    setProducts(data);
  };
  useEffect(() => {
    showLoader(1);
    getData();
    return;
  }, []);

  let nvg = useNavigate();
  let data = useSelector(selectProducts);

  // <==== Deleting Images Function ====>
  let handelRemove = async (e) => {
    let id = e.target.parentElement.id;
    if (id) {
      if (confirm(`Are you sure to delete product ${id}?`)) {
        // Filter Product
        let [product] = data.filter((p) => p.id == id);

        // Delete the file from fire storage
        product.productPic.map(async (pic) => {
          let picName = Object.keys(pic)[0];
          let delRef = `ProductImages/${id}/${picName}`;
          console.log(delRef);
          // Create a reference to the file to delete
          const desertRef = ref(storage, delRef);

          deleteObject(desertRef)
            .then(() => {
              // File deleted successfully
              console.log(`${picName} deleted successfully.`);
            })
            .catch((error) => {
              // Uh-oh, an error occurred!
              toast.error(error.message);
            });
        });

        // Delete Doc from firestore
        await deleteDoc(doc(db, "products", `${id}`));

        // Updating Data
        getData();
      }
    } else {
      toast.error("Id is not defined here....");
    }
  };

  return (
    <>
      <div
        className="row justify-content-center p-3 text-start fs-5"
        style={{
          position: "absolute",
          top: "0px",
          width: "100%",
          height: "100vh",
          zIndex: "2",
          backgroundColor: "#fff",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        <div
          className="col-12 px-0"
          style={{ overflow: "auto" }}
          id={style.productTable}
        >
          <h1 className="text-center">View Product</h1>
          <table className="table">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid black",
                  borderTop: "1px solid black",
                }}
              >
                <th scope="col" style={{ width: "15%" }}>
                  ID
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  NAME
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  IMAGE
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  CATEGORY
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  BRAND
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  STOCK
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  PRICE
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, inx) => {
                return (
                  <tr
                    style={{
                      borderBottom: "1px solid black",
                    }}
                    key={inx}
                  >
                    <td>{p.id}</td>
                    <td>{p.productName}</td>
                    <td>
                      <div className={`${style.productImgBox} py-2`}>
                        {p.productPic.map((img) => {
                          return (
                            <img
                              src={img[Object.keys(img)[0]]}
                              alt="Product Image"
                              style={{
                                width: "45px",
                                height: "60px",
                                marginRight: "5px",
                                border: "1px solid black",
                              }}
                            />
                          );
                        })}
                      </div>
                    </td>
                    <td>{p.category}</td>
                    <td>{p.productBrand}</td>
                    <td>{p.productStock}</td>
                    <td>₹{p.productPrice}</td>
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <div
                        className="actionBtns d-flex align-items-center justify-content-start gap-3"
                        id={p.id}
                      >
                        <div
                          className="editBtn"
                          onClick={() => {
                            nvg(`/admin/edit/${p.id}`);
                          }}
                          id={p.id}
                        >
                          <Link
                            className="bg-primary rounded text-white fs-5 d-flex align-items-center justify-content-center"
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "none",
                            }}
                          >
                            <FaPen name={p.id} />
                          </Link>
                        </div>
                        <div className="deleteBtn" id={p.id}>
                          <button
                            className="bg-danger rounded text-white fs-5 d-flex align-items-center justify-content-center"
                            style={{
                              width: "35px",
                              height: "35px",
                              border: "none",
                            }}
                            onClick={handelRemove}
                            id={p.id}
                          >
                            <FaTrash id={p.id} />
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ViewProducts;
