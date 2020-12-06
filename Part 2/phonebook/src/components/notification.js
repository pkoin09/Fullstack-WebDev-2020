import React from "react";

const Notification = ({ errorMessage }) => {
    if(errorMessage.errStatus === "noError") {
      return(
        <>
          <p className="noError">{errorMessage.errMsg}</p>
        </>
      );
    } else if((errorMessage.errStatus === "error")) {
      return(
        <>
          <p className="error">{errorMessage.errMsg}</p>
        </>
      );
    } else {
      return(
        <>
        </>
      )
    }
  }

  export default Notification;