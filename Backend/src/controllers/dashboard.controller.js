import mongoose from "mongoose";
import { Video } from "../Models/video.model.js";
import { Subscription } from "../Models/subscription.model.js";
import { Like } from "../Models/like.model.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const getChannelStats = AsyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
});

const getChannelVideos = AsyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
});

export { getChannelStats, getChannelVideos };
