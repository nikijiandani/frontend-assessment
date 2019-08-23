import React, { useState } from "react";
import "./App.css";
import { useFetch } from "./useFetch.js";
import Search from "./components/Search.js";

const handleChange = e => {
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

function StudentList(props) {
  return (
    <main className="student-list">
      <Search handleChange={handleChange} />
      <ul>
        {props.data.students.map((data, i) => (
          <Student data={data} key={i} />
        ))}
      </ul>
    </main>
  );
}

function Student(props) {
  const handleClick = e => {
    e.preventDefault();
    setActive(!active);
    e.target.innerText === "+" ? setBtn("-") : setBtn("+");
  };

  const [active, setActive] = useState(false);
  const [btn, setBtn] = useState("+");
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
        </ul>
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
