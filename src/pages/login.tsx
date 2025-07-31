import { useState, type FormEvent } from "react";
import type { MyFormData } from "../types";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState<MyFormData>({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState({
    error: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Function to handle form submission
  const handleSignIn = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (!formData.email || !formData.password) {
      setErrorMessage({
        error: true,
        message: "Please fill in all fields.",
      });
      setLoading(false);
      return;
    }

    if (formData.email !== "test@gmail.com" || formData.password !== "123456") {
      setErrorMessage({
        error: true,
        message: "Invalid email or password.",
      });
      setLoading(false);
      return;
    }

    // simulate api response time
    setTimeout(() => {
      setErrorMessage({ error: false, message: "" });
      setFormData({ email: "", password: "" });
      setLoading(false);
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <div className="w-9/12">
        <h1 className="font-bold text-2xl text-center ">Welcome</h1>

        <div
          className={`text-red-700 ${
            errorMessage.error ? "visible" : "invisible"
          } py-1 mb-2 text-center`}
        >
          <p>{errorMessage.message} &nbsp; </p>
        </div>
        <form
          className="flex flex-col items-center mt-2"
          onSubmit={(e) => handleSignIn(e)}
        >
          <input
            type="email"
            placeholder="Enter your email"
            value={formData.email}
            className={`border ${
              errorMessage.error && "border-red-400"
            } p-2 rounded-xl lg:w-4/12 w-11/12`}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={formData.password}
            className={`border ${
              errorMessage.error && "border-red-400"
            } p-2 rounded-xl my-4 lg:w-4/12 w-11/12`}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <button
            className={`bg-blue-500 text-white py-2 px-4 sm:px-8 rounded-xl hover:bg-blue-600 cursor-pointer ${
              loading && "opacity-50"
            }`}
            disabled={loading}
          >
            {loading && (
              <span className="align-middle inline-block loader h-6 w-6 mr-3"></span>
            )}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
