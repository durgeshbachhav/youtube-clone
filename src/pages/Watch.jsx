import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getvideoDetails } from "../store/reducers/getvideoDetails";
import { getRecommendedVideos } from "../store/reducers/getRecommendedVideos";
import Navbar from "../components/Navbar";
import { BiSolidLike } from "react-icons/bi";
import { FaShare } from "react-icons/fa";

const Watch = () => {
  const { id } = useParams();
  console.log("id =>", id);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector(
    (state) => state.youtube.currentPlaying
  );


  const recommendVideos = useAppSelector(
    (state) => state.youtube.recommendedVideo
  );
  console.log("recommendVideos", recommendVideos);

  useEffect(() => {
    if (id) {
      dispatch(getvideoDetails(id));
    } else {
      navigate("/");
    }
  }, [id, navigate, dispatch]);



  return (
    <div
      style={{ width: "100%" }}
      className="flex items-start justify-start watch-bg mx-auto"
    >
      <div className="fixed w-full">
        <Navbar />
      </div>
      <div style={{ width: "70%" }} className="mt-14 mx-auto">
        {currentPlaying && currentPlaying?.videoId === id && (
          <div className="max-h-screen overflow-auto">
            <div className="w-full px-10 py-4  ">
              {/* main container */}
              <div className="">
                <iframe
                  className="rounded-md w-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  width="" //390
                  height="450" //640
                  allowFullScreen
                  title="Youtube Player"
                ></iframe>
                <h2 className="text-2xl my-2">{currentPlaying.videoTitle}</h2>
              </div>
              {/* chanel data section */}
              <div className="w-full flex justify-between ">
                <div className="flex gap-5 items-center justify-start">
                  <div className="rounded-full w-14 h-14">
                    <img
                      src={currentPlaying.channelInfo.image}
                      className="rounded-full w-14 h-14"
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="font-bold">
                      {currentPlaying.channelInfo.name}
                    </div>
                    <div className="text-sm text-gray-400">
                      {currentPlaying.channelInfo.subscribers}
                    </div>
                  </div>
                  <button className="bg-red-600 px-2 py-1 rounded-lg">
                    Subscribe
                  </button>
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="flex items-center justify-center gap-2 bg-gray-600 rounded-full px-4 py-1">
                    <BiSolidLike />
                    <div>{currentPlaying.videoLikes} likes</div>
                  </div>
                  <div className="flex items-center justify-center gap-2 bg-gray-600 rounded-full px-4 py-1">
                    <FaShare />
                    <div>Share</div>
                  </div>
                </div>
              </div>
              {/* description section */}
              <div className="w-full flex flex-col mt-4 bg-gray-600 p-4 rounded-md">
                <div className="flex gap-6">
                  <div>{currentPlaying.videoViews} views</div>
                  <div className="text-gray-300">
                    {currentPlaying.videoAge} ago
                  </div>
                </div>
                {/* description */}
                <div className="mt-10 font-light">
                  {currentPlaying.videoDescription}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Watch;
