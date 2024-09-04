import React from "react";
import style from "../Admin/Addproduct_2.module.css";
import AdminFooter from "./AdminFooter";

const Addproduct_2 = () => {
  return (
    <>
      <div id={style.addProductsWrapper}>
        {/* Add Product Title */}
        <div className="d-flex justify-content-between mb-3 text-black">
          <span className="fw-bold">ADD PRODUCT</span>
          <span style={{ color: "#505D69" }}>Ecommerce > Add Products </span>
        </div>

        {/* Add Product Form */}
        <form id={style.addForm}>
          <div className="mb-3">
            <p className="mb-1">Basic Information</p>
            <p style={{ color: "#505D69" }}>Fill all information below</p>
          </div>

          <div class="mb-3">
            <label for="productName" class="form-label">
              Product Name
            </label>
            <input type="text" class="form-control" id="productName" />
          </div>

          <div className="d-flex mb-3">
            <div className="w-50">
              <label for="brandName" class="form-label">
                Brand Name
              </label>
              <input type="text" class="form-control" id="brandName" />
            </div>
            <div className="ms-4 w-50">
              <label for="productPrice" class="form-label">
                Price
              </label>
              <input type="text" class="form-control" id="productPrice" />
            </div>
          </div>
        </form>
      </div>
      <AdminFooter />
    </>
  );
};

export default Addproduct_2;
