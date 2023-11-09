

import { createSlice } from "@reduxjs/toolkit";
import { getHomePageVideos } from "./reducers/getHomePageVideos";
import { getsearchPageVideos } from "./reducers/getSearchPageVideos";
import { getvideoDetails } from "./reducers/getvideoDetails";
import { getRecommendedVideos } from "./reducers/getRecommendedVideos";

const initialState = {
     videos: [],
     currentPlaying: null,
     searchTerm: "",
     searchResults: [],
     nextPageToken: null,
     recommendedVideo: [],
}


export const youtubeSlice = createSlice({
     name: "youtube",
     initialState,
     reducers: {
          clearVideos: (state) => {
               state.videos = [],
                    state.nextPageToken = null;
          },
          changesearchTerm: (state, action) => {
               state.searchTerm = action.payload;
          },
          clearSearch: (state) => {
               state.searchTerm = ""
          }
     },
     extraReducers: (builder) => {
          builder.addCase(getHomePageVideos.fulfilled, (state, action) => {
               if (action.payload && action.payload.parsedData) {
                    state.videos = action.payload.parsedData;
                    state.nextPageToken = action.payload.nextPageToken;
               }
          }),
               builder.addCase(getsearchPageVideos.fulfilled, (state, action) => {
                    if (action.payload && action.payload.parsedData) {
                         state.videos = action.payload.parsedData;
                         state.nextPageToken = action.payload.nextPageToken;
                    }
               }),
               builder.addCase(getRecommendedVideos.fulfilled, (state, action) => {
                    if (action.payload && action.payload.parsedData) {
                         state.recommendedVideo = action.payload.parsedData;
                    }
               }),
               builder.addCase(getvideoDetails.fulfilled, (state, action) => {
                    state.currentPlaying = action.payload;
               })
     }
})



export const { clearVideos, changesearchTerm, clearSearch } = youtubeSlice.actions
export default youtubeSlice.reducer;