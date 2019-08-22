import React from "react";
import "./App.css";
import { useFetch } from "./useFetch.js";

function StudentList(props) {
  return (
    <ul className="student-list">
      {props.data.students.map(item => (
        <li key={item.id} className="student">
          <img src={item.pic} alt="avatar" />
          <section>
            <h3>
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
