import React, { useState, useEffect } from "react";
import "./App.css";
import { useFetch } from "./useFetch.js";
import SearchByName from "./components/SearchByName.js";
import SearchByTag from "./components/SearchByTag.js";

function StudentList(props) {
  const [list, setList] = useState(props.data.students);
  const [filteredList, setFilteredList] = useState(list);
  const [taggedList, setTaggedList] = useState(list);

  //Add tags to incoming student list
  useEffect(() => {
    setTaggedList(taggedList.map(item => (item.tags = [])));
    setFilteredList(taggedList);
  }, []);

  const handleNameSearch = e => {
    e.preventDefault();
    let query = e.target.value.toUpperCase();
    let result;
    console.log(list);
    console.log(e.target.parentNode.parentNode.children[1].firstChild.value);
    result = list.filter(
      item =>
        item.firstName.toUpperCase().includes(query) ||
        item.lastName.toUpperCase().includes(query)
    );
    console.log(result);
    if (e.target.parentNode.parentNode.children[1].firstChild.value !== "") {
      result.filter(
        item =>
          item.tags.filter(tag =>
            tag
              .toUpperCase()
              .includes(
                e.target.parentNode.parentNode.children[1].firstChild.value
              )
          ).length > 0
      );
    }
    console.log(result);
    setFilteredList(result);
  };

  const handleTagSearch = e => {
    e.preventDefault();
    let query = e.target.value.toUpperCase();
    let result;
    result = list.filter(
      item =>
        item.tags.filter(tag => tag.toUpperCase().includes(query)).length > 0
    );
    setFilteredList(result);
    if (query === "") {
      setFilteredList(list);
    }
  };

  const onTagChange = e => {
    if (e.key === "Enter") {
      let newTag = e.target.value;
      let studentId = Number(
        e.target.parentElement.children[1].getAttribute("data-student-id")
      );
      let studentData = [...list];

      if (!studentData[studentId - 1].hasOwnProperty("tags")) {
        studentData[studentId - 1]["tags"] = [];
      }
      studentData[studentId - 1]["tags"].push(newTag);
      setList(studentData);
      e.target.value = "";
    }
  };

  return (
    <main className="container">
      <section className="search-bar">
        <SearchByName handleNameSearch={handleNameSearch} />
        <SearchByTag handleTagSearch={handleTagSearch} />
      </section>
      <ul className="student-list">
        {filteredList.length <= 0 ? (
          <p>No results found.</p>
        ) : (
          filteredList.map((data, i) => (
            <Student data={data} key={i} onTagChange={onTagChange} />
          ))
        )}
      </ul>
    </main>
  );
}

function Student(props) {
  const [active, setActive] = useState(false);
  const [btn, setBtn] = useState("+");

  const handleClick = e => {
    e.preventDefault();
    setActive(!active);
    e.target.innerText === "+" ? setBtn("-") : setBtn("+");
  };

  function Tags(props) {
    return (
      <section className="tags" data-student-id={props.id}>
        {props.tags && props.tags.map((tag, i) => <p key={i}>{tag}</p>)}
      </section>
    );
  }

  return (
    <li key={props.data.id} className="student">
      <div className="student-card">
        <img src={props.data.pic} alt="avatar" />
        <section>
          <header>
            <h3 className="student-name">
              {props.data.firstName} {props.data.lastName}
            </h3>
            <span>
              <button onClick={handleClick}>{btn}</button>
            </span>
          </header>
          <div className="student-details">
            <p>Email: {props.data.email}</p>
            <p>Company: {props.data.company}</p>
            <p>Skill: {props.data.skill}</p>
            <p>
              Average:
              {props.data.grades &&
                props.data.grades.reduce((a, b) => Number(a) + Number(b)) /
                  props.data.grades.length}
              %
            </p>
          </div>
        </section>
      </div>
      <section className={active ? "collapsible active" : "collapsible"}>
        <ul className="student-grades">
          {props.data.grades &&
            props.data.grades.map((test, i) => (
              <li key={i}>
                Test {i + 1}: {test}%
              </li>
            ))}
        </ul>
        <Tags tags={props.data.tags} id={props.data.id} />
        <input
          type="text"
          placeholder="Add a tag"
          className="add-tag"
          onKeyPress={props.onTagChange}
        />
      </section>
    </li>
  );
}

function App() {
  const [data, loading] = useFetch(
    "https://www.hatchways.io/api/assessment/students"
  );
  return (
    <div className="App">
      {loading ? "Loading..." : <StudentList data={data} />}
    </div>
  );
}

export default App;
