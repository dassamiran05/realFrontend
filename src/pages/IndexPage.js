import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Skeleton from "@mui/material/Skeleton";
import Image from "../components/lazyloadImage/Image";

const IndexPage = () => {
  const [placesData, setPlacesdata] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getAllplaces();
  }, []);

  async function getAllplaces() {
    const { data } = await axios.get("/api/v1/product/indexplaces");

    if (data.success) {
      setPlacesdata(data.places);
      setLoading(false);
    }
  }
  return (
    <>
      {!loading && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {placesData?.length > 0 &&
            placesData.map((place, index) => (
              <Link to={`/singleplace/${place?._id}`} key={index}>
                <div className="bg-gray-300 rounded-2xl flex mb-2 aspect-square">
                  {place.photos?.[0] && (
                    <Image
                      src={place.photos?.[0]?.url}
                      className="rounded-2xl object-cover aspect-square"
                      alt={place?.title}
                    />
                  )}
                </div>
                <h3 className="font-bold">{place?.address}</h3>
                <h2 className="text-sm text-gray-500">{place?.title}</h2>

                {place?.price && (
                  <div className="mt-1">
                    <span className="font-bold text-lg">${place?.price}</span>{" "}
                    per night
                  </div>
                )}
              </Link>
            ))}
        </div>
      )}

      {loading && (
        <div className="min-h-[500px] mt-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, indx) => (
            <>
              <div className="grid grid-cols-1 gap-x-6 gap-y-1" key={indx}>
                <div className="bg-gray-300 rounded-2xl flex mb-2 overflow-hidden aspect-square">
                  <Skeleton variant="rectangular" width={"100%"} height={260} />
                </div>
                <Skeleton
                  variant="rectangular"
                  className="rounded-2xl"
                  width={80}
                  height={20}
                />
                <Skeleton
                  variant="rectangular"
                  className="rounded-2xl"
                  width={180}
                  height={20}
                />
              </div>
            </>
          ))}
        </div>
      )}
    </>
  );
};

export default IndexPage;
