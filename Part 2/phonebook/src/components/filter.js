import React from "react";

const filter = ({handleFilterChange}) => {
    return(
      <>
        filter shown with a: <input 
            type="text"
            onChange={handleFilterChange}
        />
      </>
    );
  }

  export default filter;