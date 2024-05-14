import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Ragister = () => {
  const initialvalues = { name: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialvalues);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // const navigate = useNavigate();

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data } = await axios.post("/api/v1/auth/register", formValues);
    if (data?.success) {
      // alert(data?.message);
      setSuccess(data?.message);
      setFormValues(initialvalues);
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } else {
      setError(data?.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    }
  };

  const getClass = (classes) => {
    let initialClass =
      "p-4 mt-4 text-sm  rounded-lg  dark:bg-gray-800  text-center ";
    initialClass += classes;
    return initialClass;
  };
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)]">
      <div>
        <h1 className="text-4xl text-center">Signup</h1>
        {success && (
          <div
            className={getClass(
              "text-green-800 bg-green-50  dark:text-green-400 "
            )}
            role="alert"
          >
            {success}
          </div>
        )}
        {error && (
          <div
            className={getClass("text-red-800 bg-red-50  dark:text-red-400")}
            role="alert"
          >
            {error}
          </div>
        )}

        <form
          className="w-[400px] sm:w-[500px] mx-auto flex flex-col items-center gap-3 px-16 py-10"
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            placeholder="Enter your name"
            name="name"
            value={formValues.name}
            onChange={handleChangeInput}
          />
          <input
            type="email"
            placeholder="Enter your mail"
            name="email"
            value={formValues.email}
            onChange={handleChangeInput}
          />
          <input
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formValues.password}
            onChange={handleChangeInput}
          />
          <button className="w-full py-2 px-3 bg-primary text-white text-xl rounded-xl hover:bg-secondary">
            Signup
          </button>
          <div className="flex gap-2">
            Already have a account!
            <Link to={"/login"} className="text-primary font-bold underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Ragister;
