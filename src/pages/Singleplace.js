import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Image from "../components/lazyloadImage/Image";
import { CircularProgress } from "@mui/material";

const Singleplace = () => {
  const { id } = useParams();
  const [showallphotos, setShowallphotos] = useState(false);
  const userlog = JSON.parse(localStorage.getItem("user"));

  const [singleplace, setSingleplace] = useState({});
  const initialvalues = { checkIn: "", checkOut: "", max0fGuets: 1 };
  const [formValues, setFormValues] = useState(initialvalues);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState(null);
  const [redirect, setRedirect] = useState("");
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [fronterror, setFronterror] = useState("");

  const [frontsuccess, setFrontsuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    async function getSinglePlace() {
      const { data } = await axios.get("/api/v1/product/singleplace/" + id);
      if (data.success) {
        setSingleplace(data?.place);
        setLoading(false);
      }
    }
    getSinglePlace();
  }, [id]);

  useEffect(() => {
    if (user) {
      setName(user?.name);
    }
  }, [user]);

  let numberofnights = 0;
  if (formValues?.checkIn && formValues?.checkOut) {
    const diffTime = Math.abs(
      new Date(formValues?.checkOut) - new Date(formValues?.checkIn)
    );
    numberofnights = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  }

  const handleBooking = async () => {
    try {
      const bookingData = {
        ...formValues,
        place: singleplace?._id,
        price: numberofnights * singleplace?.price,
        name,
        phone,
      };

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: userlog?.token,
        },
      };

      if (userlog?.isLoggedin) {
        const { data } = await axios.post(
          "/api/v1/product/booking",
          bookingData,
          config
        );
        const bookingId = data?.bookingDetails?._id;

        if (bookingId) {
          setFrontsuccess(data?.message);
          setTimeout(() => {
            setRedirect("/account/bookings/" + bookingId);
            setFrontsuccess("");
          }, 1000);
        }
      } else {
        navigate("/login");
      }
    } catch (error) {
      const {
        response: { data },
      } = error;
      setFronterror(data?.message);
      setTimeout(() => {
        setFronterror("");
      }, 1000);
    }
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  if (showallphotos) {
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen z-50">
        <div className="p-8 grid gap-4 justify-center bg-black">
          <div>
            <h2 className="text-3xl mr-48 md:mr-0">
              Photos of {singleplace?.title}
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
          {singleplace?.photos?.length > 0 &&
            singleplace?.photos?.map((photo) => (
              <div>
                <Image
                  src={photo?.url}
                  alt={singleplace?.title}
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

  const getClass = (classes) => {
    let initialClass =
      "p-4 text-md  rounded-lg  dark:bg-gray-800  text-center font-semibold mt-[76px] fixed w-full top-0 left-0 z-20 ";
    initialClass += classes;
    return initialClass;
  };
  return (
    <>
      {!loading && (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8 relative">
          {frontsuccess && (
            <div
              className={getClass(
                "text-green-800 bg-green-50  dark:text-green-400 "
              )}
              role="alert"
            >
              {frontsuccess}
            </div>
          )}
          {fronterror && (
            <div
              className={getClass("text-red-800 bg-red-100  dark:text-red-400")}
              role="alert"
            >
              {fronterror}
            </div>
          )}
          <h1 className="text-3xl">{singleplace?.title}</h1>
          <div className="flex items-center gap-3 justify-between ">
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
                href={"https://maps.google.com/?q=" + singleplace.address}
              >
                {singleplace?.address}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.47 2.47a.75.75 0 0 1 1.06 0l4.5 4.5a.75.75 0 0 1-1.06 1.06l-3.22-3.22V16.5a.75.75 0 0 1-1.5 0V4.81L8.03 8.03a.75.75 0 0 1-1.06-1.06l4.5-4.5ZM3 15.75a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                    clipRule="evenodd"
                  />
                </svg>
                Share
              </div>
              <div className="flex items-center gap-2 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
                Save
              </div>
            </div>
          </div>
          <div className="relative">
            <div className=" grid grid-cols-[2fr_1fr] gap-2 rounded-3xl overflow-hidden">
              <div>
                {/* className="w-full h-[600px]" */}
                {singleplace?.photos?.[0] && (
                  <Image
                    src={singleplace?.photos?.[0]?.url}
                    alt={singleplace?.title}
                    className="h-full w-full aspect-square object-cover cursor-pointer"
                    click={handleShowClick}
                  />
                )}
              </div>
              <div className="grid grid-cols-1 gap-2">
                {singleplace?.photos?.[1] && (
                  <Image
                    src={singleplace?.photos?.[1]?.url}
                    alt={singleplace?.title}
                    className="h-full w-full aspect-square object-cover cursor-pointer"
                    click={handleShowClick}
                  />
                )}
                {singleplace?.photos?.[2] && (
                  <Image
                    src={singleplace?.photos?.[2]?.url}
                    alt={singleplace?.title}
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

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] lg:grid-cols-[2fr_1fr] mt-8 gap-8 mb-5">
            <div>
              <div className="my-4">
                <h2 className="font-semibold text-3xl">Description</h2>
                {singleplace?.description}
              </div>
              Check-in: {singleplace?.checkIn}
              <br />
              Check-out: {singleplace?.checkOut}
              <br />
              Max number of guest: {singleplace?.maxGuests}
            </div>
            <div className="mt-3 md:mt-0">
              <div className="bg-white shadow p-4 rounded-2xl">
                <div className="text-2xl text-center">
                  Price: ${singleplace?.price} / per night
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
                    <span> ${numberofnights * singleplace?.price}</span>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 mt-4 rounded-2xl">
            <div className="mt-4">
              <h2 className="font-semibold text-3xl">Extra Info</h2>
            </div>
            <div className="mt-2 mb-4 text-sm text-gray-700 leading-5">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </div>
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

export default Singleplace;
