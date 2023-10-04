import React, { useState } from "react";

export default function SearchBox(props) {
  const [name, setName] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    //redirect user to search page
    props.history.push(`/search/name/${name}`);
  };
  return (
    <form className="search" onSubmit={submitHandler}>
      <div className="row">
        <input
          type="text"
          name="q"
          id="q"
          placeholder="Search"
          onChange={(e) => setName(e.target.value)}
        ></input>
        <button>
          <i className="fa fa-search"></i>
        </button>
      </div>
    </form>
  );
}
