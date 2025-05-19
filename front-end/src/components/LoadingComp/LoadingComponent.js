import React from "react";
import ReactLoading from "react-loading";

const LoadingComponent = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <ReactLoading type="cylon" color="blue" />
    </div>
  );
};

export default LoadingComponent;
