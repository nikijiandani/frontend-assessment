import React from "react";
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
        {props.data.students.map(item => (
          <li key={item.id} className="student">
            <img src={item.pic} alt="avatar" />
            <section>
              <h3 className="student-name">
                {item.firstName} {item.lastName}
              </h3>
              <div>
                <p>Email: {item.email}</p>
                <p>Company: {item.company}</p>
                <p>Skill: {item.skill}</p>
                <p>
                  Average:
                  {item.grades.reduce((a, b) => Number(a) + Number(b)) /
                    item.grades.length}
                  %
                </p>
              </div>
            </section>
          </li>
        ))}
      </ul>
    </main>
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
