import AdminLoginForm from "../components/auth/AdminLoginForm";

const AdminLoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">Banking Website</h1>
      <div className="max-w-md w-full p-6 bg-white border border-gray-300 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        <AdminLoginForm />
      </div>
    </div>
  );
};

export default AdminLoginPage;
