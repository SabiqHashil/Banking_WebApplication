import { useState } from "react";
import axiosapi from "../../helpers/axiosapi";
import { useNavigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const AddMoneyPopup = ({ onClose }) => {
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate =  useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    setError("");
    setSuccess("");

    try {
      const response = await axiosapi.post("/account/add-money", {
        amount: parseFloat(amount),
      });
      setSuccess("Money added successfully");
      console.log("Response", response.data);
      setAmount("");
      onClose();
      navigate(0);
    } catch (error) {
      setError("Errod adding money. Please try again.");
      console.log(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-xl font-semibold mb-4">Add Money</h2>
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
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {success && <p className="text-green-500 mb-4">{success}</p>}
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
              className="bg-green-500 text-white py-2 px-4 rounded-md shadow hover:bg-green-600"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMoneyPopup;
