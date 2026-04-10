import { useState } from "react";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

function App() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedUser, setSelectedUser] = useState(null);

  const refresh = () => setRefreshKey(old => old + 1);

  return (
    <div className="container mt-4">
      <h2 className="text-center">User CRUD Application</h2>

      <UserForm
        selectedUser={selectedUser}
        refresh={refresh}
        clearSelection={() => setSelectedUser(null)}
      />

      <UserList
        refreshKey={refreshKey}
        onEdit={(user) => setSelectedUser(user)}
      />
    </div>
  );
}

export default App;
