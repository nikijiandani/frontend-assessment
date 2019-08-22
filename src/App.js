import React from "react";
import "./App.css";
import { useFetch } from "./useFetch.js";

function App() {
  const [data, loading] = useFetch(
    "https://www.hatchways.io/api/assessment/students"
  );
  return (
    <div className="App">
      {loading ? (
        "Loading..."
      ) : (
        <ul class="student-list">
          {data.students.map(item => (
            <li key={item.id}>
              <img src={item.pic} alt="avatar" />
              <h3>
                {item.firstName} {item.lastName}
              </h3>
              <p>Email: {item.email}</p>
              <p>Company: {item.company}</p>
              <p>Skill: {item.skill}</p>
              <p>
                Average:
                {item.grades.reduce((a, b) => Number(a) + Number(b)) /
                  item.grades.length}
                %
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
