import React from "react";

function SearchByName(props) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search by name"
        onChange={props.handleNameSearch}
      />
    </form>
  );
}

export default SearchByName;
