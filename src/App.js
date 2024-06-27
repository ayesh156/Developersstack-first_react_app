import "./App.css";
import React, { useState } from "react";

function UserManager() {
  const [elements, setElements] = useState([]);

  const addElement = (newUser) => {
    setElements([...elements, newUser]);
  };

  const deleteElement = (id) => {
    setElements(elements.filter((element) => element.id !== id));
  };

  const toggleStatus = (id) => {
    setElements(
      elements.map((element) =>
        element.id === id ? { ...element, status: element.status === "true" ? "false" : "true" } : element
      )
    );
  };

  return (
    <div className="wrapper">
      <SearchForm onAddElement={addElement} />
      <hr />

      <div className="container">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Time</th>
              <th scope="col">Status</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {elements.map((user, index) => (
              <User {...user} key={index} onDelete={deleteElement} onToggleStatus={toggleStatus} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const SearchForm = ({ onAddElement }) => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    date: "",
    time: "",
    status: "true",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddElement(formData);
    setFormData({
      id: "",
      name: "",
      date: "",
      time: "",
      status: "true",
    });
  };

  return (
    <div className="search-outer">
      <form onSubmit={handleSubmit}>
        <div className="container pt-3">
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="id" className="form-label">
                ID
              </label>
              <input
                type="text"
                name="id"
                className="form-control"
                id="id"
                value={formData.id}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-9">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="form-control"
                id="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="date" className="form-label">
                Date
              </label>
              <input
                type="date"
                name="date"
                className="form-control"
                id="date"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="time" className="form-label">
                Time
              </label>
              <input
                type="time"
                name="time"
                className="form-control"
                id="time"
                value={formData.time}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="status" className="form-label">
                Status
              </label>
              <select
                className="form-select"
                name="status"
                id="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary col-12">
                Save Task
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const convertTimeTo12HourFormat = (time) => {
  const [hour, minute] = time.split(':');
  const hourInt = parseInt(hour, 10);
  const period = hourInt >= 12 ? 'PM' : 'AM';
  const hour12 = hourInt % 12 || 12;
  return `${hour12}:${minute} ${period}`;
};

const User = ({ id, name, date, time, status, onDelete, onToggleStatus }) => {
  const time12HourFormat = convertTimeTo12HourFormat(time);

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{date}</td>
      <td>{time12HourFormat}</td>
      <td>{status}</td>
      <td>
        <button
          onClick={() => onToggleStatus(id)}
          className="btn btn-success mb-3 mb-md-0"
        >
          Change Status
        </button>
        &nbsp;
        <button
          onClick={() => onDelete(id)}
          className="btn btn-danger mb-3 mb-md-0"
        >
          Delete Data
        </button>
      </td>
    </tr>
  );
};

export default UserManager;
