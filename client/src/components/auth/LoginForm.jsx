import { useState } from "react";
import axiosapi from "../../helpers/axiosapi";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    // Handle form submission here
    try {
      const response = await axiosapi.post("/user/login", {
        phoneNo: phoneNumber,
        password,
      });
      setSuccess(response.data.message);
      //* redirect to login
      navigate("/userDashboard");
    } catch (error) {
      const message = error.response.data.message;
      setError(message || error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="phoneNumber"
            className="block text-gray-700 font-semibold mb-2"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phoneNumber"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your phone number"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-gray-700 font-semibold mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded p-2 w-full"
            placeholder="Enter your password"
          />
        </div>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
