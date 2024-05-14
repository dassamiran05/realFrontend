import React, { useEffect, useState } from "react";
import AccountsNav from "../components/AccountsNav";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import Image from "../components/lazyloadImage/Image";
import { CircularProgress } from "@mui/material";

const BookingsPage = () => {
  const [bookings, setBookings] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const getBookingsByuser = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axios.get("/api/v1/product/allbooking", config);

      if (data?.success) {
        setBookings(data?.bookings);
        setLoading(false);
      }
    };
    getBookingsByuser();
  }, [token]);

  const getTimebyFormat = (date) => {
    return moment(date, moment.HTML5_FMT.DATETIME_LOCAL_MS).format(
      "YYYY-MM-DD"
    );
  };

  const getNights = (checkin, checkout) => {
    return Math.floor(
      Math.abs(new Date(checkout) - new Date(checkin)) / (1000 * 60 * 60 * 24)
    );
  };
  return (
    <div className="min-h-screen">
      <AccountsNav />
      <div
        className={`mt-4 grid grid-cols-1 ${
          bookings?.length > 0 ? "lg:grid-cols-2 gap-4" : ""
        }`}
      >
        {!loading &&
          bookings?.length > 0 &&
          bookings.map((booking, index) => (
            <Link
              to={"/account/bookings/" + booking._id}
              className="cursor-pointer flex flex-col md:flex-row overflow-hidden bg-gray-200 rounded-2xl gap-4"
              key={index}
            >
              <div className="w-full h-56 md:h-auto md:w-48 shrink-0">
                {booking?.place?.photos?.length > 0 && (
                  <Image
                    src={booking?.place?.photos[0]?.url}
                    // src=""
                    alt={booking?.place?.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="py-3 px-3 md:px-0 pr-3 grow-0 shrink">
                <h1 className="text-2xl">{booking?.place?.title}</h1>
                {/* <p>{booking?.place?.description}</p> */}
                <div className="flex items-center gap-3 my-2 text-gray-500">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {getTimebyFormat(booking?.checkIn)}
                  </div>
                  =&gt;
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M12.75 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM7.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM8.25 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM9.75 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM10.5 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM12.75 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM14.25 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 17.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 15.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5ZM15 12.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM16.5 13.5a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                      <path
                        fillRule="evenodd"
                        d="M6.75 2.25A.75.75 0 0 1 7.5 3v1.5h9V3A.75.75 0 0 1 18 3v1.5h.75a3 3 0 0 1 3 3v11.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V7.5a3 3 0 0 1 3-3H6V3a.75.75 0 0 1 .75-.75Zm13.5 9a1.5 1.5 0 0 0-1.5-1.5H5.25a1.5 1.5 0 0 0-1.5 1.5v7.5a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5v-7.5Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {getTimebyFormat(booking?.checkOut)}
                  </div>
                </div>
                <div className="text-xl flex items-center">
                  <div className="flex gap-2 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.98 10.503 10.503 0 0 1-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 0 1 .818.162Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {getNights(booking?.checkIn, booking?.checkOut)} nights
                    &nbsp;
                  </div>
                  | Total Price: ${booking?.price}
                </div>
              </div>
            </Link>
          ))}
        {!loading && bookings?.length === 0 && (
          <div className="px-8 py-4 bg-gray-200 flex items-center justify-center mx-auto mt-5 flex-col gap-4">
            <span className="font-medium text-black">
              No data found for {JSON.parse(localStorage.getItem("user"))?.name}
            </span>
            <button
              className="bg-primary text-white py-2 px-4 rounded-full items-center gap-2 inline-flex"
              onClick={() => navigate("/")}
            >
              Start booking now
            </button>
          </div>
        )}
        {loading && (
          <div className="h-[400px] flex items-center justify-center">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsPage;
