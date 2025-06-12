import { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg(""); setError("");
    try {
      const res = await axios.post("/api/auth/forgot-password", { email });
      setMsg(res.data.message);
    } catch (err) {
      setError(err.response?.data?.error || "Error sending email");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex justify-center items-center mb-6">
            <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center mr-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h1 className="text-3xl font-bold text-indigo-800">AcadBud</h1>
        </div>
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            placeholder="Enter your email"
            className="w-full border p-2 rounded mb-3" />
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Send Reset Link</button>
        </form>
        {msg && <p className="text-green-600 mt-2">{msg}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
