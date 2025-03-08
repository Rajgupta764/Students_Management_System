import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css"; // Importing the CSS file

function Home() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      axios
        .get("/students")
        .then((res) => {
          setData(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [deleted]);

  function handleDelete(id) {
    axios
      .delete(`/delete/${id}`)
      .then((res) => {
        setDeleted(true);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="home-container">
      <h2 className="home-title">Students List</h2>
      <div className="add-button">
        <Link className="btn-add" to="/create">
          Add Student
        </Link>
      </div>
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student) => {
            return (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.age}</td>
                <td>{student.gender}</td>
                <td>
                  <Link className="btn-action btn-read" to={`/read/${student.id}`}>
                    Read
                  </Link>
                  <Link className="btn-action btn-edit" to={`/edit/${student.id}`}>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(student.id)} className="btn-action btn-delete">
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Home;
