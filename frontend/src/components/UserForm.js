import { useState, useEffect } from "react";
import { createUser, updateUser } from "../services/UserService";

function UserForm({ selectedUser, refresh, clearSelection }) {
  const [user, setUser] = useState({
    id: "",
    firstName: "",
    lastName: "",
    age: "",
    gender: "",
    dateOfBirth: "",
    mobileNumber: "",
    email: "",
    address: "",
    city: "",
    district: "",
    state: "",
    country: ""
  });

  // Load selected user for update
  useEffect(() => {
    if (selectedUser) setUser(selectedUser);
  }, [selectedUser]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setUser({
      ...user,
      [name]: type === "number" ? parseInt(value) || "": value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate required fields
    if (!user.firstName || !user.lastName || !user.email) {
      alert("First Name, Last Name, and Email are required");
      return;
    }

    // Decide create or update
    if (user.id) {
      updateUser(user.id, user).then(() => {
        refresh();
        clearSelection();
      });
    } else {
      createUser(user).then(() => refresh());
    }

    // Reset form
    setUser({
      id: "",
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      dateOfBirth: "",
      mobileNumber: "",
      email: "",
      address: "",
      city: "",
      district: "",
      state: "",
      country: ""
    });
  };

  return (
    <form className="card p-3 mb-3" onSubmit={handleSubmit}>
      <h5>{user.id ? "Update User" : "Create User"}</h5>

      <input
        type="text"
        name="firstName"
        placeholder="First Name"
        value={user.firstName}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="text"
        name="lastName"
        placeholder="Last Name"
        value={user.lastName}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="number"
        name="age"
        placeholder="Age"
        value={user.age}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <select
        name="gender"
        value={user.gender}
        onChange={handleChange}
        className="form-control mb-2"
      >
        <option value="">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>

      <input
        type="date"
        name="dateOfBirth"
        value={user.dateOfBirth}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="text"
        name="mobileNumber"
        placeholder="Mobile Number"
        value={user.mobileNumber}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="text"
        name="address"
        placeholder="Address"
        value={user.address}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="text"
        name="city"
        placeholder="City"
        value={user.city}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="text"
        name="district"
        placeholder="District"
        value={user.district}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="text"
        name="state"
        placeholder="State"
        value={user.state}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <input
        type="text"
        name="country"
        placeholder="Country"
        value={user.country}
        onChange={handleChange}
        className="form-control mb-2"
      />

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-success">
          {user.id ? "Update" : "Create"}
        </button>

        {user.id && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearSelection}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default UserForm;
