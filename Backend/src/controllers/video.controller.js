import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../Models/video.model.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video

  if (!(title && description)) {
    throw new ApiError(401, "title and description required");
  }

  let videoFileLocalPath, thumbnailLocalPath;

  if (
    req.files &&
    Array.isArray(req.files.videoFile) &&
    req.files.videoFile.length > 0
  ) {
    videoFileLocalPath = req.files.videoFile[0].path;
  } else {
    throw new ApiError(400, "videoFile required");
  }

  if (
    req.files &&
    Array.isArray(req.files.thumbnail) &&
    req.files.thumbnail.length > 0
  ) {
    thumbnailLocalPath = req.files.thumbnail[0].path;
  } else {
    throw new ApiError(400, "thumbnail required");
  }

  // we are getting video in temp storage area

  const video = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!video) {
    throw new ApiError(400, "video required");
  }

  if (!thumbnail) {
    throw new ApiError(400, "thumbnail required");
  }

  const wholeVideo = await Video.create({
    videoFile: video.url,
    thumbnail: thumbnail.url,
    title,
    discription: description,
    duration: video.duration,
    owner: req.user._id,
  });

  const createdVideo = await Video.findById(wholeVideo._id);

  if (!createdVideo) {
    throw new ApiError(500, "Something went wrong while uploading the video");
  }

  console.log(createdVideo);

  return res
    .status(201)
    .json(new ApiResponse(200, createdVideo, "video uploaded Successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: get video by id
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
