const Register = () => {
  return (
    <div className="flex justify-center items-center h-screen">

      <div className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-2xl font-bold mb-4">
          Register
        </h2>

        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 mb-4"
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4"
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-4"
        />

        <button className="bg-black text-white w-full py-2 rounded">
          Register
        </button>

      </div>

    </div>
  );
};

export default Register;