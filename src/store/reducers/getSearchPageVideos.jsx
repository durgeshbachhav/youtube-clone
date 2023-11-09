import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parseData from "../../utils/parseData";

const API_KEY = import.meta.env.VITE_APP_YOUTUBE_API_KEY;


console.log('apikey', API_KEY);

export const getsearchPageVideos = createAsyncThunk('youtube/app/searchpagevideos', async (isNext, { getState }) => {
     const { youtube: { nextPageToken: nextPageTokenFromState, videos ,searchTerm }, } = getState();
     const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?maxResults=20&q=${searchTerm}&key=${API_KEY}&part=snippet&type=video&${
            isNext ? `pageToken=${nextPageTokenFromState}` : ""
          }`);

     console.log('response', response.data.items);
     const items = response.data.items;
     console.log('items ', items);
     const parsedData = await parseData(items);
     console.log('parsedata => ', parsedData);
     return { parsedData: [...videos, ...parsedData], nextPageToken: nextPageTokenFromState }


})