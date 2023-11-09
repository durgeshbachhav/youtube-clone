import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaMicrophone } from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BiVideoPlus } from "react-icons/bi";
import { AiFillYoutube, AiOutlineSearch } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import {
  changesearchTerm,
  clearSearch,
  clearVideos,
} from "../store/youtubeSlice";
import { getsearchPageVideos } from "../store/reducers/getSearchPageVideos";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((state) => state.youtube.searchTerm);

  const handleSearch = () => {
    if (location.pathname !== "/search") navigate("/search");
    else {
      dispatch(clearVideos);
      dispatch(getsearchPageVideos(false));
    }
  };
  return (
    <div className="flex justify-between items-center bg-black  opacity-95 sticky px-10 h-14">
      <div className="flex gap-8 items-center text-2xl ">
        <div>
          <GiHamburgerMenu size={25} />
        </div>
        <Link to={'/'} className="flex items-center gap-1 justify-center">
          <AiFillYoutube color="red" size={45} />
          <span className=" text-xl">Youtube</span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-5">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSearch();
          }}
        >
          <div className="flex gap5 items-center  bg-zinc-900 h-10 px-4 pr-2 rounded-3xl ">
            <div className="flex gap5 items-center pr-5">
              <input
                type="text"
                placeholder="search"
                value={searchTerm}
                onChange={(e) => dispatch(changesearchTerm(e.target.value))}
                className="w-96 bg-zinc-900 focus:outline-none border-none"
              />
            </div>
            <button className="rounded-r-3xl">
              <AiOutlineSearch className="h10 w-16 flex items-center " />
            </button>
          </div>
        </form>
        <div className="text-xl p-3 bg-zinc-900 rounded-full">
          <FaMicrophone />
        </div>
      </div>
      <div className="flex items-center text-xl gap-7 ">
        <BiVideoPlus />
        <div className="relative">
          <IoMdNotificationsOutline />
          <span className="absolute bottom-2 text-xs bg-red-800 rounded-full px-1 left-2">
            9+
          </span>
        </div>
        <img
          src="https://images.pexels.com/photos/693861/pexels-photo-693861.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
          alt="profile logo"
          className="rounded-full w-8 h-8"
        />
      </div>
    </div>
  );
};

export default Navbar;
