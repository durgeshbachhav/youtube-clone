import axios from "axios";
import React from "react";
const API_KEY = import.meta.env.VITE_APP_YOUTUBE_API_KEY;
import { convertRawtoString } from "./convertRawToString";
import { parseVideoDuration } from "./parseVideoDuration";
import { TimeSince } from "./TimeSince";

const parseRecommandedData = async (items) => {
  try {
    const videoIds = [];
    const channelIds = [];

    items.forEach((item) => {
      channelIds.push(item.snippet.channelId);
      videoIds.push(item.id.videoId);
    });

    const {
      data: { items: channelsData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/channels?part=snippet,contentDetails&id=${channelIds.join(
        ","
      )}&key=${API_KEY}`
    );
    const parseChannelData = [];
    channelsData.forEach((channal) =>
      parseChannelData.push({
        id: channal.id,
        image: channal.snippet.thumbnails.default.url,
      })
    );

    const {
      data: { items: videosData },
    } = await axios.get(
      `https://youtube.googleapis.com/youtube/v3/videos?part=contentDetails,statistics&id=${videoIds.join(
        ","
      )}&key=${API_KEY}`
    );

    const parseData = [];
    items.forEach((item, index) => {
      const { image: channelImage } = parseChannelData.find(
        (data) => data.id === item.snippet.channelId
      );
      if (channelImage) {
        parseData.push({
          videoId: item.id.videoId,
          videoTitle: item.snippet.title,
          videoDescription: item.snippet.description,
          videoThumbnail: item.snippet.thumbnails.medium.url,
          videoLink: `https://www.youtube.com/watch?v=${item.id.videoId}`,
          videoDuration: parseVideoDuration(
            videosData[index].contentDetails.duration
          ),
          videoViews: convertRawtoString(
            videosData[index].statistics.viewCount
          ),
          videoAge: TimeSince(new Date(item.snippet.publishedAt)),
          channelInfo: {
            id: item.snippet.channelId,
            image: channelImage,
            name: item.snippet.channelTitle,
          },
        });
      }
    });
    return parseData;
  } catch (error) {
    console.log("error", error);
  }
};

export default parseRecommandedData;
