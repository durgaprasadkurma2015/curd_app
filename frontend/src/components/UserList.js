import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../services/UserService";

function UserList({ onEdit, refreshKey }) {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(res => setUsers(res.data));
  }, [refreshKey]);

  return (
    <table className="table table-bordered">
      <thead className="table-dark">
        <tr>
          <th>id</th>
          <th>firstName</th>
          <th>lastName</th>
          <th>age</th>
          <th>gender</th>
          <th>dateOfBirth</th>
          <th>mobileNumber</th>
          <th>address</th>
          <th>district</th>
          <th>state</th>
          <th>country</th>
          <th>Email</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        {users.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.firstName}</td>
            <td>{user.lastName}</td>
            <td>{user.age}</td>
            <td>{user.gender}</td>
            <td>{user.dateOfBirth}</td>
            <td>{user.mobileNumber}</td>
            <td>{user.address}</td>
            <td>{user.district}</td>
            <td>{user.state}</td>
            <td>{user.country}</td>
            <td>{user.email}</td>
            <td>{user.city}</td>
            <td>
              <button
                className="btn btn-warning btn-sm me-2"
                onClick={() => onEdit(user)}>
                Update
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id).then(() => setUsers(
                  users.filter(u => u.id !== user.id)
                ))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserList;
