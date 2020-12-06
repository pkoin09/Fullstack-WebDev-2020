import React from "react";

const form = ({ filterState, handleCountryFilter }) => {
    return(
        <div>
            find countries: <input 
            type="text"
            value={filterState}
            onChange={handleCountryFilter}
            />
        </div>
    );
}

export default form;

