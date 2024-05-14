import axios from "axios";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Login = () => {
  const initialvalues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialvalues);
  const navigate = useNavigate();
  const [fronterror, setFronterror] = useState("");
  const [success, setSuccess] = useState("");

  const { setUser } = useContext(UserContext);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("/api/v1/auth/login", formValues);
      console.log(response);
      if (response.data.success) {
        let userInfo = {
          ...response?.data?.user,
          isLoggedin: true,
          token: response?.data?.token,
        };
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
        setTimeout(() => {
          navigate("/");
        }, 1000);
        setSuccess(response.data.message);
      } else {
        setFronterror(response?.data?.message);
        setTimeout(() => {
          setFronterror("");
        }, 2000);
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      setFronterror(data?.message);
      setTimeout(() => {
        setFronterror("");
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
        <h1 className="text-4xl text-center">Login</h1>
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
        {fronterror && (
          <div
            className={getClass("text-red-800 bg-red-50  dark:text-red-400")}
            role="alert"
          >
            {fronterror}
          </div>
        )}
        <form
          className="w-[500px] mx-auto flex flex-col items-center gap-3 px-16 py-10"
          onSubmit={handleSubmit}
        >
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
            Login
          </button>
          <div className="flex gap-2">
            Don't have account yet?
            <Link to={"/signup"} className="text-primary font-bold underline">
              Signup
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
