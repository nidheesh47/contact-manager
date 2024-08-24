import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

const AddForm = () => {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});
  const [submittedContacts, setSubmittedContacts] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDelete = (index) => {
    const updatedContacts = submittedContacts.filter((_, i) => i !== index);
    setSubmittedContacts(updatedContacts);
  };

  const validate = () => {
    let errors = {};
    if (!formData.name) errors.name = "Please enter name";
    if (!formData.email) errors.email = "Please enter email";

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      // Add submitted contact to the list
      setSubmittedContacts([...submittedContacts, formData]);

      // Reset form fields
      setFormData({ name: "", email: "" });
      setErrors({});
    }
  };

  return (
    <div className="container my-5 border rounded p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <div className="text-danger">{errors.name}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <div className="text-danger">{errors.email}</div>}
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>

      <hr />
      {submittedContacts.length === 0 ? (
        <br/>
      ) : (
        <ul className="list-group">
          {submittedContacts.map((contact, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <strong>Name:</strong> {contact.name}
                <br />
                <strong>Email:</strong> {contact.email}
                <br />
              </div>
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(index)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddForm;