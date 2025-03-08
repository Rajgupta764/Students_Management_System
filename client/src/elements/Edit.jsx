import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Edit.css"; // Importing the CSS file

function Edit() {
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

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post(`/edit_user/${id}`, data[0])
      .then((res) => {
        navigate("/");
        console.log(res);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div className="edit-container">
      <div className="edit-card">
        <h2 className="edit-title">Edit Student</h2>
        <Link to="/" className="btn-home">
          Back
        </Link>
        {data.map((student) => {
          return (
            <form onSubmit={handleSubmit} className="edit-form" key={student.id}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  value={student.name}
                  type="text"
                  name="name"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], name: e.target.value }])
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  value={student.email}
                  type="email"
                  name="email"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], email: e.target.value }])
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <input
                  value={student.gender}
                  type="text"
                  name="gender"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], gender: e.target.value }])
                  }
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">Age</label>
                <input
                  value={student.age}
                  type="number"
                  name="age"
                  required
                  onChange={(e) =>
                    setData([{ ...data[0], age: e.target.value }])
                  }
                />
              </div>
              <div className="form-group">
                <button type="submit" className="btn-save">
                  Save
                </button>
              </div>
            </form>
          );
        })}
      </div>
    </div>
  );
}

export default Edit;
