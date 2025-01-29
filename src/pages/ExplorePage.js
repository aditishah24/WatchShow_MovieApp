import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
  const params = useParams();
  const [pageNo, setPageNo] = useState(1);
  const [data, setData] = useState([]);
  const [totalPgNo, setTotalPgNo] = useState(0);
  console.log("params", params.explore);

  const fetchdata = async () => {
    try {
      const response = await axios.get(`/discover/${params.explore}`, {
        params: {
          page: pageNo,
        },
      });
      setData((prev) => {
        return [...prev, ...response.data.results];
      });
      setTotalPgNo(response.data.total_pages);
      // console.log("response");
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPageNo((prev) => prev + 1);
    }
  };
  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNo]);

  useEffect(() => {
    setPageNo(1);
    setData([]);
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.explore]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="py-16">
      <div className="container mx-auto">
        <h3 className="capitalize text-lg lg:text-xl font-semibold my-3 ml-2">
          <div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 ml-2 justify-center lg:justify-start">
            {data.map((exploreData) => {
              return (
                <Card
                  data={exploreData}
                  key={exploreData.id + "exploreSection"}
                  media_type={params.explore}
                />
              );
            })}
          </div>
          Popular {params.explore} Show
        </h3>
      </div>
    </div>
  );
};

export default ExplorePage;
