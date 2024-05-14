import React, { useContext } from "react";
import { UserContext } from "../UserContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import PlacesPage from "./PlacesPage";
import AccountsNav from "../components/AccountsNav";

const Account = () => {
  const { ready, user, setUser } = useContext(UserContext);
  let { subpage } = useParams();
  const navigate = useNavigate();

  if (subpage === undefined) {
    subpage = "profile";
  }

  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }

  const handlelogout = () => {
    const local = localStorage.getItem("user");
    if (local) {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    }
  };
  return (
    <div className="min-h-screen">
      <AccountsNav />

      {subpage === "profile" && (
        <div className="max-w-lg mx-auto mt-8 text-center">
          <p className="mb-2">
            Logged in as {user?.name} with {user?.email}
          </p>
          <button
            className="bg-primary w-full py-2 px-4 rounded-full text-white font-bold max-w-sm"
            onClick={handlelogout}
          >
            Logout
          </button>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
      {subpage === "bookings" && (
        <div className="text-center mt-4">
          <p className="font-bold text-2xl">My bookings</p>
        </div>
      )}
    </div>
  );
};

export default Account;
