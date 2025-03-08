import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "./Read.css"; // Importing the CSS file

function Read() {
  const [data, setData] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/get_student/${id}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <div className="read-container">
      <h2 className="read-title">Student Details</h2>
      <Link to="/" className="btn-back">
        Back
      </Link>
      {data.map((student) => (
        <ul className="student-info" key={student.id}>
          <li>
            <b>ID: </b> {student.id}
          </li>
          <li>
            <b>Name: </b> {student.name}
          </li>
          <li>
            <b>Email: </b> {student.email}
          </li>
          <li>
            <b>Age: </b> {student.age}
          </li>
          <li>
            <b>Gender: </b> {student.gender}
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Read;
