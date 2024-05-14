// import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, json } from "react-router-dom";
// import PlacesForm from "../components/PlacesForm";
import AccountsNav from "../components/AccountsNav";
import axios from "axios";
import { UserContext } from "../UserContext";
import CircularProgress from "@mui/material/CircularProgress";
import Image from "../components/lazyloadImage/Image";

const PlacesPage = () => {
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [places, setPlaces] = useState([]);

  const { loading, setLoading } = useContext(UserContext);

  useEffect(() => {
    const getAddplaces = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      setLoading(true);
      const { data } = await axios.get("/api/v1/product/places", config);
      if (data.success) {
        setPlaces(data.result);
        setLoading(false);
      }
    };
    getAddplaces();
  }, [token]);

  return (
    <div className="min-h-screen">
      <AccountsNav />
      <div className="text-center mt-4 ">
        <div className="flex flex-col justify-center items-center gap-3">
          {/* <span className="text-2xl">List of all added places</span> */}
          <Link
            to="/account/places/new"
            className="bg-primary text-white py-2 px-4 rounded-full items-center gap-2 inline-flex"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z"
                clipRule="evenodd"
              />
            </svg>
            Add new places
          </Link>
        </div>
        <div
          className={`mt-4 grid grid-cols-1 ${
            places?.length > 0 ? "lg:grid-cols-2" : ""
          }`}
        >
          {!loading &&
            places?.length > 0 &&
            places.map((place, index) => (
              <Link
                to={"/account/places/" + place._id}
                className="cursor-pointer flex flex-col sm:flex-row bg-gray-100 p-4 rounded-2xl gap-4 mx-2 mb-3"
                key={index}
              >
                <div className="w-full h-56 sm:w-32 sm:h-32 bg-gray-300 grow shrink-0">
                  {place?.photos?.length > 0 && (
                    <Image
                      src={place?.photos[0]?.url}
                      alt={place?.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="grow-0 shrink text-left">
                  <h1 className="text-xl">{place.title}</h1>
                  <p>{place.description}</p>
                </div>
              </Link>
            ))}
          {!loading && places?.length === 0 && (
            <div className="px-8 py-4 bg-gray-200 flex items-center justify-center mx-auto">
              <span className="font-medium text-black">
                No data found for{" "}
                {JSON.parse(localStorage.getItem("user"))?.name}
              </span>
            </div>
          )}
        </div>
        {loading && (
          <div className="h-[400px] flex items-center justify-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlacesPage;
