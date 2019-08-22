import React from "react";

function Search(props) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search by name"
        onChange={props.handleChange}
      />
    </form>
  );
}

export default Search;
