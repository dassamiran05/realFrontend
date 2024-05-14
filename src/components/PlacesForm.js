import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AccountsNav from "./AccountsNav";
import Image from "./lazyloadImage/Image";

const PlacesForm = () => {
  const { id } = useParams();
  // console.log(id);
  const [link, setLink] = useState("");
  const [photos, setPhotos] = useState([]);
  console.log(photos);
  const [perks, setPerks] = useState([]);
  const token = JSON.parse(localStorage.getItem("user"))?.token;
  const navigate = useNavigate();
  const initialvalues = {
    title: "",
    address: "",
    description: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxGuests: "",
    price: "",
  };

  const [formvalues, setFormvalues] = useState(initialvalues);

  useEffect(() => {
    if (!id) {
      return;
    }
    getPlacebyId();
  }, [id]);

  const getPlacebyId = async () => {
    const { data } = await axios.get("/api/v1/product/getplace/" + id);
    if (data?.success) {
      const { perks, photos, ...rest } = data.result;
      setPerks(perks);
      setPhotos(photos);
      setFormvalues(rest);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormvalues({ ...formvalues, [name]: value });
  };

  function preInput(header, description) {
    return (
      <>
        <h2 className="text-2xl mt-4">{header}</h2>
        <p className="text-gray-500 text-sm">{description}</p>
      </>
    );
  }

  const addphotobyLink = async (e) => {
    e.preventDefault();

    const { data } = await axios.post("/api/v1/product/upload-by-link", {
      link,
    });
    if (data.success) {
      setPhotos((prev) => {
        return [...prev, data.file];
      });
      setLink("");
    }
  };

  const handleuplaodFile = async (e) => {
    const inputFiles = e.target.files;
    const data = new FormData();

    Array.from(inputFiles).map((file, index) => data.append("photos", file));

    const {
      data: { files },
    } = await axios.post("api/v1/product/upload", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    // const {
    //   data: { files },
    // } = response;
    console.log(files);
    setPhotos((prev) => {
      return [...prev, ...files];
    });
  };

  const handleSelected = (e) => {
    const { checked, name } = e.target;
    if (checked) {
      setPerks((prev) => [...prev, name]);
    } else {
      setPerks((prev) => [...prev.filter((item) => item !== name)]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let payload = {
      ...formvalues,
      perks,
      photos,
    };

    // setFormvalues(payload);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    };
    if (id) {
      const { data } = await axios.put(
        `/api/v1/product/updateplace/` + id,
        payload,
        config
      );

      if (data?.success) {
        setFormvalues(initialvalues);
        setPerks([]);
        setPhotos([]);
        setTimeout(() => {
          navigate("/account/places");
        }, 500);
      }
    } else {
      const { data } = await axios.post(
        `/api/v1/product/createplace`,
        payload,
        config
      );
      if (data?.success) {
        setFormvalues(initialvalues);
        setPerks([]);
        setPhotos([]);
        setTimeout(() => {
          navigate("/account/places");
        }, 500);
      }
    }
  };

  const handleDelete = (e, filename) => {
    e.preventDefault();
    let confirm = window.confirm("Are you sure , want to delete this?");
    if (confirm) {
      setPhotos(photos.filter((item) => item?.name !== filename));
    }
  };

  const selectasMainphoto = (e, fileObject) => {
    e.preventDefault();
    let restPhotos = photos.filter((photo) => photo?.name !== fileObject?.name);
    let newAddphotos = [fileObject, ...restPhotos];
    setPhotos(newAddphotos);
    // console.log(filename);
  };
  return (
    <>
      <AccountsNav />
      <form className="px-3 w-[85%] mx-auto" onSubmit={handleSubmit}>
        {preInput(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          className="mt-2"
          name="title"
          value={formvalues.title}
          onChange={handleChange}
          placeholder="title, for example: My lovely apt"
        />
        {preInput("Address", "Address to this place")}
        <input
          type="text"
          className="mt-2"
          name="address"
          value={formvalues.address}
          onChange={handleChange}
          placeholder="address"
        />
        {preInput("Photos", "more = better")}
        <div className="mt-2 flex gap-2 items-center">
          <input
            type="text"
            placeholder="Add photo using link..."
            onChange={(e) => setLink(e.target.value)}
            value={link}
          />

          <button
            className="bg-gray-200 px-4 py-2 font-bold rounded-xl"
            onClick={addphotobyLink}
          >
            Add&nbsp;photo
          </button>
        </div>
        <div className="mt-2 gap-2 grid grid-cols-4 lg:grid-cols-6">
          {photos.length > 0 &&
            photos.map((item, indx) => {
              const { url, name } = item;
              return (
                <div className="h-32 relative" key={indx}>
                  <Image
                    src={url}
                    className="rounded-2xl w-full h-full object-cover"
                    alt={name}
                  />
                  <button
                    className="absolute bottom-2 right-2 text-white bg-black bg-opacity-50 p-2 rounded-2xl cursor-pointer"
                    onClick={(e) => handleDelete(e, name)}
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
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </button>
                  <button
                    className="absolute bottom-2 left-2 text-white bg-black bg-opacity-50 p-2 rounded-2xl cursor-pointer"
                    onClick={(e) => selectasMainphoto(e, item)}
                  >
                    {name === photos[0].name && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    {name !== photos[0]?.name && (
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
                          d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              );
            })}
          <label className="h-32 border bg-transparent rounded-2xl p-8 text-2xl text-gray-600 items-center flex justify-center gap-1 cursor-pointer">
            <input
              type="file"
              className="hidden"
              onChange={handleuplaodFile}
              multiple
            />
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
                d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
              />
            </svg>
            Upload
          </label>
        </div>
        {/* <PhotosUploader 
        addedPhotos={addedPhotos} onChange={setAddedPhotos} /> */}
        {preInput("Description", "description of the place")}
        <textarea
          className="mt-2"
          name="description"
          value={formvalues.description}
          onChange={handleChange}
        />

        {preInput("Perks", "select all the perks of your place")}
        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          <label className="border p-4 flex items-center gap-2 rounded-2xl cursor-pointer">
            <input
              type="checkbox"
              name="wifi"
              onChange={handleSelected}
              checked={perks.includes("wifi")}
            />
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
                d="M8.288 15.038a5.25 5.25 0 0 1 7.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 0 1 1.06 0Z"
              />
            </svg>

            <span>Wifi</span>
          </label>
          <label className="border p-4 flex items-center gap-2 rounded-2xl cursor-pointer">
            <input
              type="checkbox"
              name="perking"
              onChange={handleSelected}
              checked={perks.includes("perking")}
            />
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
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            <span>Free parking spot</span>
          </label>
          <label className="border p-4 flex items-center gap-2 rounded-2xl cursor-pointer">
            <input
              type="checkbox"
              name="radio"
              onChange={handleSelected}
              checked={perks.includes("radio")}
            />
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
                d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
              />
            </svg>

            <span>Radio</span>
          </label>

          <label className="border p-4 flex items-center gap-2 rounded-2xl cursor-pointer">
            <input
              type="checkbox"
              name="tv"
              onChange={handleSelected}
              checked={perks.includes("tv")}
            />
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
                d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z"
              />
            </svg>

            <span>TV</span>
          </label>
          <label className="border p-4 flex items-center gap-2 rounded-2xl cursor-pointer">
            <input
              type="checkbox"
              name="pets"
              onChange={handleSelected}
              checked={perks.includes("pets")}
            />
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
                d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
              />
            </svg>

            <span>Pets</span>
          </label>
          <label className="border p-4 flex items-center gap-2 rounded-2xl cursor-pointer">
            <input
              type="checkbox"
              name="entrace"
              onChange={handleSelected}
              checked={perks.includes("entrace")}
            />
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
                d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
              />
            </svg>

            <span>Private Entrance</span>
          </label>
        </div>

        {preInput("Extra Info", "House rules etc")}
        <textarea
          className="mt-2"
          name="extraInfo"
          value={formvalues.extraInfo}
          onChange={handleChange}
        />
        {preInput(
          "Check in&out times",
          "add check in and out times, remember to have some time window for cleaning the room between guests"
        )}
        <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
          <div>
            <h3 className="mt-2 -mb-1">Check in time</h3>
            <input
              type="text"
              className="mt-2"
              name="checkIn"
              value={formvalues.checkIn}
              onChange={handleChange}
              placeholder="14"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Check out time</h3>
            <input
              type="text"
              className="mt-2"
              name="checkOut"
              value={formvalues.checkOut}
              onChange={handleChange}
              placeholder="11"
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Max number of guests</h3>
            <input
              type="number"
              className="mt-2"
              name="maxGuests"
              value={formvalues.maxGuests}
              onChange={handleChange}
            />
          </div>
          <div>
            <h3 className="mt-2 -mb-1">Price per night</h3>
            <input
              type="number"
              className="mt-2"
              name="price"
              value={formvalues.price}
              onChange={handleChange}
            />
          </div>
        </div>
        <button className="w-full bg-primary my-4 px-4 py-2 text-white rounded-2xl font-bold">
          Save
        </button>
      </form>
    </>
  );
};

export default PlacesForm;
