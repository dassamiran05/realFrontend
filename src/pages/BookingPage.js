import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Image from "../components/lazyloadImage/Image";
import { CircularProgress } from "@mui/material";

const BookingPage = () => {
  const { id } = useParams();
  const [singlebooking, setSinglebooking] = useState({});
  const [showallphotos, setShowallphotos] = useState(false);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    async function getSingleBooking() {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      };
      const { data } = await axios.get("/api/v1/product/booking/" + id, config);
      if (data.success) {
        setSinglebooking(data?.booking);
        setLoading(false);
      }
    }
    getSingleBooking();
  }, [id, token]);

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

  if (showallphotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen z-50">
        <div className="p-8 grid gap-4 justify-center bg-black">
          <div>
            <h2 className="text-3xl mr-48 md:mr-0">
              Photos of {singlebooking?.place?.title}
            </h2>
            <button
              className="fixed right-12 top-8 flex gap-1 items-center rounded-2xl shadow shadow-black bg-white px-4 py-2 text-black z-20"
              onClick={() => setShowallphotos(false)}
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
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
              Close photo
            </button>
          </div>
          {singlebooking?.place?.photos?.length > 0 &&
            singlebooking?.place?.photos?.map((photo) => (
              <div>
                <Image
                  src={photo?.url}
                  alt={singlebooking?.place?.title}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    );
  }

  const handleShowClick = () => {
    setShowallphotos(true);
  };
  return (
    <>
      {!loading && (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
          <h1 className="text-3xl">{singlebooking?.place?.title}</h1>
          <div className="flex items-center gap-2 text-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                clipRule="evenodd"
              />
            </svg>
            <a
              target="_blank"
              rel="noreferrer"
              className="block font-semibold underline my-2"
              href={
                "https://maps.google.com/?q=" + singlebooking?.place?.address
              }
            >
              {singlebooking?.place?.address}
            </a>
          </div>
          <div className="bg-gray-200 p-4 rounded-2xl mb-4 mt-2">
            <h2 className="text-2xl">Your booking information</h2>
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
                {getTimebyFormat(singlebooking?.checkIn)}
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
                {getTimebyFormat(singlebooking?.checkOut)}
              </div>
              {/* {getTimebyFormat(booking?.checkIn) +
                    " => " +
                    getTimebyFormat(booking?.checkOut)} */}
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
                {getNights(singlebooking?.checkIn, singlebooking?.checkOut)}{" "}
                nights &nbsp;
              </div>
              | Total Price: ${singlebooking?.price}
            </div>
          </div>
          <div className="relative">
            <div className=" grid grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden">
              <div>
                {/* className="w-full h-[600px]" */}
                {singlebooking?.place?.photos?.[0] && (
                  <Image
                    src={singlebooking?.place?.photos?.[0]?.url}
                    alt={singlebooking?.place?.title}
                    className="h-full w-full aspect-square object-cover cursor-pointer"
                    click={handleShowClick}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {singlebooking?.place?.photos?.[1] && (
                  <Image
                    src={singlebooking?.place?.photos?.[1]?.url}
                    alt={singlebooking?.place?.title}
                    className="h-full w-full aspect-square object-cover cursor-pointer"
                    click={handleShowClick}
                  />
                )}
                {singlebooking?.place?.photos?.[2] && (
                  <Image
                    src={singlebooking?.place?.photos?.[2]?.url}
                    alt={singlebooking?.place?.title}
                    className="h-full w-full aspect-square object-cover cursor-pointer"
                    click={handleShowClick}
                  />
                )}
              </div>
            </div>
            <button
              className="px-4 py-2 rounded-2xl absolute bottom-2 right-2 bg-white shadow-md flex items-center gap-2"
              onClick={() => setShowallphotos(true)}
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
                  d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              Show more photos
            </button>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr] mt-8 gap-8">
        <div>
          <div className="my-4">
            <h2 className="font-semibold text-3xl">Description</h2>
            {singlebooking?.place?.description}
          </div>
          Check-in: {singlebooking?.place?.checkIn}
          <br />
          Check-out: {singlebooking?.place?.checkOut}
          <br />
          Max number of guest: {singlebooking?.place?.maxGuests}
        </div>
        <div className="mt-3 md:mt-0">
          <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
              Price: ${singlebooking?.place?.price} / per night
            </div>
            <div className="border rounded-2xl mt-4">
              <div className="grid grid-cols-2 items-center">
                <div className="px-4 py-4 border-r">
                  <label>Check In:</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={formValues.checkIn}
                    onChange={handleChangeInput}
                    className="checkinputs"
                  />
                </div>
                <div className="px-4 py-4">
                  <label>Check Out:</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={formValues.checkOut}
                    onChange={handleChangeInput}
                    className="checkinputs"
                  />
                </div>
              </div>
              <div className="px-4 py-4 border-t">
                <label>Number of Guests:</label>
                <input
                  type="number"
                  name="max0fGuets"
                  value={formValues.max0fGuets}
                  onChange={handleChangeInput}
                />
              </div>
              {numberofnights > 0 && (
                <div className="px-4 py-4 border-t">
                  <label>Your full name:</label>
                  <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label>Phone number:</label>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              )}
            </div>

            <button
              className="bg-primary px-4 py-2 rounded-xl text-2xl text-white w-full mt-4"
              onClick={handleBooking}
            >
              Book now
              {numberofnights > 0 && (
                <span> ${numberofnights * singlebooking?.place?.price}</span>
              )}
            </button>
          </div>
        </div>
      </div> */}

          {/* <div className="bg-white p-4 mt-4 rounded-2xl">
        <div className="mt-4">
          <h2 className="font-semibold text-3xl">Extra Info</h2>
        </div>
        <div className="mt-2 mb-4 text-sm text-gray-700 leading-5">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. It was popularised in the 1960s with
          the release of Letraset sheets containing Lorem Ipsum passages, and
          more recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum.
        </div>
      </div> */}
        </div>
      )}
      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default BookingPage;
