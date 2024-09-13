import { deleteDoc, doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { db, storage } from "../Firebase/firebaseConfig.jsx";
import style from "../Admin/AddProduct.module.css";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { toast } from "react-toastify";
import { ProductId } from "../Components/Navbar/ProductContext.jsx";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, SET_PRODUCTS } from "../Store/productSlice.js";
import { FaEdit } from "react-icons/fa";
import products from "../JSON_Data/ProductsList.js";
import { useNavigate, useParams } from "react-router-dom";
import useFetchProducts from "../Store/useFetchProducts.js";

const AddProduct = () => {
  // <==== Variable Declaration ====>
  const category = useRef("");
  const productName = useRef();
  const productBrand = useRef("");
  const productPrice = useRef(0);
  const productStock = useRef();
  const chooseFile = useRef();
  const productDesp = useRef("");
  const catError = useRef();
  const nameError = useRef();
  const brandError = useRef();
  const priceError = useRef();
  const stockError = useRef();
  const despError = useRef();
  const imageError = useRef();
  const addBtn = useRef();
  let [progress, setProgress] = useState();
  let [productPic, setProductPic] = useState([]);
  let [nameErrorFlag, setNameErrorFlag] = useState(false);
  let [tempId, setTempId] = useState(0);
  let [imgFlag, setImgFlag] = useState(false);
  let [validation, setValidation] = useState(false);
  let data = useSelector(selectProducts);
  // <==== Declaring Context Variable & Methods ====>
  let nvg = useNavigate();
  let { id } = useParams();
  var product = data.filter((p) => p.id == id)[0];
  let { showLoader, isLoading, setisLoading } = useContext(ProductId);
  let dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      category.current.value = product.category;
      productName.current.value = product.productName;
      productBrand.current.value = product.productBrand;
      productPrice.current.value = product.productPrice;
      productStock.current.value = product.productStock;
      productDesp.current.value = product.productDesp;
      setProductPic(product.productPic);
    }
  }, []);

  // <==== Deleting Images Function ====>
  let handleDeleteImg = (pid) => {
    if (id) {
      console.log(product);
      let [imgRef] = product.productPic.filter(
        (img) => Object.keys(img)[0] == pid
      );

      let delRef = imgRef[Object.keys(imgRef)[0]];
      console.log("delRef", delRef);
      // Create a reference to the file to delete
      const desertRef = ref(storage, delRef);

      // Delete the file
      if (confirm(`Are you sure to delete ${pid} ?`)) {
        deleteObject(desertRef)
          .then(() => {
            // File deleted successfully
            toast.success(`${pid} deleted successfully.`);
          })
          .catch((error) => {
            // Uh-oh, an error occurred!
            toast.error(error.message);
          });
      }
    }
    let filtered = [];
    productPic.forEach((img) => {
      if (Object.keys(img)[0] != pid) {
        filtered.push(img);
      }
    });
    setProductPic(filtered);
  };

  // <==== Form Validation ====>
  let isFormValidated = (form) => {
    let errorCount = 0;
    if (category.current.value == "Choose Category") {
      catError.current.innerText = "category can't be empty";
      category.current.classList.add("is-invalid");
      errorCount++;
    } else {
      catError.current.innerText = "";
      category.current.classList.remove("is-invalid");
    }
    if (form.target[1].value == "") {
      nameError.current.innerText = "product name can't be empty";
      productName.current.classList.add("is-invalid");
      errorCount++;
    } else {
      nameError.current.innerText = "";
      productName.current.classList.remove("is-invalid");
    }
    if (form.target[2].value == "") {
      brandError.current.innerText = "product brand can't be empty";
      productBrand.current.classList.add("is-invalid");
      errorCount++;
    } else {
      brandError.current.innerText = "";
      productBrand.current.classList.remove("is-invalid");
    }
    if (form.target[3].value == "") {
      priceError.current.innerText = "product price can't be empty";
      productPrice.current.classList.add("is-invalid");
      errorCount++;
    } else {
      priceError.current.innerText = "";
      productPrice.current.classList.remove("is-invalid");
    }
    if (form.target[4].value == "") {
      stockError.current.innerText = "product stock can't be empty";
      productStock.current.classList.add("is-invalid");
      errorCount++;
    } else {
      stockError.current.innerText = "";
      productStock.current.classList.remove("is-invalid");
    }
    if (form.target[5].value == "" && id == undefined) {
      imageError.current.innerText = "product images can't be empty";
      chooseFile.current.classList.add("is-invalid");
      errorCount++;
    } else {
      imageError.current.innerText = "";
      chooseFile.current.classList.remove("is-invalid");
    }
    if (form.target[6].value == "") {
      despError.current.innerText = "product description can't be empty";
      productDesp.current.classList.add("is-invalid");
      errorCount++;
    } else {
      despError.current.innerText = "";
      productDesp.current.classList.remove("is-invalid");
    }
    return errorCount > 0 ? false : true;
  };

  // <==== Upload Images ====>
  let handleImage = async () => {
    // Uploading
    let j = 0;
    tempId = id ? id : Math.round(Math.random() * 100000000);
    console.log(tempId);
    Array.from(chooseFile.current.files).map((pic) => {
      let picExt = pic.name.split(".").pop();
      let i = parseInt(Date.now());
      let picName = `${tempId}_${i}.${picExt}`;

      let storageRef = ref(storage, `ProductImages/${tempId}/${picName}`);
      const uploadTask = uploadBytesResumable(storageRef, pic);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgress((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        },
        (error) => {
          toast.error(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            productPic = [...productPic, { [picName]: downloadURL }];
            setProductPic([...productPic]);
          });
          j += 1;
          if (j == chooseFile.current.files.length) {
            setImgFlag(true);
            setTempId(tempId);
          }
        }
      );
      i++;
    });
  };

  // <====Form Submit & Image Uploading Function ====>
  let handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValidated(e)) {
      setValidation(true);
      if (!imgFlag && chooseFile.current.files.length == 0) {
        setImgFlag(true);
      }
    } else toast.error("PLease check Form data and try again.");
  };

  // Form Validation & Submission
  useEffect(() => {
    let temp = async () => {
      if (imgFlag && validation) {
        if (id && confirm("Do you want to submit?")) {
          // Delete Doc from firestore
          await deleteDoc(doc(db, "products", `${id}`));
        }
        try {
          // Sent Data to Firebase
          if (id) await deleteDoc(doc(db, "products", `${id}`));
          await setDoc(doc(db, "products", id ? `${id}` : `${tempId}`), {
            id: id ? id : tempId,
            category: category.current.value,
            productName: productName.current.value,
            productBrand: productBrand.current.value,
            productPrice: productPrice.current.value,
            productStock: productStock.current.value,
            productDesp: productDesp.current.value,
            productPic: productPic,
          });

          // Fetching Data again
          setisLoading(true);
          let data = await useFetchProducts();
          dispatch(SET_PRODUCTS(data));
          setisLoading(false);

          // Reset Form
          id
            ? toast.success("Product Edited Successfully.")
            : toast.success("Product Added Successfully.");
          setTimeout(() => {
            document.getElementById("myForm").reset();
            setProductPic([]);
            setProgress("0");
            nvg("/admin/view");
            setImgFlag(false);
          }, 3000);
        } catch (error) {
          toast.error(error.message);
        }
      }
    };
    temp();
    return;
  }, [imgFlag, validation]);

  return (
    <>
      <div
        className="row justify-content-center p-3 text-start fs-5"
        id={style.addProductWrapper}
      >
        <div className="col-10" style={{ overflow: "hidden" }}>
          <h1 className="text-center">
            {id ? "Edit Product Form" : "Add Product Form"}
          </h1>
          <form onSubmit={handleSubmit} id="myForm">
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <div className="input-group">
                <select
                  name="category"
                  id="category"
                  className="form-control"
                  ref={category}
                >
                  <option value="chooseCategory" selected>
                    Choose Category
                  </option>
                  <option value="Electronics">Electronics</option>
                  <option value="Glossary">Glossary</option>
                  <option value="Clothes">Clothes</option>
                  <option value="Books">Books</option>
                  <option value="Toys">Toys</option>
                  <option value="Jewellery">Jewellery</option>
                </select>
                {/* <span
                  className="input-group-text fs-5"
                  onClick={() => alert("yup")}
                >
                  <FaEdit />
                </span> */}
              </div>
              <span className="fs-6 text-danger" ref={catError}></span>
            </div>
            <div className="form-group mt-2">
              <div className="row">
                <div className="col">
                  <label htmlFor="productName">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    className="form-control"
                    ref={productName}
                  />
                  <span className="fs-6 text-danger" ref={nameError}></span>
                </div>
                <div className="col">
                  <label htmlFor="productBrand">Brand</label>
                  <input
                    type="text"
                    name="productBrand"
                    className="form-control"
                    ref={productBrand}
                  />
                  <span className="fs-6 text-danger" ref={brandError}></span>
                </div>
              </div>
            </div>
            <div className="form-group mt-2">
              <div className="row">
                <div className="col">
                  <label htmlFor="productName">Price</label>
                  <input
                    type="text"
                    name="productPrice"
                    className="form-control"
                    ref={productPrice}
                  />
                  <span className="fs-6 text-danger" ref={priceError}></span>
                </div>
                <div className="col">
                  <label htmlFor="productBrand">Stock</label>
                  <input
                    type="number"
                    name="productStock"
                    className="form-control"
                    ref={productStock}
                  />
                  <span className="fs-6 text-danger" ref={stockError}></span>
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="row">
                <div className="col">
                  <div className="form-group ">
                    <label htmlFor="productPic">Choose File</label>
                    <input
                      type="file"
                      name="productPic"
                      id="productPic"
                      className="form-control w-100"
                      onChange={handleImage}
                      multiple="on"
                      ref={chooseFile}
                    />
                  </div>
                </div>
                <div className="col d-flex">
                  {productPic.map((pic, inx) => (
                    <div
                      className={style.pdImgSlice}
                      id={Object.keys(pic)[0]}
                      key={inx}
                    >
                      <span
                        className={style.pdImgCloseBtn}
                        onClick={() => handleDeleteImg(Object.keys(pic)[0])}
                      >
                        X
                      </span>
                      <img
                        src={pic[Object.keys(pic)[0]]}
                        key={inx}
                        alt="product image"
                        className={style.pdImg}
                      />
                    </div>
                  ))}
                </div>
                <span className="fs-6 text-danger" ref={imageError}></span>
                {progress > 0 ? (
                  <div class="progress mt-3 px-0" role="progressbar">
                    <div
                      class="progress-bar progress-bar-striped"
                      style={{ width: `${progress}%`, borderRadius: "20px" }}
                    >
                      <span>Uploading {progress}%</span>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div className="form-group mt-2">
              <label htmlFor="productDesp">Description</label>
              <textarea
                name="productDesp"
                id="productDesp"
                ref={productDesp}
                className="form-control"
              ></textarea>
              <span className="fs-6 text-danger" ref={despError}></span>
            </div>
            <div className="form-group mt-3 text-center">
              <input
                type="submit"
                className="btn btn-primary w-25"
                ref={addBtn}
                value={id ? "Edit" : "Add "}
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
