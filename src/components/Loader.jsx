import React from 'react'
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loader">
      <Oval
        height={80}
        width={80}
        color="#2b86c5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#ff3cac"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
}

export default Loader