import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { getHomePageVideos } from "../store/reducers/getHomePageVideos";
import Spinner from "../components/Spinner";
import InfiniteScroll from "react-infinite-scroll-component";
import Card from "../components/Card";
import { useNavigate } from "react-router-dom";
import { clearVideos } from "../store/youtubeSlice";
import { getsearchPageVideos } from "../store/reducers/getSearchPageVideos";
import SearchCard from "../components/SearchCard";

const Search = () => {

     const navigate = useNavigate();
     const searchTerm = useAppSelector(state => state.youtube.searchTerm)

  const dispatch = useAppDispatch();
  const videos = useAppSelector((state) => state.youtube.videos);
  console.log("videos", videos);

  useEffect(() => {
    dispatch(clearVideos());
    if(searchTerm === ''){
     navigate('/')

    }
    else{
     dispatch(getsearchPageVideos(false))
    }
    // console.log("videos => ", videos);
  }, [dispatch , navigate, searchTerm]);

  return (
    <div  style={{height:"88%"}} className=" w-full mt-5 watch-bg">
      <div  className="fixed top-0 w-full" style={{ height: "7.5vh" }}>
        <Navbar />
      </div>
      <div className="flex w-full" style={{ height: "92.5vh" , marginTop:'7.5vh' }}>
        <Sidebar />
        {videos.length ? (
          <InfiniteScroll
            dataLength={videos.length}
            next={() => dispatch(getsearchPageVideos(true))}
            hasMore={videos.length < 500}
            height={650}
          >
            <div className="grid gap-y-2 gap-x-8 grid-cols-1 p-8">
              {videos.map((item) => {
                return <SearchCard data={item} key={item.videoId} />;
              })}
            </div>
          </InfiniteScroll>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Search;
