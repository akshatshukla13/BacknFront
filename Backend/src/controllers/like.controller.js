import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../Models/like.model.js";
import { Video } from "../Models/video.model.js";
import { Tweet } from "../Models/tweet.model.js";
import { Comment } from "../Models/comment.model.js";
import { ApiError } from "../utils/APIerror.js";
import { ApiResponse } from "../utils/APIresponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";

const toggleVideoLike = AsyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  if (!(videoId && isValidObjectId(videoId))) {
    throw new ApiError(400, "enter valid videoId");
  }

  const videoExist = await Video.findById(videoId);

  if (!videoExist) {
    throw new ApiError(400, "video not exists with this VideoId");
  }

  const likedStatus = await Video.findOne(
    { video: videoId },
    { likedBy: req.user._id }
  );

  if (likedStatus) {
    const removeLike = await Like.findByIdAndDelete(likedStatus._id);

    if (!removeLike) {
      throw new ApiError(400, "unable to remove like from video");
    }

    res
      .status(200)
      .json(new ApiResponse(200, removeLike, "successfully removed Like"));
  } else {
    const addLike = await Like.create({
      video: videoId,
      likedBy: req.user._id,
    });

    if (!addLike) {
      throw new ApiError(400, "unable to like the video");
    }
    res.status(200).json(new ApiResponse(200, addLike, "successfully Liked"));
  }
});

const toggleCommentLike = AsyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  if (!(commentId && isValidObjectId(commentId))) {
    throw new ApiError(400, "enter valid commentId");
  }

  const commentExist = await Comment.findById(commentId);

  if (!commentExist) {
    throw new ApiError(400, "comment not exists with this commentId");
  }

  const commentlikedStatus = await Like.findOne(
    { comment: commentId },
    { likedBy: req.user._id }
  );

  if (commentlikedStatus) {
    const removeLike = await Like.findByIdAndDelete(commentlikedStatus._id);

    if (!removeLike) {
      throw new ApiError(400, "unable to remove like from comment");
    }

    res
      .status(200)
      .json(new ApiResponse(200, removeLike, "successfully removed Like"));
  } else {
    const addLike = await Like.create({
      comment: commentId,
      likedBy: req.user._id,
    });

    if (!addLike) {
      throw new ApiError(400, "unable to like the comment");
    }
    res.status(200).json(new ApiResponse(200, addLike, "successfully Liked"));
  }
});

const toggleTweetLike = AsyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  if (!(tweetId && isValidObjectId(tweetId))) {
    throw new ApiError(400, "enter valid tweetId");
  }

  const tweetExist = await Tweet.findById(tweetId);

  if (!tweetExist) {
    throw new ApiError(400, "tweet not exists with this tweetId");
  }

  const tweetLikedStatus = await Like.findOne(
    { tweet: tweetId },
    { likedBy: req.user._id }
  );

  if (tweetLikedStatus) {
    const removeLike = await Like.findByIdAndDelete(tweetLikedStatus._id);

    if (!removeLike) {
      throw new ApiError(400, "unable to remove like from tweet");
    }

    res
      .status(200)
      .json(new ApiResponse(200, removeLike, "successfully removed Like"));
  } else {
    const addLike = await Like.create({
      tweet: tweetId,
      likedBy: req.user._id,
    });

    if (!addLike) {
      throw new ApiError(400, "unable to like the comment");
    }
    res.status(200).json(new ApiResponse(200, addLike, "successfully Liked"));
  }
});

const getLikedVideos = AsyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const likedVideos = await Like.find(
    { likedBy: req.user._id },
    { video: { $exists: true } }
  );

  if (!likedVideos) {
    throw new ApiError(401, "No Video Liked by User");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, likedVideos, "Liked videos fetched successfully")
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
