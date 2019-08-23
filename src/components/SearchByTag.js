import React from "react";

function SearchByTag(props) {
  return (
    <form>
      <input
        type="text"
        placeholder="Search by tag"
        onChange={props.handleTagSearch}
      />
    </form>
  );
}

export default SearchByTag;
