// import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
// import axios from "axios";

import HorizontalScrollBar from "../components/HorizontalScrollBar";
import useFetch from "../hooks/useFetch";

const Home = () => {
  const trendingData = useSelector((state) => state.movieData.bannerData);
  const { data: nowPlayingData } = useFetch("/movie/now_playing");
  const { data: topRatedData } = useFetch("/movie/top_rated");
  const { data: popularTvShowData } = useFetch("/tv/popular");
  const { data: onTheAirShowData } = useFetch("/tv/on_the_air");
  return (
    <div>
      <BannerHome />
      <HorizontalScrollBar
        data={trendingData}
        heading={"Trending"}
        trending={true}
      />
      <HorizontalScrollBar
        data={nowPlayingData}
        heading={"Now Playing"}
        media_type={"movie"}
      />
      <HorizontalScrollBar
        data={topRatedData}
        heading={"Top Rated Movies"}
        media_type={"movie"}
      />
      <HorizontalScrollBar
        data={popularTvShowData}
        heading={"Popular TV Shows"}
        media_type={"tv"}
      />
      <HorizontalScrollBar
        data={onTheAirShowData}
        heading={"On The Air"}
        media_type={"tv"}
      />
    </div>
  );
};

export default Home;
