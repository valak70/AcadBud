const VerifyEmail = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96 text-center">
        <h1 className="text-2xl font-bold mb-4">Verify Your Email</h1>
        <p className="text-sm text-gray-600 mb-4">
          A verification link has been sent to your email address. Please click the link to verify your account.
        </p>
        <p className="text-sm text-gray-600 mb-6">
          If you didn't receive the email, please check your spam folder.
        </p>

        <a
          href="/login"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default VerifyEmail;
