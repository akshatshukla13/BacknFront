import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../Models/video.model.js";
import { User } from "../Models/user.model.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  try {
    const allVideos = await Video.find({}).populate('owner', 'userName email fullName avatar');

    if (!allVideos) {
      throw new ApiError(401, "Videos not fetched properly");
    }

    return res.status(201).json(new ApiResponse(200, allVideos, "Videos fetched successfully"));
  } catch (error) {
    next(error);
  }
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
  if (!videoId) {
    throw new ApiError(402, "VideoId required");
  }

  const video = await Video.findById(videoId).populate('owner', 'userName email fullName avatar');

  if (!video) {
    throw new ApiError(401, "Invalid Video Id");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, video, "Video fetched Successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  if (!videoId) {
    throw new ApiError(402, "VideoId required");
  }

  const { title, description } = req.body;
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(401, "Invalid Video Id");
  }

  if (video.owner.toString() != req.user._id.toString()) {
    // console.log(video.owner , "and" , req.user._id);
    throw new ApiError(401, "Invalid User updating video");
  }

  if (title) {
    video.title = title;
  }

  if (description) {
    video.discription = description;
  }

  const thumbnailLocalPath = req.file?.path;

  if (!thumbnailLocalPath) {
    throw new ApiError(401, "No thumbnail found");
  }

  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  if (!thumbnail) {
    throw new ApiError(401, "No thumbnail url found");
  }

  // console.log("thumbnail ",thumbnail.url);

  video.thumbnail = thumbnail.url;

  const updatedVideo = await video.save({ validateBeforeSave: false });

  const updatedVideoDetails = await Video.findById(updatedVideo._id);

  if (!updatedVideoDetails) {
    throw new ApiError(401, "error updating details");
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        updatedVideoDetails,
        "video details updated successfully"
      )
    );
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  if (!videoId) {
    throw new ApiError(402, "VideoId required");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(401, "Invalid Video Id");
  }

  if (video.owner.toString() != req.user._id.toString()) {
    // console.log(video.owner , "and" , req.user._id);
    throw new ApiError(401, "Invalid User updating video");
  }

  const result = await Video.deleteOne({ _id: videoId });

  if (!result.acknowledged) {
    throw new ApiError(401, "Video not deleted");
  }

  res
    .status(201)
    .json(new ApiResponse(200, result, "video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(402, "VideoId required");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(401, "Invalid Video Id");
  }

  if (video.owner.toString() != req.user._id.toString()) {
    // console.log(video.owner , "and" , req.user._id);
    throw new ApiError(401, "Invalid User updating video");
  }

  video.isPublished = !video.isPublished;

  await video.save({ validateBeforeSave: false });

  res
    .status(201)
    .json(new ApiResponse(200, video, "publish toggle successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
