import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import parseRecommendedData from '../../utils/parseRecommandedData';

const API_KEY = import.meta.env.VITE_REACT_APP_YOUTUBE_DATA_API_KEY;

export const getRecommendedVideos = createAsyncThunk(
  "youtube/App/getRecommendedVideos",
  async (videoId, { getState }) => {
    const {
      youtubeApp: {
        currentPlaying: {
          channelInfo: { id: channelId }
        }
      }
    } = getState();

    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet&maxResults=20&relatedToVideoId=${videoId}&type=video`
    );

    console.log('response', response);

    const items = response.data.items;
    const parsedData = await parseRecommendedData(items, videoId);

    return { parsedData };
  }
);
