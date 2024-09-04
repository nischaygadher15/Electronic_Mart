import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import style from "../WebSitePages/Register.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../Components/Loader";
import { ProductId } from "../Components/Navbar/ProductContext";
import { useDispatch, useSelector } from "react-redux";
import { ACTIVE_USER, selectUser } from "../Store/userSlice";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { auth, db } from "../Firebase/firebaseConfig";
import { doc, getDoc, setDoc, Timestamp } from "firebase/firestore";
import { selectUrl } from "../Store/cartSlice";
import { SET_PRODUCTS } from "../Store/productSlice";

const Login = () => {
  let dispatch = useDispatch();
  let uemail = useRef();
  let upwd = useRef();
  let [googleFlag, setGoogleFlag] = useState(false);
  let { showLoader, isLoading, setisLoading } = useContext(ProductId);
  let nvg = useNavigate();
  let previousUrl = useSelector(selectUrl);

  let handleSubmit = (e) => {
    e.preventDefault();
    setisLoading(true);
    try {
      if (!googleFlag) {
        signInWithEmailAndPassword(
          auth,
          uemail.current.value,
          upwd.current.value
        )
          .then(async (userCredential) => {
            const user = userCredential.user;
            let docRef = doc(db, "users", user.uid);
            let docSnap = await getDoc(docRef);
            dispatch(
              ACTIVE_USER({
                usrName: docSnap.data().usrName,
                role: docSnap.data().role,
                isLoggedIn: true,
              })
            );

            uemail.current.value = "";
            upwd.current.value = "";
            if (docSnap.data().role == 1) {
              toast.success("Logged in successfully");
              setisLoading(false);
              nvg("/admin");
            } else {
              if (previousUrl.includes("cart")) {
                toast.success("redirected to checkout page");
                setisLoading(false);
              } else {
                toast.success("Logged in successfully");
                setisLoading(false);
                nvg("/");
              }
            }
          })
          .catch((error) => {
            toast.error(error.message);
          });
      }

      // if (res.data[0].usrName == uname.current.value) {
      //   if (res.data[0].pwd == upwd.current.value) {
      //     uname.current.value = "";
      //     upwd.current.value = "";
      //     toast.success("Logged in successflly");
      //     let activeUser = {
      //       isLoggedIn: true,
      //       usrName: res.data[0].usrName,
      //       role: res.data[0].role,
      //     };
      //     sessionStorage.setItem("temp", JSON.stringify(activeUser));
      //     if (res.data[0].role == 1) nvg("/admin");
      //     else nvg("/");
      //   } else {
      //     toast.error("Invalid Credentials");
      //     alert("err1");
      //   }
      // } else {
      //   if (uname.current.value == "") toast.error("UserName can't be empty");
      //   else toast.error("Invalid Credentials");
      // }
    } catch (err) {
      toast.error("Invalid Credentials");
    }
  };

  // PopUp Sing In with Google
  const provider = new GoogleAuthProvider();
  let handleGoogleSignIn = () => {
    setGoogleFlag(true);
    signInWithPopup(auth, provider)
      .then(async (result) => {
        const user = result.user;
        toast.success("Logged in successflly");

        let docRef = doc(db, "users", user.uid);
        let docSnap = await getDoc(docRef);
        if (!docSnap.exists()) {
          // sessionStorage.setItem("temp", JSON.stringify(docSnap.data()));
          await setDoc(doc(db, "users", user.uid), {
            usrName: user.displayName,
            uemail: user.email,
            role: 0,
            createdAt: Timestamp.now().toMillis(),
          });
        }
        docSnap = await getDoc(docRef);
        let obj = {
          usrName: docSnap.data().usrName,
          role: docSnap.data().role,
          isLoggedIn: true,
        };
        dispatch(ACTIVE_USER(obj));
        uemail.current.value = "";
        upwd.current.value = "";
        if (docSnap.data().role == 1) nvg("/admin");
        else {
          if (previousUrl.includes("cart")) {
            // alert("redirected to checkout page");
            toast.success("redirected to checkout page");
          } else {
            nvg("/");
            console.log(previousUrl);
          }
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  let admin = () => {
    uemail.current.value = "admin@gmail.com";
    upwd.current.value = "admin1";
  };

  return (
    <div>
      {/* <Header /> */}
      <h1>Login Page</h1>
      {isLoading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-4 mt-4">
          <form action="#" id="loginForm" onSubmit={handleSubmit}>
            <div className={style.formRow}>
              <label
                htmlFor="usrName"
                className="form-label"
                style={{ width: "250px" }}
              >
                Email
              </label>
              <input
                type="email"
                id="uemail"
                name="uemail"
                className="form-control"
                ref={uemail}
                autoComplete="on"
              />
            </div>
            <div className={style.formRow}>
              <label
                htmlFor="usrPwd"
                className="form-label"
                style={{ width: "250px" }}
              >
                Password
              </label>
              <input
                type="password"
                id="usrPwd"
                name="usrPwd"
                className="form-control"
                ref={upwd}
              />
            </div>
            <div
              className={`${style.formRow} mb-3`}
              style={{
                justifyContent: "flex-end",
                gap: "30px",
                marginTop: "25px",
              }}
            >
              <input type="submit" value="Submit" className="btn btn-success" />
              <input type="reset" value="Reset" className="btn btn-danger" />
            </div>
            <div className="text-end">
              <button className="btn btn-primary me-3" onClick={admin}>
                Admin
              </button>
              <button className="btn btn-danger" onClick={handleGoogleSignIn}>
                Sign In With <span className="fw-bold fs-6">Google</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
