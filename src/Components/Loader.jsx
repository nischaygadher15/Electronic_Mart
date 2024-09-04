import React from "react";
import loader from "../assets/Loader2.gif";
import style from "../Components/Loader.module.css";

const Loader = () => {
  return (
    <div id={style.loaderBg}>
      <img
        src={loader}
        alt="Loader Gif"
        width="60"
        height="60"
        // style={{ background: "transparent" }}
      />
    </div>
  );
};

export default Loader;
