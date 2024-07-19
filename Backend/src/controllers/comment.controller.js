import mongoose, { isValidObjectId } from "mongoose";
import { Comment } from "../Models/comment.model.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { Video } from "../Models/video.model.js";

const getVideoComments = AsyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;
});

const addComment = AsyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "give videoId");
  }

  if (!isValidObjectId(videoId)) {
    throw new ApiError(400, "give valid videoId");
  }

  const videoIdValidity = await Video.findById(videoId);

  if (!videoIdValidity) {
    throw new ApiError(400, "video not found with this videoId");
  }

  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "give content");
  }

  const comment = await Comment.create({
    content,
    video: videoId,
    owner: req.user._id,
  });

  if (!comment) {
    throw new ApiError(400, "Unable to create comment");
  }

  res
    .status(200)
    .json(new ApiResponse(200, comment, "Commment added successfully"));
});

const updateComment = AsyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "give commentId");
  }

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "give valid commentId");
  }

  const commentIdValidity = await Comment.findById(commentId);

  if (!commentIdValidity) {
    throw new ApiError(400, "comment not found with this commentId");
  }

  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "give content");
  }

  const comment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );

  if (!comment) {
    throw new ApiError(400, "Unable to update comment");
  }

  res
    .status(200)
    .json(new ApiResponse(200, comment, "Commment updated successfully"));
});

const deleteComment = AsyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;

  if (!commentId) {
    throw new ApiError(400, "give commentId");
  }

  if (!isValidObjectId(commentId)) {
    throw new ApiError(400, "give valid commentId");
  }

  const commentIdValidity = await Comment.findById(commentId);

  if (!commentIdValidity) {
    throw new ApiError(400, "comment not found with this commentId");
  }

  const comment = await Comment.findByIdAndDelete(commentId);

  if (!comment) {
    throw new ApiError(400, "Unable to delete comment");
  }

  res
    .status(200)
    .json(new ApiResponse(200, comment, "Commment deleted successfully"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
