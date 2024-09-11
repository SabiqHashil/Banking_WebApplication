import { useNavigate } from "react-router-dom";
import axiosapi from "../../helpers/axiosapi";
import UserList from "./UserList";

const AdminDashboard = () => {

  const navigator = useNavigate();

  const handleLogout = async () => {
    // Handle logout logic here
    console.log("User logged out");
    try {
      await axiosapi.get("/admin/logout");
    } catch (error) {
      console.log("Error logging out", error);
    } finally {
      navigator('/admin/login');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        {/* Dashboard Title */}
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      {/* User List Component */}
      <UserList />
    </div>
  );
};

export default AdminDashboard;
