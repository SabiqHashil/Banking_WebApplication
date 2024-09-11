import { useState } from "react";
import axiosapi from "../../helpers/axiosapi";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const WithdrawMoneyPopup = ({ onClose, balance }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here

    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      setError("Please enter a valid withdrawal amount.");
      return;
    }

    if (parseFloat(amount) > balance) {
      setError("Insufficient balance.");
      return;
    }

    try {
      setError(null);
      const response = await axiosapi.post("/account/withdraw-money", {
        amount: parseFloat(amount),
      });
      if (response.data.success) {
        console.log("Amount withdrawn", amount);
        setAmount("");
        onClose();
        navigate(0);
      } else {
        setError("Failed to withdraw money.");
      }
    } catch (error) {
      console.log("Error withdrawing money:", error);
      setError("An error occured while processing the withdrawal.");
    }

    setAmount("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Withdraw Money</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 mb-2">
              Amount
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 p-2 w-full rounded-md"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md shadow hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-red-500 text-white py-2 px-4 rounded-md shadow hover:bg-red-600"
            >
              Withdraw
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WithdrawMoneyPopup;
