import React, { useContext, useEffect, useRef, useState } from "react";
import register from "../WebSitePages/Register.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import { ProductId } from "../Components/Navbar/ProductContext";
import Loader from "../Components/Loader";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import { doc, setDoc, Timestamp } from "firebase/firestore";

const Register = () => {
  let [usr, setUsr] = useState({ usrName: "", uemail: "", pwd: "", cpwd: "" });
  let [flag, setFlag] = useState(false);
  let uname = useRef();
  let uemail = useRef();
  let upwd = useRef();
  let ucpwd = useRef();
  let role = useRef();
  let nameErr = useRef();
  let emailErr = useRef();
  let pwdErr = useRef();
  let cpwdErr = useRef();
  let { showLoader, isLoading } = useContext(ProductId);

  useEffect(() => {
    if (flag) sentData();
  }, [usr]);

  let sentData = async () => {
    try {
      await showLoader(1);
      createUserWithEmailAndPassword(auth, usr.uemail, usr.pwd)
        .then(async (userCredential) => {
          const fireUser = userCredential.user;
          await setDoc(doc(db, "users", fireUser.uid), {
            ...usr,
            createdAt: Timestamp.now().toMillis(),
          });
          // console.log(fireUser);
        })
        .catch((error) => {
          toast.error(error.message);
        });

      toast.success("Registered Sccessfully.");
      uname.current.value = "";
      uemail.current.value = "";
      upwd.current.value = "";
      ucpwd.current.value = "";
      role.current.checked = false;
    } catch (err) {
      alert(err);
    }
  };

  let handelSubmit = (e) => {
    e.preventDefault();

    // Username
    if (uname.current.value == "") {
      nameErr.current.innerText = "Username can't be empty";
    } else {
      if (Number.isInteger(parseInt(uname.current.value[0]))) {
        nameErr.current.innerText = "Username can't start with Number.";
      } else {
        nameErr.current.innerText = "";
      }
    }

    // Email
    if (uemail.current.value == "") {
      emailErr.current.innerText = "Email can't be empty";
    } else {
      nameErr.current.innerText = "";
    }

    // Password
    if (upwd.current.value == "" || ucpwd.current.value == "") {
      if (upwd.current.value == "") {
        pwdErr.current.innerText = "Password can't be empty";
      } else pwdErr.current.innerText = "";

      if (ucpwd.current.value == "") {
        cpwdErr.current.innerText = "Confirm Password can't be empty";
      } else cpwdErr.current.innerText = "";
    } else {
      if (upwd.current.value != ucpwd.current.value) {
        pwdErr.current.innerText = "Password do not match";
        cpwdErr.current.innerText = "Password do not match";
      } else {
        nameErr.current.innerText = "";
        pwdErr.current.innerText = "";
        cpwdErr.current.innerText = "";
        setFlag(true);
        setUsr({
          usrName: uname.current.value,
          uemail: uemail.current.value,
          pwd: upwd.current.value,
          cpwd: ucpwd.current.value,
          role: role.current.checked ? 1 : 0,
        });
      }
    }
  };
  return (
    <>
      {/* <Header /> */}
      <h1>Register</h1>
      {isLoading && <Loader />}
      {/* <Link to="/login">Login</Link> */}
      <div className="row justify-content-center">
        <form
          id={register.userRegForm}
          className="mt-4 col-5"
          onSubmit={handelSubmit}
        >
          <div className={register.formRow}>
            <label
              htmlFor="usrName"
              className="me-3 form-label text-end"
              style={{ width: "250px" }}
            >
              Username
            </label>
            <input
              type="text"
              id="usrName"
              name="usrName"
              ref={uname}
              className="form-control"
            />
          </div>
          <p className="text-danger m-0 text-end" ref={nameErr}></p>

          <div className={register.formRow}>
            <label
              htmlFor="uemail"
              className="me-3 form-label text-end"
              style={{ width: "250px" }}
            >
              Email
            </label>
            <input
              type="email"
              id="uemail"
              name="uemail"
              ref={uemail}
              className="form-control"
            />
          </div>
          <p className="text-danger m-0 text-end" ref={emailErr}></p>

          <div className={register.formRow}>
            <label
              htmlFor="pwd"
              className="me-3 form-label text-end"
              style={{ width: "250px" }}
            >
              Password
            </label>
            <input
              type="password"
              id="pwd"
              name="pwd"
              ref={upwd}
              className="form-control"
            />
          </div>
          <p className="text-danger m-0 text-end" ref={pwdErr}></p>

          <div className={register.formRow}>
            <label
              htmlFor="cpwd"
              className="me-3 form-label text-end"
              style={{ width: "250px" }}
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="cpwd"
              name="cpwd"
              ref={ucpwd}
              className="form-control"
            />
          </div>
          <p className="text-danger m-0 text-end" ref={cpwdErr}></p>

          <div className={`d-flex justify-content-end gap-5 mt-4`}>
            <div className="form-check form-switch d-flex align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="adminSwitch"
                style={{ width: "40px", height: "20px" }}
                ref={role}
              />
              <label className="form-check-label ms-2" htmlFor="adminSwitch">
                Admin
              </label>
            </div>
            <input type="submit" value="Submit" className="btn btn-success" />
            <input type="reset" value="Reset" className="btn btn-danger" />
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
