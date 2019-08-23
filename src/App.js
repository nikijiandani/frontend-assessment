import React, { useState } from "react";
import "./App.css";
import { useFetch } from "./useFetch.js";
import SearchByName from "./components/SearchByName.js";
import SearchByTag from "./components/SearchByTag.js";

const handleNameSearch = e => {
  e.preventDefault();
  let query = e.target.value.toUpperCase();
  let students = document.getElementsByClassName("student");
  for (var i = 0; i < students.length; i++) {
    students[i]
      .getElementsByTagName("h3")[0]
      .innerText.toUpperCase()
      .includes(query)
      ? (students[i].style.display = "")
      : (students[i].style.display = "none");
  }
};

const handleTagSearch = e => {
  e.preventDefault();
  console.log(e);
};

function StudentList(props) {
  return (
    <main className="student-list">
      <SearchByName handleNameSearch={handleNameSearch} />
      <ul>
        {props.data.students.map((data, i) => (
          <Student data={data} key={i} />
        ))}
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

  const onTagChange = e => {
    if (e.key === "Enter") {
      let newTag = document.createElement("p");
      newTag.appendChild(document.createTextNode(e.target.value));
      document
        .querySelector(
          `.${e.target.parentElement.children[0].lastChild.classList[0]}`
        )
        .appendChild(newTag);
      e.target.value = "";
    }
  };

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
              {props.data.grades.reduce((a, b) => Number(a) + Number(b)) /
                props.data.grades.length}
              %
            </p>
          </div>
        </section>
      </div>
      <section className={active ? "collapsible active" : "collapsible"}>
        <ul className="student-grades">
          {props.data.grades.map((test, i) => (
            <li key={i}>
              Test {i + 1}: {test}%
            </li>
          ))}
          <section className={"student-" + props.data.id + " tags"} />
        </ul>
        <input
          type="text"
          placeholder="Add a tag"
          className="add-tag"
          onKeyPress={onTagChange}
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
