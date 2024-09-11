import { useState, useEffect } from "react";
import axiosapi from "../../helpers/axiosapi";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosapi.get("/admin/users");
        setUsers(response.data.user);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };
    fetchUsers();
  }, []);

  const handleToggleStatus = (id) => {
    console.log("Toggle status for user with id: ", id);
    // setUsers(
    //   users.map((user) =>
    //     user.id === id ? { ...user, isEnabled: !user.isEnabled } : user
    //   )
    // );
  };

  if (!users) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">User List</h1>
      <table className="w-full border-collapse bg-white shadow-md rounded-md">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-center">User Name</th>
            <th className="border px-4 py-2 text-center">Phone Number</th>
            <th className="border px-4 py-2 text-center">Account Number</th>
            <th className="border px-4 py-2 text-center">Account Balance</th>
            <th className="border px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id} className="border-b">
              <td className="border px-4 py-2">{user.name}</td>
              <td className="border px-4 py-2">{user.phoneNo}</td>
              <td className="border px-4 py-2">{user.account.accountNo}</td>
              <td className="border px-4 py-2">{user.account.balance}</td>
              <td className="border px-3 py-2">
                <button className="bg-blue-500 text-white py-1 px-2 rounded-md shadow hover:bg-blue-600 mr-2">
                  Edit
                </button>
                <button className="bg-red-500 text-white py-1 px-2 rounded-md shadow hover:bg-red-600 mr-2">
                  Delete
                </button>
                <button
                  onClick={() => handleToggleStatus(user._id)}
                  className={`py-1 px-2 rounded-md shadow ${"bg-yellow-500 text-white hover:bg-yellow-600"}`}
                >
                  {"Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
