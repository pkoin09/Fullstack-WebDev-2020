import React from "react";

const form = ({
    newName,
    newNum,
    handleNameSubmit,
    handleNameChange,
    handleNumberChange
  }) => {
    return(
      <>
        <h2>Add a new</h2>
        <form onSubmit={handleNameSubmit}>
          <div>
            name: <input 
              type="text"
              value={newName}
              onChange={handleNameChange}
            />
          </div>
          <div>
            phone: <input 
              type="text"
              value={newNum}
              onChange={handleNumberChange}
            />
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
      </>
    );
  }

  export default form;