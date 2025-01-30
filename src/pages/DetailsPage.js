/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetails";
import useFetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import HorizontalScrollBar from "../components/HorizontalScrollBar";
import VideoPlay from "../components/VideoPlay";

const DetailsPage = () => {
  const params = useParams();
  const imageURL = useSelector((state) => state.movieData.imageURL);
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
  const { data: castData } = useFetchDetails(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = useFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const { data: recommendationsData } = useFetch(
    `/${params?.explore}/${params?.id}/recommendations`
  );
  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  console.log("data", data);
  console.log("star cast", castData);

  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };

  // Safely calculate the duration
  const duration = data?.runtime
    ? (Number(data.runtime) / 60).toFixed(1).split(".")
    : ["0", "0"];

  const writer = castData?.crew
    .filter((el) => el?.job === "Writer")
    .map((el) => el?.name)
    .join(", ");

  // console.log("Writer", writer);

  // Display a loading state until `data` is available
  if (!data) {
    return (
      <div className="text-center text-white py-10 pb-6">
        Loading details...
      </div>
    );
  }

  return (
    <div>
      <div className="w-full h-[280px] relative hidden lg:block">
        <div className="h-full w-full">
          {data.backdrop_path ? (
            <img
              src={imageURL + data.backdrop_path}
              className="h-full object-cover w-full"
            />
          ) : (
            <div className="h-full w-full bg-neutral-800"></div>
          )}
        </div>
        <div className="absolute w-full h-full top-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
      </div>
      <div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-4 lg:gap-10">
        <div className="relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
          <img
            src={imageURL + data.poster_path}
            className="h-80 w-60 object-cover rounded"
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-blue-500 to-green-300 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>
        <div>
          <h2 className="text-2xl lg:text-4xl font-bold text-white mt-2">
            {data.title || data.name || "Title Not Available"}
          </h2>
          <p className="text-neutral-400">{data.tagline || "No Tagline"}</p>
          <Divider />
          <div className="flex items-center gap-2">
            <p>Rating: {Number(data.vote_average || 0).toFixed(1)}</p>
            <span> | </span>
            <p>Views: {Number(data.vote_count || 0)}</p>
            <p>
              Duration: {duration[0]}h {duration[1]}m
            </p>
          </div>
          <Divider />
          <div>
            <h3 className="text-xl font-bold text-white mb-1">Overview: </h3>
            <p>{data?.overview}</p>
            <Divider />
            <div className="flex items-center gap-3 my-3 text-center">
              <p>Status: {data?.status}</p>
              <span> | </span>
              <p>
                Release Date:{" "}
                {moment(data?.release_date).format("MMMM Do YYYY")}
              </p>
              <span> | </span>
              <p>Revenue: {Number(data?.revenue)}</p>
            </div>
            <Divider />
          </div>
          <div>
            <p>
              <span className="text-white">Director: </span>{" "}
              {castData?.crew[0]?.name}
            </p>
            <Divider />
            <p>
              <span className="text-white">Writer: {writer}</span>
            </p>
          </div>
          <Divider />
          <h2 className="font-bold text-lg"> Cast: </h2>
          <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-3">
            {castData?.cast.map((starcast, index) => {
              return (
                <div key={starcast.id || index}>
                  <div>
                    <img
                      src={imageURL + starcast?.profile_path}
                      className="w-24- h-24 rounded-full object-cover "
                    />
                  </div>
                  <p className="font-bold text-start text-sm text-neutral-400 my-2">
                    {starcast?.name}
                  </p>
                </div>
              );
            })}
            <div className="container mx-auto px-3">
              {/* <h2 className="text-lg lg:text-2xl font-bold my-3 mb-3">
                Star Cast: {}
              </h2> */}
            </div>
          </div>
        </div>
      </div>
      <div>
        <HorizontalScrollBar
          data={similarData}
          heading={"Similar " + params?.explore}
          media_type={params?.explore}
        />
        <HorizontalScrollBar
          data={recommendationsData}
          heading={"Recommended " + params?.explore}
          media_type={params?.explore}
        />
      </div>
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
};

export default DetailsPage;
