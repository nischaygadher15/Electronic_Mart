import React, { useEffect, useRef, useState } from "react";
import style from "../Admin/Addproduct_2.module.css";
import AdminFooter from "./AdminFooter";
import { RiUploadCloud2Line } from "react-icons/ri";
import exp from "../../assets/test1.jpg";

const Addproduct_2 = () => {
  //Variable Declaration
  let categories = [
    "Select Category",
    "Electronics",
    "Fashion",
    "Home & Kitchen",
    "Beauty & Personal Care",
    "Health & Wellness",
    "Toys & Games",
    "Books",
    "Sports & Outdoors",
    "Automotive",
  ];

  //State Variables
  let [filteredCat, setFilteredCat] = useState([...categories]);
  let [selectedCat, setSelectedCat] = useState("Select Category");
  let [uploadedImgs, setUploadedImgs] = useState([]);
  let [errors, setErrors] = useState({
    nameError: false,
    brandError: false,
    priceError: false,
    stockError: false,
    categoryError: false,
    descriptionError: false,
    imagesError: false,
  });

  //Reference Variables
  let downArrow = useRef(null);
  let selectBox = useRef(null);
  let opContainer = useRef(null);
  let dropArea = useRef(null);
  let selectedImg = useRef(null);
  let catSearchBox = useRef("");
  let productName = useRef("");
  let brandName = useRef("");
  let productPrice = useRef(0);
  let stock = useRef(0);
  let productDesc = useRef("");
  let nameErr = useRef("");
  let brandErr = useRef("");
  let priceErr = useRef("");
  let stockErr = useRef("");
  let categoryErr = useRef("");
  let descriptionErr = useRef("");
  let imagesErr = useRef("");
  let selCat = useRef(null);
  let imgCont = useRef(null);

  //Select Category Container Show/hide
  let hideOpContainer = () => {
    downArrow.current.style.transform = "rotate(0deg)";
    selectBox.current.style.overflowY = "hidden";
    opContainer.current.style.opacity = "0";
  };

  let showOpContainer = () => {
    downArrow.current.style.transform = "rotate(180deg)";
    selectBox.current.style.overflowY = "visible";
    opContainer.current.style.opacity = "1";
  };

  //Click Select Category
  document.addEventListener("click", (e) => {
    if (
      e.target.id != "searchSelect" &&
      e.target.id != "selectedOne" &&
      e.target.id != "dArrow" &&
      e.target.id != "catSearch"
    ) {
      if (opContainer.current.style.opacity == 1) {
        hideOpContainer();
      }
      // } else {
      //   if (
      //     opContainer.current.style.opacity == 0 ||
      //     opContainer.current.style.opacity != 1
      //   ) {
      //     showOpContainer();
      //   } else hideOpContainer();
    }
  });

  let handelCategory = () => {
    if (opContainer.current.style.opacity != 1) {
      showOpContainer();
    } else hideOpContainer();
    console.log("clicked");
  };

  //Set Selected Category
  let selectedCatgory = (e) => {
    setSelectedCat(e.target.innerText);
    catSearchBox.current.value = " ";
    setFilteredCat([...categories]);
    hideOpContainer();
  };

  // Search Category Function
  let searchCategory = (e) => {
    let word = e.target.value.toLowerCase();
    if (word.length == 0 || word == " ") {
      setFilteredCat([...categories]);
    } else {
      let result = categories.filter(
        (cat) => cat.toLowerCase().includes(word) && cat != "Select Category"
      );
      if (result.length == 0) setFilteredCat(["No Category Found"]);
      else setFilteredCat([...result]);
    }
  };

  // Upload Images
  let handelUploading = (imgs) => {
    console.log("handleImage called with: ", imgs);
    let i = 1;
    Array.from(imgs).map((img) => {
      let reader = new FileReader();
      reader.readAsDataURL(img);
      reader.addEventListener("load", () => {
        uploadedImgs = [...uploadedImgs, reader.result];
        if (i == Array.from(imgs).length) setUploadedImgs(uploadedImgs);
        i++;
      });
    });
  };

  // Remove Images from Image Cart
  let removeImage = (e) => {
    let index = parseInt(e.target.id.split("-")[1]);
    console.log(`picture index: ${index}`);
    uploadedImgs.splice(index, 1);
    setUploadedImgs([...uploadedImgs]);
  };

  // Form Validation
  let validateForm = (e) => {
    if (productName.current.value == "") {
      nameErr.current.innerText = "Product name can't empty";
      productName.current.classList.add("is-invalid");
      productName.current.classList.remove("is-valid");
      errors.nameError = true;
      setErrors({ ...errors });
    } else {
      nameErr.current.innerText = "";
      productName.current.classList.remove("is-invalid");
      productName.current.classList.add("is-valid");
      errors.nameError = false;
      setErrors({ ...errors });
    }
    if (brandName.current.value == "") {
      brandErr.current.innerText = "Brand name can't empty";
      brandName.current.classList.add("is-invalid");
      brandName.current.classList.remove("is-valid");
      errors.brandError = true;
      setErrors({ ...errors });
    } else {
      brandErr.current.innerText = "";
      brandName.current.classList.remove("is-invalid");
      brandName.current.classList.add("is-valid");
      errors.brandError = false;
      setErrors({ ...errors });
    }
    if (productPrice.current.value == 0 || productPrice == "") {
      priceErr.current.innerText = "Product price can't zero/empty";
      productPrice.current.classList.add("is-invalid");
      productPrice.current.classList.remove("is-valid");
      errors.priceError = true;
      setErrors({ ...errors });
    } else {
      priceErr.current.innerText = "";
      productPrice.current.classList.remove("is-invalid");
      productPrice.current.classList.add("is-valid");
      errors.priceError = false;
      setErrors({ ...errors });
    }
    if (stock.current.value == "" || stock == 0) {
      stockErr.current.innerText = "Product stock can't zero/empty";
      stock.current.classList.add("is-invalid");
      stock.current.classList.remove("is-valid");
      errors.stockError = true;
      setErrors({ ...errors });
    } else {
      stockErr.current.innerText = "";
      stock.current.classList.remove("is-invalid");
      stock.current.classList.add("is-valid");
      errors.stockError = false;
      setErrors({ ...errors });
    }
    if (selectedCat == "Select Category") {
      categoryErr.current.innerText = "Product category can't empty";
      selCat.current.style.border = "1px solid red";
      errors.categoryError = true;
      setErrors({ ...errors });
    } else {
      categoryErr.current.innerText = "";
      selCat.current.style.border = "1px solid green";
      errors.categoryError = false;
      setErrors({ ...errors });
    }
    if (productDesc.current.value == "") {
      descriptionErr.current.innerText = "Product description can't empty";
      productDesc.current.classList.add("is-invalid");
      productDesc.current.classList.remove("is-valid");
      errors.descriptionError = true;
      setErrors({ ...errors });
    } else {
      descriptionErr.current.innerText = "";
      productDesc.current.classList.remove("is-invalid");
      productDesc.current.classList.add("is-valid");
      errors.descriptionError = false;
      setErrors({ ...errors });
    }
    if (uploadedImgs.length == 0) {
      imagesErr.current.innerText = "There are no product photos uploaded";
      imgCont.current.style.border = "2px solid red";
      errors.imagesError = true;
      setErrors({ ...errors });
    } else {
      imagesErr.current.innerText = "";
      imgCont.current.style.border = "2px solid green";
      errors.imagesError = false;
      setErrors({ ...errors });
    }

    //Counting Errors
    let Err = 0;
    let errorArr = Object.values(errors);
    errorArr.forEach((err) => {
      if (err == true) Err++;
    });

    //Returnin result
    if (Err == 0) return true;
    else return false;
  };

  // Submit Form Data
  let handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm(e)) {
      alert("Form is validated.");
    } else {
      alert(`Opps.. there are few errors here...`);
    }
  };

  //Reset Form
  let resetForm = () => {
    productName.current.value = "";
    productName.current.classList.remove("is-valid");
    productName.current.classList.remove("is-invalid");
    nameErr.current.innerText = "";
    brandName.current.value = "";
    brandName.current.classList.remove("is-valid");
    brandName.current.classList.remove("is-invalid");
    brandErr.current.innerText = "";
    productPrice.current.value = "";
    productPrice.current.classList.remove("is-valid");
    productPrice.current.classList.remove("is-invalid");
    priceErr.current.innerText = "";
    stock.current.value = "";
    stock.current.classList.remove("is-valid");
    stock.current.classList.remove("is-invalid");
    stockErr.current.innerText = "";
    productDesc.current.value = "";
    productDesc.current.classList.remove("is-valid");
    productDesc.current.classList.remove("is-invalid");
    descriptionErr.current.innerText = "";
    setSelectedCat("Select Category");
    selCat.current.style.border = "none";
    categoryErr.current.innerText = "";
    setUploadedImgs([]);
    imgCont.current.style.border = "none";
    imagesErr.current.innerText = "";
    setErrors({
      nameError: false,
      brandError: false,
      priceError: false,
      stockError: false,
      categoryError: false,
      descriptionError: false,
      imagesError: false,
    });
  };

  return (
    <>
      <div id={style.addProductsWrapper}>
        {/* Add Product Title */}
        <div className="d-flex justify-content-between mb-3 text-black">
          <span className="fw-bold">ADD PRODUCT</span>
          <span style={{ color: "#505D69" }}>Ecommerce Add Products </span>
        </div>

        {/* Add Product Form */}
        <form id={style.addForm} onSubmit={handleSubmit}>
          <div className="mb-3">
            <p className="mb-1 fw-semibold">Basic Information</p>
            <p style={{ color: "#505D69" }}>Fill all information below</p>
          </div>

          <div className="mb-3">
            <label for="productName" className="form-label">
              Product Name
            </label>
            <input
              type="text"
              className="form-control"
              id="productName"
              ref={productName}
            />
            <span className={style.errorMsg} ref={nameErr}></span>
          </div>

          <div className="d-flex mb-3">
            <div className="w-50">
              <label for="brandName" className="form-label">
                Brand Name
              </label>
              <input
                type="text"
                className="form-control"
                id="brandName"
                ref={brandName}
              />
              <span className={style.errorMsg} ref={brandErr}></span>
            </div>
            <div className="ms-4 w-50">
              <label for="productPrice" className="form-label">
                Price
              </label>
              <input
                type="number"
                className="form-control"
                id="productPrice"
                ref={productPrice}
              />
              <span className={style.errorMsg} ref={priceErr}></span>
            </div>
          </div>

          <div className="d-flex mb-3">
            <div className="w-50">
              <label for="category" className="form-label">
                Category
              </label>
              <ul
                className={style.searchSelect}
                ref={selectBox}
                id="searchSelect"
              >
                <li
                  className={style.selectedOne}
                  id="selectedOne"
                  onClick={handelCategory}
                  ref={selCat}
                >
                  {selectedCat}
                  <div>
                    <i
                      className="fa-solid fa-angle-down"
                      style={{
                        fontSize: "20px",
                        color: "rgb(131, 128, 128)",
                      }}
                      id="dArrow"
                      ref={downArrow}
                    ></i>
                  </div>
                </li>
                <div id={style.optContainer} ref={opContainer} className="show">
                  <li
                    style={{
                      padding: "12px",
                    }}
                  >
                    <input
                      type="text"
                      className={style.catSearch}
                      id="catSearch"
                      placeholder="Search Here..."
                      onChange={searchCategory}
                      ref={catSearchBox}
                    />
                  </li>
                  <ul id={style.optionBox}>
                    {filteredCat.map((item, inx) => (
                      <li
                        key={inx}
                        className={style.option}
                        onClick={selectedCatgory}
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </ul>
              <span className={style.errorMsg} ref={categoryErr}></span>
            </div>
            <div className="ms-4 w-50">
              <label for="stock" className="form-label">
                Product Stock
              </label>
              <input
                type="number"
                className="form-control"
                id="stock"
                ref={stock}
              />
              <span className={style.errorMsg} ref={stockErr}></span>
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="productDesc" className="form-label">
              Product Description
            </label>
            <textarea
              name="description"
              id="productDesc"
              className="form-control"
              rows="5"
              ref={productDesc}
            />
            <span className={style.errorMsg} ref={descriptionErr}></span>
          </div>

          <div className="mb-3">
            <p>Upload Product Images</p>
            <label
              for="productImg"
              id={style.dropArea}
              className="mb-3"
              ref={dropArea}
              onDragOver={(e) => {
                e.preventDefault();
              }}
              onDrop={(e) => {
                e.preventDefault();
                handelUploading(e.dataTransfer.files);
              }}
            >
              <input
                type="file"
                id="productImg"
                hidden
                ref={selectedImg}
                onChange={(e) => handelUploading(e.target.files)}
                multiple
              />
              <div id={style.contentBox}>
                <RiUploadCloud2Line
                  style={{
                    marginBottom: "20px",
                    fontSize: "60px",
                    color: "rgb(112, 110, 110)",
                  }}
                />
                <span
                  className="fw-semibold fs-4"
                  style={{ color: "rgb(112, 110, 110)" }}
                >
                  Drop files here or click to upload.
                </span>
              </div>
            </label>
            <div>
              <p>Uploaded Photos ({uploadedImgs.length})</p>
              <div ref={imgCont}>
                {uploadedImgs.length == 0 ? (
                  <div className={style.imgContainer}>
                    <h5 className="text-center w-100 text-danger">
                      NO PHOTO UPLOADED YET (-_-)
                    </h5>
                  </div>
                ) : (
                  <div className={style.imgContainer}>
                    {uploadedImgs.map((i, inx) => {
                      return (
                        <div className={style.imgTile} key={inx}>
                          <label
                            for={`img-${inx}`}
                            className={style.closeBtn}
                            onClick={removeImage}
                          >
                            <i
                              className="fa-regular fa-circle-xmark"
                              id={`img-${inx}`}
                            />
                          </label>
                          <img
                            src={i}
                            alt="Uploaded Image File"
                            className={style.uplImgTile}
                          />
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
            <span className={style.errorMsg} ref={imagesErr}></span>
          </div>

          <div className="p-4 text-center">
            <input
              type="submit"
              value="Submit"
              className="btn btn-success mx-3"
            />
            <input
              type="reset"
              value="Reset"
              className="btn btn-danger mx-3"
              onClick={resetForm}
            />
          </div>
        </form>
      </div>
      <AdminFooter />
    </>
  );
};

export default Addproduct_2;
