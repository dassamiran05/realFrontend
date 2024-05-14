import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";

const Header = () => {
  const [show, setShow] = useState(false);

  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [activestat, setActivestat] = useState(true);
  // console.log(activestat);

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll, { passive: true });

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  // const handleScroll = () => {
  //   const position = window.scrollY;
  //   if (position >= 300) {
  //     setActivestat(false);
  //   } else {
  //     setActivestat(true);
  //   }
  // };

  const handlelogout = () => {
    const local = localStorage.getItem("user");
    if (local) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };

  // useEffect(() => {
  //   console.log(window.scrollY);
  // }, [window.scrollY]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md">
      {/* className="fixed top-0 left-0 right-0 z-40 bg-white shadow-md" */}
      <div className="flex justify-center sm:justify-between items-center h-[76px] px-2">
        <a href="/" className="hidden sm:flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 -rotate-90"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          <span className="font-bold text-xl">RealEstate</span>
        </a>

        {/* {!activestat && (
          <div className="flex border gap-3 border-gray-300 py-2 px-4 rounded-full shadow-md shadow-gray-300">
            <div>Anywahre</div>
            <div className="border-l border-gray-300"></div>
            <div>Any week</div>
            <div className="border-l border-gray-300"></div>
            <div>Add guests</div>
            <button className="bg-primary p-1 text-white rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </div>
        )}
        {activestat && (
          <div className="flex flex-col gap-2 justify-center">
            <div className="flex items-center justify-between gap-8">
              <div className="px-3 py-2 text-md text-gray-600 hover:text-gray-950 font-medium bg-transparent hover:bg-gray-100 active:font-semibold rounded-xl cursor-pointer">
                Stays
              </div>
              <div className="px-3 py-2 text-md text-gray-600 hover:text-gray-950 font-medium bg-transparent hover:bg-gray-100 active:font-semibold rounded-xl cursor-pointer">
                Experiences
              </div>
              <div className="px-3 py-2 text-md text-gray-600 hover:text-gray-950 font-medium bg-transparent hover:bg-gray-100 active:font-semibold rounded-xl cursor-pointer">
                Online Experiences
              </div>
            </div>
            {/* <div>
              <div className="flex border gap-3 border-gray-300 py-2 px-4 rounded-full shadow-md shadow-gray-300">
                <div>Anywahre</div>
                <div className="border-l border-gray-300"></div>
                <div>Any week</div>
                <div className="border-l border-gray-300"></div>
                <div>Add guests</div>
                <button className="bg-primary p-1 text-white rounded-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
              </div>
            </div> 
          </div>
        )} */}
        <div className="flex border gap-3 border-gray-300 py-2 px-4 rounded-full shadow-md shadow-gray-300">
          <div>Anywahre</div>
          <div className="border-l border-gray-300"></div>
          <div>Any week</div>
          <div className="border-l border-gray-300"></div>
          <div>Add guests</div>
          <button className="bg-primary p-1 text-white rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>

        <div
          className="hidden sm:flex border gap-3 border-gray-300 py-2 px-4 rounded-full items-center relative"
          onClick={() => setShow(!show)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
          <div className="rounded-full bg-gray-700 flex items-center justify-center border broder-gray-500 text-white overflow-hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 relative top-1"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {!!user && <p>{user.name}</p>}

          {show && (
            <div className="bg-white absolute right-0 top-14 flex flex-col gap-4 px-4 py-2 shadow-md shadow-gray-300 w-[250px] z-10 rounded-lg">
              {!!user ? (
                <Link to="/account">Account</Link>
              ) : (
                <>
                  <Link to="/login">Login</Link>
                  <Link to="/signup">Signup</Link>
                </>
              )}

              <div className="w-full h-[3px] bg-gray-300"></div>
              <Link to="#">Realestate your home</Link>
              <Link to="#">Help center</Link>
              {!!user && (
                <button
                  className="bg-primary w-full py-2 px-4 rounded-full text-white font-bold max-w-sm"
                  onClick={handlelogout}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      {/* {activestat && (
        <div className="hidden md:flex flex-col gap-2 justify-center items-center w-[60%] mx-auto bg-white rounded-full mt-2 mb-6 border-b-2 border-slate-200">
          <div className="flex border gap-3 border-gray-300 rounded-full shadow-md shadow-gray-300 w-full ">
            <label className="w-[27%] px-8 py-3 rounded-full cursor-pointer">
              <span className="text-sm font-semibold">Where</span>
              <input
                type="text"
                className="border-0 outline-none w-full p-0 m-0 bg-transparent headerInput leading-3 text-sm"
                placeholder="Search destinations"
              />
            </label>
            <div className="border-l border-gray-300"></div>
            <label className="w-[27%] px-8 py-3 rounded-full cursor-pointer">
              <span className="text-sm font-semibold">CheckIn</span>
              <input
                type="date"
                className="border-0 outline-none w-full p-0 m-0 bg-transparent headerDate leading-3 text-sm"
                placeholder="Add Dates"
              />
            </label>
            <div className="border-l border-gray-300"></div>
            <label className="w-[27%] px-8 py-3 rounded-full cursor-pointer">
              <span className="text-sm font-semibold">CheckOut</span>
              <input
                type="date"
                className="border-0 outline-none w-full p-0 m-0 bg-transparent headerDate leading-3 text-sm"
                placeholder="Add Dates"
              />
            </label>
            <div className="w-[10%] flex items-center justify-center py-1">
              <button className="bg-primary p-1 text-white rounded-full flex items-center justify-center w-[50px] h-[50px] text-md font-semibold">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )} */}
    </header>
  );
};

export default Header;
