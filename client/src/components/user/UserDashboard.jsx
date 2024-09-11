import { useEffect, useState } from "react";
import axiosapi from "../../helpers/axiosapi";
import TransactionList from "./TransactionList";
import AddMoneyPopUp from "./AddMoneyPopUp";
import WithdrawMoneyPopup from "./WithdrawMoneyPopup";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showWithdrawPopup, setShowWithdrawPopup] = useState(false);

  const navigator = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosapi.get(`/user`);
        setUser(response.data.user);
        setTransactions(response.data.transactions);
      } catch (error) {
        const message = error.response.data.message;
        console.error(message || error.message);
      }
    };
    fetchUser();
  }, []);

  const handleAddClick = () => {
    setShowAddPopup(true);

  };

  const handleWithdrawClick = () => {
    setShowWithdrawPopup(true);
  };

  const handleCloseAddPopup = () => {
    setShowAddPopup(false);
  };

  const handleCloseWithdrawPopup = () => {
    setShowWithdrawPopup(false);
  };

  const handleLogout = async () => {
    // Handle logout logic here
    console.log("User logged out");
    try {
      await axiosapi.get("/user/logout");
    } catch (error) {
      console.log("Error logging out", error);
    } finally {
      navigator('/login');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">User Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>

      <div className="border p-4 rounded-md shadow-sm mb-4">
        <h2 className="text-lg font-medium mb-2">{user.name}</h2>
        <p className="text-gray-700 mb-2">
          Account Number: {user.accountNo}
        </p>
        <p className="text-gray-700">Balance: {user.balance}</p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleAddClick}
          className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600"
        >
          Add
        </button>
        <button
          onClick={handleWithdrawClick}
          className="bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600"
        >
          Withdraw
        </button>
      </div>

      <TransactionList tran={transactions} />

      {/* Popups */}
      {showAddPopup && <AddMoneyPopUp onClose={handleCloseAddPopup} />}
      {showWithdrawPopup && (
        <WithdrawMoneyPopup onClose={handleCloseWithdrawPopup} balance={user.balance} />
      )}
    </div>
  );
};

export default UserDashboard;
