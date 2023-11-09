import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";

const Home = () => {
  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtube.videos);
  console.log("videos", videos);

  useEffect(() => {
    dispatch(getHomePageVideos(false));
    // console.log("videos => ", videos);
  }, [dispatch]);

  return (
    <div style={{height:"88%"}} className=" w-full mt-5 watch-bg">
      <div className="fixed top-0 w-full" style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex w-full" style={{ height: "92.5vh" , marginTop:'7.5vh' }}>
        <Sidebar />
        <div className="w-10/12 px-4 py-4 ">
        {videos.length > 1 ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getHomePageVideos(true))}
            hasMore={videos.length < 100}
            
            height={600}
          >
            <div className="grid gap-y-2 gap-x-2 grid-cols-4">
              {videos.map((item) => {
                return <Card data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
